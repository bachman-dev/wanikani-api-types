import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  GENERATED_HEADER,
  alias,
  array,
  constant,
  createModuleScope,
  define,
  defineModule,
  generatePackageFiles,
  hasDeprecatedEntries,
  indexRevision,
  literal,
  number,
  numberChecks,
  object,
  objectEntries,
  optionalProperty,
  partial,
  property,
  renderJsDoc,
  string,
  textLines,
  union,
  validateRevision,
  variant,
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
    expect(hasDeprecatedEntries(defineModule("other", "Other", []))).toBe(false);
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
