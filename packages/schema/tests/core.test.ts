import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  GENERATED_HEADER,
  alias,
  array,
  categoriesOf,
  constant,
  createModuleScope,
  define,
  defineModule,
  defineRevision,
  findCycle,
  generatePackageFiles,
  hasDeprecatedEntries,
  indexRevision,
  joinBlocks,
  literal,
  number,
  numberChecks,
  object,
  objectEntries,
  optionalProperty,
  partial,
  property,
  referencesOf,
  renderImport,
  renderJsDoc,
  renderKey,
  resolveAlias,
  string,
  textLines,
  tuple,
  union,
  validateRevision,
  variant,
  walkSchema,
  writeGeneratedFiles,
} from "../src/core/index.js";
import { revisions } from "../src/index.js";

vi.setConfig({ testTimeout: 5000 });

describe("textLines", () => {
  it("separates paragraphs with an empty line", () => {
    expect(textLines(["One.", "Two."])).toStrictEqual(["One.", "", "Two."]);
  });
  it("keeps consecutive list items together", () => {
    expect(textLines(["Intro:", "- A", "- B", "Outro."])).toStrictEqual(["Intro:", "", "- A", "- B", "", "Outro."]);
  });
});

describe("renderJsDoc", () => {
  it("renders a description-only comment on one line", () => {
    expect(renderJsDoc({ description: "Hello." })).toBe("/** Hello. */");
  });
  it("renders nothing without docs", () => {
    expect(renderJsDoc(undefined)).toBe("");
  });
  it("renders tags after the description", () => {
    expect(
      renderJsDoc(
        { description: "Hello.", remarks: "Note.", see: ["https://example.com"] },
        { categories: ["A", "B"], tags: ["@returns Nothing"] },
      ),
    ).toBe(
      [
        "/**",
        " * Hello.",
        " *",
        " * @remarks Note.",
        " * @category A",
        " * @category B",
        " * @see {@link https://example.com}",
        " * @returns Nothing",
        " */",
      ].join("\n"),
    );
  });
});

describe("renderJsDoc tags", () => {
  it("renders multi-paragraph tags without a description", () => {
    expect(renderJsDoc({ deprecated: ["Old.", "Use something else."] })).toBe(
      ["/**", " * @deprecated Old.", " *", " * Use something else.", " */"].join("\n"),
    );
  });
});

describe("numberChecks", () => {
  const Base = define("Base", number({ integer: true, min: 0 }), "A base number.");
  const LIMIT = constant("LIMIT", 9, "A limit.");
  it("only applies checks that tighten the base", () => {
    expect(numberChecks(number({ base: Base, integer: true, min: 0, max: LIMIT }))).toStrictEqual({
      integer: false,
      max: LIMIT,
    });
    expect(numberChecks(number({ base: Base, min: 1 }))).toStrictEqual({ integer: false, min: 1 });
  });
  it("inherits bounds through every base", () => {
    const Unbounded = define("Unbounded", number({ integer: true }), "An unbounded integer.");
    const Capped = define("Capped", number({ base: Unbounded, max: LIMIT }), "A capped integer.");
    const Narrowed = define("Narrowed", number({ base: Capped, min: 1 }), "A narrowed integer.");
    expect(numberChecks(number({ base: Narrowed, min: 1, max: LIMIT }))).toStrictEqual({ integer: false });
    expect(numberChecks(number({ base: Narrowed, max: 5 }))).toStrictEqual({ integer: false, max: 5 });
  });
  it("applies every check without a base", () => {
    expect(numberChecks(Base.schema)).toStrictEqual({ integer: true, min: 0 });
  });
});

describe("objectEntries", () => {
  const Parent = define("Parent", object({ a: property(string()) }), "A parent.");
  const Child = define("Child", object({ b: optionalProperty(string()) }, { extends: [Parent] }), "A child.");
  it("includes inherited entries", () => {
    expect(objectEntries(Child).map(([key, entry]) => [key, entry.optional])).toStrictEqual([
      ["a", false],
      ["b", true],
    ]);
  });
  it("makes entries of partial definitions optional", () => {
    const Partial = define("Partial", partial(Child), "A partial child.");
    expect(objectEntries(Partial).map(([key, entry]) => [key, entry.optional])).toStrictEqual([
      ["a", true],
      ["b", true],
    ]);
  });
});

describe("hasDeprecatedEntries", () => {
  it("finds deprecated entries in nested objects", () => {
    const Nested = define(
      "Nested",
      object({ outer: property(object({ inner: property(string(), { deprecated: "Old." }) })) }),
      "Nested.",
    );
    expect(hasDeprecatedEntries(defineModule("nested", "Nested", [Nested]))).toBe(true);
    expect(hasDeprecatedEntries(defineModule("other", "Other", [constant("OTHER", 1, "Other.")]))).toBe(false);
  });
});

describe("createModuleScope", () => {
  it("only imports used definitions from other modules", () => {
    const First = define("First", string(), "First.");
    const Second = define("Second", array(First), "Second.");
    const firstModule = defineModule("first", "First", [First]);
    const secondModule = defineModule("second", "Second", [Second]);
    const index = indexRevision({ modules: [firstModule, secondModule] });

    const scope = createModuleScope(secondModule, index);
    expect(scope.use(First)).toBe("First");
    expect(scope.use(Second)).toBe("Second");
    expect(scope.imports()).toStrictEqual(new Map([[firstModule, ["First"]]]));
  });
});

describe("validateRevision", () => {
  it("every revision is valid", () => {
    expect.hasAssertions();
    for (const revision of revisions) {
      expect(validateRevision(revision)).toStrictEqual([]);
    }
  });
  it("reports invalid definitions", () => {
    const Outside = define("Outside", string(), "Not in any module.");
    const Later = define("Later", string(), "Defined later.");
    const Branded = define("Branded", array(string({ brand: true })), "A nested brand.");
    const Variant = define(
      "Variant",
      variant("kind", [object({ kind: property(string()) }), object({ kind: property(literal("b")) })]),
      "A variant.",
    );
    const Messaged = define("Messaged", union([string(), number()], { message: "missing" }), "A message.");
    const UsesLater = define("UsesLater", array(Later), "Uses a later definition.");
    const UsesOutside = alias("UsesOutside", Outside, "Aliases an outside definition.");
    const Duplicate = define("Later", string(), "A duplicate name.");

    expect(
      validateRevision({
        messages: {},
        modules: [
          defineModule("module", "Module", [UsesLater, Later, Branded, Variant, Messaged, UsesOutside, Duplicate]),
        ],
      }),
    ).toStrictEqual([
      "UsesLater references Later before it's defined in module",
      "Branded has a branded string that isn't its top-level schema",
      'Variant has a variant option without a literal "kind" entry',
      "Messaged uses the message \"missing\", which isn't in the revision's messages",
      "UsesOutside references Outside, which isn't part of any module",
      "Later is defined more than once",
    ]);
  });
  it("reports modules that depend on each other", () => {
    const First = define("First", string(), "First.");
    const Second = define("Second", array(First), "Second.");
    const Third = define("Third", array(Second), "Third.");
    expect(
      validateRevision({
        messages: {},
        modules: [defineModule("first", "First", [First, Third]), defineModule("second", "Second", [Second])],
      }),
    ).toStrictEqual(["Modules depend on each other in a cycle: first -> second -> first"]);
  });
});

describe("walkSchema", () => {
  it("visits tuple items with and without a rest item", () => {
    const visited: string[] = [];
    walkSchema(tuple([{ name: "first", schema: string() }]), (schema) => {
      visited.push(schema.kind);
    });
    walkSchema(tuple([], { rest: { name: "rest", schema: number() } }), (schema) => {
      visited.push(schema.kind);
    });
    expect(visited).toStrictEqual(["tuple", "string", "tuple", "number"]);
  });
});

describe("referencesOf", () => {
  const Target = define("Target", string(), "A target.");
  const Alias = alias("Alias", Target, "An alias.");
  it("references an alias's target", () => {
    expect(referencesOf(Alias)).toStrictEqual([Target]);
  });
  it("references a constant's type, if any", () => {
    expect(referencesOf(constant("TYPED", "value", "Typed.", { type: Target }))).toStrictEqual([Target]);
    expect(referencesOf(constant("UNTYPED", "value", "Untyped."))).toStrictEqual([]);
  });
  it("references aliases used by a schema", () => {
    expect(referencesOf(define("UsesAlias", array(Alias), "Uses an alias."))).toStrictEqual([Alias]);
  });
});

describe("resolveAlias", () => {
  it("follows aliases to their target", () => {
    const Target = define("Target", string(), "A target.");
    expect(resolveAlias(alias("Alias", Target, "An alias."))).toBe(Target);
    expect(resolveAlias(Target)).toBe(Target);
  });
});

describe("categoriesOf", () => {
  it("sorts a definition's categories along with its module's category", () => {
    const Categorized = define("Categorized", string(), { description: "Categorized.", categories: ["B", "Z"] });
    const Uncategorized = define("Uncategorized", string(), "Uncategorized.");
    const module = defineModule("module", "M", [Categorized, Uncategorized]);
    expect(categoriesOf(Categorized, module)).toStrictEqual(["B", "M", "Z"]);
    expect(categoriesOf(Uncategorized, module)).toStrictEqual(["M"]);
  });
});

describe("indexRevision", () => {
  it("finds the module of each definition", () => {
    const Inside = define("Inside", string(), "Inside.");
    const Outside = define("Outside", string(), "Outside.");
    const module = defineModule("module", "Module", [Inside]);
    const index = indexRevision({ modules: [module] });
    expect(index.moduleOf(Inside)).toBe(module);
    expect(index.findModule(Outside)).toBeUndefined();
    expect(() => index.moduleOf(Outside)).toThrow("Outside isn't part of any module in the revision");
  });
});

describe("findCycle", () => {
  it("finds a cycle", () => {
    const graph = new Map([
      ["a", new Set(["b"])],
      ["b", new Set(["c"])],
      ["c", new Set(["b"])],
    ]);
    expect(findCycle(graph)).toStrictEqual(["b", "c", "b"]);
  });
  it("treats dependencies without an entry as having none", () => {
    expect(findCycle(new Map([["a", new Set(["b"])]]))).toBeUndefined();
  });
});

describe("defineRevision", () => {
  it("names the revision's folder", () => {
    expect(defineRevision({ revision: "20000101", modules: [], messages: {} }).folder).toBe("v20000101");
  });
  it("throws for an invalid revision", () => {
    const Duplicate = define("Duplicate", string(), "Duplicate.");
    expect(() =>
      defineRevision({
        revision: "20000101",
        modules: [defineModule("module", "Module", [Duplicate, Duplicate])],
        messages: {},
      }),
    ).toThrow("Invalid schema for revision 20000101:\n- Duplicate is defined more than once");
  });
});

describe("renderImport", () => {
  it("renders sorted, unique names", () => {
    expect(renderImport(["b", "a", "b"], "./module.js")).toBe('import { a, b } from "./module.js";');
  });
  it("renders a type-only import", () => {
    expect(renderImport(["A"], "./module.js", { type: true })).toBe('import type { A } from "./module.js";');
  });
  it("renders nothing without names", () => {
    expect(renderImport([], "./module.js")).toBe("");
  });
});

describe("joinBlocks", () => {
  it("separates non-empty blocks with an empty line", () => {
    expect(joinBlocks(["a", "", "b"])).toBe("a\n\nb\n");
  });
});

describe("renderKey", () => {
  it("only quotes keys that aren't identifiers", () => {
    expect(renderKey("data_updated_at")).toBe("data_updated_at");
    expect(renderKey("content-type")).toBe('"content-type"');
  });
});

describe("generatePackageFiles", () => {
  it("generates every module, revision index, and the package index", () => {
    const [revision] = revisions;
    const files = generatePackageFiles(revisions, {
      module: (module) => module.name,
      revisionIndex: (current) => current.folder,
      rootIndex: (latest) => `latest: ${latest.folder}`,
    });
    expect(files).toHaveLength(revision.modules.length + 2);
    expect(files).toContainEqual({ path: "src/v20170710/assignments.ts", contents: "assignments" });
    expect(files).toContainEqual({ path: "src/v20170710/index.ts", contents: "v20170710" });
    expect(files.at(-1)).toStrictEqual({ path: "src/index.ts", contents: "latest: v20170710" });
  });
  it("throws without any revisions", () => {
    expect(() => generatePackageFiles([], { module: () => "", revisionIndex: () => "", rootIndex: () => "" })).toThrow(
      "There are no revisions to generate",
    );
  });
});

/**
 * A stand-in formatter that settles after one pass.
 *
 * @param _filePath The path of the file being formatted
 * @param contents The contents to format
 * @returns The formatted contents
 */
// oxlint-disable-next-line typescript/require-await -- Stands in for an asynchronous formatter
async function appendOnce(_filePath: string, contents: string): Promise<string> {
  const suffix = "// Formatted\n";
  return contents.endsWith(suffix) ? contents : `${contents}${suffix}`;
}

/**
 * A stand-in formatter that never settles.
 *
 * @param _filePath The path of the file being formatted
 * @param contents The contents to format
 * @returns The formatted contents
 */
// oxlint-disable-next-line typescript/require-await -- Stands in for an asynchronous formatter
async function appendAlways(_filePath: string, contents: string): Promise<string> {
  return `${contents}.`;
}

describe("writeGeneratedFiles", () => {
  it("writes formatted files and removes stale generated files only", async () => {
    expect.hasAssertions();
    const root = await fs.mkdtemp(path.join(tmpdir(), "wanikani-api-schema-"));
    try {
      const folder = path.join(root, "src");
      await fs.mkdir(folder);
      await fs.writeFile(path.join(folder, "stale.ts"), `${GENERATED_HEADER}\n`);
      await fs.writeFile(path.join(folder, "manual.ts"), "// Hand-written\n");

      const result = await writeGeneratedFiles([{ path: "src/new.ts", contents: "export {};\n" }], {
        root,
        format: appendOnce,
      });

      expect(result).toStrictEqual({ removed: [path.join("src", "stale.ts")], written: [path.join("src", "new.ts")] });
      await expect(fs.readFile(path.join(folder, "new.ts"), "utf8")).resolves.toBe(
        `${GENERATED_HEADER}\n\nexport {};\n// Formatted\n`,
      );
      await expect(fs.readdir(folder)).resolves.toStrictEqual(["manual.ts", "new.ts"]);
    } finally {
      await fs.rm(root, { recursive: true });
    }
  });
  it("fails when formatting never settles", async () => {
    expect.hasAssertions();
    const root = await fs.mkdtemp(path.join(tmpdir(), "wanikani-api-schema-"));
    try {
      await expect(
        writeGeneratedFiles([{ path: "unsettled.ts", contents: "" }], {
          root,
          format: appendAlways,
        }),
      ).rejects.toThrow("didn't settle");
    } finally {
      await fs.rm(root, { recursive: true });
    }
  });
});
