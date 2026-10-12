/*
Generates the Zod (Mini) schema in `src/` from @bachman-dev/wanikani-api-schema. Run with `pnpm generate`.

Hand-written custom messages live in `src/<revision>/lang/`, exported under the message keys used by the schema.
*/

import { fileURLToPath } from "node:url";

import { revisions } from "@bachman-dev/wanikani-api-schema";
import {
  type ConstantDefinition,
  type Definition,
  type Module,
  type ModuleScope,
  type NumberBound,
  type Property,
  type Revision,
  type RevisionIndex,
  type Schema,
  type SchemaDefinition,
  type StringSchema,
  categoriesOf,
  createModuleScope,
  generatePackageFiles,
  hasDeprecatedEntries,
  indexRevision,
  joinBlocks,
  numberChecks,
  objectEntries,
  renderImport,
  renderJsDoc,
  renderKey,
  renderLiteral,
  resolveAlias,
  writeGeneratedFiles,
} from "@bachman-dev/wanikani-api-schema/core";
import { format } from "oxfmt";

import formatConfig from "../../../oxfmt.config.ts";

/** State for generating one module. */
interface Context {
  /** Tracks definitions used from other modules. */
  readonly scope: ModuleScope;

  /** Constants used by the module, imported from the types package. */
  readonly constants: Set<string>;

  /** Whether the module uses custom messages. */
  usesMessages: boolean;
}

function typesPackage(revision: Revision): string {
  return `@bachman-dev/wanikani-api-types/${revision.folder}`;
}

function renderMessage(message: string | undefined, context: Context): string {
  if (message === undefined) {
    return "";
  }
  context.usesMessages = true;
  return `, { error: m.${message} }`;
}

function renderBound(bound: NumberBound, context: Context): string {
  if (typeof bound === "number") {
    return String(bound);
  }
  context.constants.add(bound.name);
  return bound.name;
}

function renderEntries(
  entries: Iterable<[string, Property]>,
  render: (key: string, property: Property) => string,
  spreads: readonly string[] = [],
): string {
  const lines = [...entries].map(([key, property]) => {
    const docs = renderJsDoc(property.docs);
    const entry = `${renderKey(key)}: ${render(key, property)},`;
    return docs === "" ? entry : `${docs}\n${entry}`;
  });
  return `{\n${[...spreads.map((spread) => `...${spread}.shape,`), ...lines].join("\n")}\n}`;
}

function renderString(schema: StringSchema, brand: string | undefined): string {
  const string = schema.trim === true ? "z.string().check(z.trim())" : "z.string()";
  let rendered = string;
  if (schema.format === "iso-timestamp") {
    const timestamp = "z.iso.datetime({ offset: true })";
    rendered = schema.trim === true ? `z.pipe(${string}, ${timestamp})` : timestamp;
  }
  if (brand === undefined) {
    return rendered;
  }
  return `z.pipe(${rendered},\n// oxlint-disable-next-line typescript/consistent-type-assertions, typescript/no-unsafe-type-assertion -- Validated above\nz.transform((value) => value as ${brand}))`;
}

function renderSchema(schema: Schema, context: Context, brand?: string): string {
  const render = (inner: Schema): string => renderSchema(inner, context);
  const renderProperty = (property: Property): string =>
    property.optional ? `z.exactOptional(${render(property.schema)})` : render(property.schema);

  switch (schema.kind) {
    case "alias":
    case "definition":
      return context.scope.use(resolveAlias(schema));
    case "literal":
      return `z.literal(${renderLiteral(schema.value)})`;
    case "string":
      return renderString(schema, brand);
    case "number": {
      const checks = numberChecks(schema);
      const base = schema.base === undefined ? "z.number()" : context.scope.use(schema.base);
      const rendered: string[] = [];
      if (checks.integer) {
        rendered.push("z.int()");
      }
      if (checks.min !== undefined) {
        rendered.push(`z.minimum(${renderBound(checks.min, context)})`);
      }
      if (checks.max !== undefined) {
        rendered.push(`z.maximum(${renderBound(checks.max, context)})`);
      }
      return rendered.length === 0 ? base : `${base}.check(${rendered.join(", ")})`;
    }
    case "boolean":
    case "date":
    case "never":
      return `z.${schema.kind}()`;
    case "picklist":
      return `z.enum([${schema.options.map((option) => renderLiteral(option)).join(", ")}])`;
    case "array":
      return `z.array(${render(schema.item)})`;
    case "tuple": {
      const items = `[${schema.items.map((item) => render(item.schema)).join(", ")}]`;
      const tuple =
        schema.rest === undefined ? `z.tuple(${items})` : `z.tuple(${items}, ${render(schema.rest.schema)})`;
      if (schema.unique === undefined) {
        return tuple;
      }
      const message = renderMessage(schema.unique.message, context);
      return `${tuple}.check(z.refine((items) => new Set(items).size === items.length${message}))`;
    }
    case "nullable":
      return `z.nullable(${render(schema.wrapped)})`;
    case "object": {
      const spreads = schema.extends.map((parent) => context.scope.use(parent));
      const entries = Object.entries(schema.entries);
      return `z.object(${renderEntries(entries, (_key, property) => renderProperty(property), spreads)})`;
    }
    case "partial": {
      // N.b. z.partial() wraps entries with z.optional(), which would allow properties to be explicitly `undefined`
      const name = context.scope.use(schema.source);
      const entries = renderEntries(objectEntries(schema.source), (key) => `z.exactOptional(${name}.shape.${key})`);
      return `z.object(${entries})`;
    }
    case "union":
      return `z.union([${schema.options.map((option) => render(option)).join(", ")}]${renderMessage(schema.message, context)})`;
    case "variant":
      return `z.discriminatedUnion(${renderLiteral(schema.key)}, [${schema.options.map((option) => render(option)).join(", ")}])`;
    case "intersect": {
      // N.b. Zod throws an error for unmergeable intersections rather than reporting an issue, so there's no message
      const [first, ...rest] = schema.options;
      let rendered = render(first);
      for (const option of rest) {
        rendered = `z.intersection(${rendered}, ${render(option)})`;
      }
      return rendered;
    }
    default:
      throw new Error(`Unsupported schema: ${JSON.stringify(schema satisfies never)}`);
  }
}

function renderTypeGuard(definition: SchemaDefinition, module: Module): string {
  const docs = renderJsDoc(
    { description: "A type guard that checks if the given value matches the type predicate." },
    {
      categories: [module.category, "Type Guards"],
      tags: ["@param value An unknown value", "@returns A type predicate"],
    },
  );
  const { name } = definition;
  return `${docs}\n// @__NO_SIDE_EFFECTS__\nexport function is${name}(value: unknown): value is ${name} {\n  return z.validate(${name}, value);\n}`;
}

function renderValue(definition: SchemaDefinition, context: Context): string {
  const { name, schema } = definition;
  const rendered = renderSchema(schema, context, schema.kind === "string" && schema.brand === true ? name : undefined);
  if (schema.kind === "number" && schema.base === undefined) {
    // N.b. z.toZod() can't match `number & {}` with the `number` Zod infers, though they're identical at runtime
    const directive =
      "// oxlint-disable-next-line typescript/consistent-type-assertions -- `number & {}` is identical to `number` at runtime";
    return `${directive}\nexport const ${name} = ${rendered} as z.ZodMiniType<Types.${name}>;`;
  }
  return `export const ${name} = z.toZod<Types.${name}>()(${rendered});`;
}

function renderDefinition(definition: Definition, context: Context, index: RevisionIndex): string {
  const { module } = context.scope;
  const docs = renderJsDoc(definition.docs, { categories: categoriesOf(definition, module) });
  switch (definition.kind) {
    case "alias": {
      // Aliases are re-exported under their new name, rather than imported
      const targetModule = index.moduleOf(definition.target);
      const from = targetModule === module ? "" : ` from "./${targetModule.name}.js"`;
      return `${docs}\nexport { ${definition.target.name} as ${definition.name} }${from};`;
    }
    case "constant":
      // Constants are re-exported from the types package, see generateModule()
      return "";
    case "definition": {
      const declaration = `${docs}\nexport type ${definition.name} = Types.${definition.name};\n${renderValue(definition, context)}`;
      return definition.typeGuard ? `${declaration}\n\n${renderTypeGuard(definition, module)}` : declaration;
    }
    default:
      throw new Error(`Unsupported definition: ${JSON.stringify(definition satisfies never)}`);
  }
}

function generateModule(module: Module, revision: Revision): string {
  const index = indexRevision(revision);
  const context: Context = { scope: createModuleScope(module, index), constants: new Set(), usesMessages: false };

  const definitions = module.definitions.map((definition) => renderDefinition(definition, context, index));
  const hasSchema = module.definitions.some((definition) => definition.kind === "definition");
  const constants = module.definitions
    .filter((definition): definition is ConstantDefinition => definition.kind === "constant")
    .map((definition) => definition.name);

  const directives = hasDeprecatedEntries(module)
    ? "/* oxlint-disable typescript/no-deprecated -- The API still returns deprecated properties, so they're validated */"
    : "";
  const imports = [
    hasSchema ? `import type * as Types from "${typesPackage(revision)}";\nimport * as z from "zod/mini";` : "",
    renderImport(context.constants, typesPackage(revision)),
    context.usesMessages ? `import * as m from "./lang/index.js";` : "",
    ...[...context.scope.imports()].map(([importedModule, names]) =>
      renderImport(names, `./${importedModule.name}.js`),
    ),
  ];
  const reexports = constants.length > 0 ? `export { ${constants.join(", ")} } from "${typesPackage(revision)}";` : "";

  return joinBlocks([directives, imports.filter((line) => line !== "").join("\n"), reexports, ...definitions]);
}

function generateRevisionIndex(revision: Revision): string {
  return joinBlocks([
    `// oxlint-disable oxc/no-barrel-file -- This is an entrypoint for the ${revision.folder} API revision\n/** @category API Reference */`,
    revision.modules.map((module) => `export * from "./${module.name}.js";`).join("\n"),
  ]);
}

function generateRootIndex(revision: Revision): string {
  return joinBlocks([
    "// oxlint-disable oxc/no-barrel-file -- This is an entrypoint for the package\n/** @category API Reference */",
    "/*\nThis file exports all the types available in the recommended API revision. Thereby, things MAY break in the future.\nTry sticking to imports from a specific revision.\n*/",
    `export * from "./${revision.folder}/index.js";`,
  ]);
}

const files = generatePackageFiles(revisions, {
  module: generateModule,
  revisionIndex: generateRevisionIndex,
  rootIndex: generateRootIndex,
});

const { removed, written } = await writeGeneratedFiles(files, {
  root: fileURLToPath(new URL("..", import.meta.url)),
  format: async (filePath, contents) => {
    const result = await format(filePath, contents, formatConfig);
    if (result.errors.length > 0) {
      throw new Error(`Failed to format ${filePath}: ${JSON.stringify(result.errors)}`);
    }
    return result.code;
  },
});

process.stdout.write(
  `Generated ${written.length} files${removed.length > 0 ? `, removed ${removed.join(", ")}` : ""}\n`,
);
