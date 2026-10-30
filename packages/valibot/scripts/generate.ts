/*
Generates the Valibot schema in `src/` from @bachman-dev/wanikani-api-schema. Run with `pnpm generate`.

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
  type Schema,
  type SchemaDefinition,
  type StringSchema,
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
  return `, m.${message}`;
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
): string {
  const lines = [...entries].map(([key, property]) => {
    const docs = renderJsDoc(property.docs);
    const entry = `${renderKey(key)}: ${render(key, property)},`;
    return docs === "" ? entry : `${docs}\n${entry}`;
  });
  return `{\n${lines.join("\n")}\n}`;
}

function renderString(schema: StringSchema, brand: string | undefined): string {
  const actions = ["v.string()"];
  if (schema.trim === true) {
    actions.push("v.trim()");
  }
  if (schema.format === "iso-timestamp") {
    actions.push("v.isoTimestamp()");
  }
  if (brand !== undefined) {
    actions.push(
      `// oxlint-disable-next-line typescript/consistent-type-assertions, typescript/no-unsafe-type-assertion -- Validated above\nv.transform((input) => input as ${brand})`,
    );
  }
  return actions.length === 1 ? "v.string()" : `v.pipe(${actions.join(",\n")})`;
}

function renderSchema(schema: Schema, context: Context, brand?: string): string {
  const render = (inner: Schema): string => renderSchema(inner, context);
  const renderProperty = (property: Property): string =>
    property.optional ? `v.exactOptional(${render(property.schema)})` : render(property.schema);

  switch (schema.kind) {
    case "alias":
    case "definition":
      return context.scope.use(resolveAlias(schema));
    case "literal":
      return `v.literal(${renderLiteral(schema.value)})`;
    case "string":
      return renderString(schema, brand);
    case "number": {
      const checks = numberChecks(schema);
      const actions = [schema.base === undefined ? "v.number()" : context.scope.use(schema.base)];
      if (checks.integer) {
        actions.push("v.safeInteger()");
      }
      if (checks.min !== undefined) {
        actions.push(`v.minValue(${renderBound(checks.min, context)})`);
      }
      if (checks.max !== undefined) {
        actions.push(`v.maxValue(${renderBound(checks.max, context)})`);
      }
      return actions.length === 1 ? actions.join("") : `v.pipe(${actions.join(",\n")})`;
    }
    case "boolean":
    case "date":
    case "never":
      return `v.${schema.kind}()`;
    case "picklist":
      return `v.picklist([${schema.options.map((option) => renderLiteral(option)).join(", ")}])`;
    case "array":
      return `v.array(${render(schema.item)})`;
    case "tuple": {
      const items = `[${schema.items.map((item) => render(item.schema)).join(", ")}]`;
      const tuple =
        schema.rest === undefined ? `v.tuple(${items})` : `v.tupleWithRest(${items}, ${render(schema.rest.schema)})`;
      if (schema.unique === undefined) {
        return tuple;
      }
      const unique = "(item, index, array) => array.indexOf(item) === index";
      return `v.pipe(${tuple}, v.checkItems(${unique}${renderMessage(schema.unique.message, context)}))`;
    }
    case "nullable":
      return `v.nullable(${render(schema.wrapped)})`;
    case "object": {
      const entries = renderEntries(Object.entries(schema.entries), (_key, property) => renderProperty(property));
      if (schema.extends.length === 0) {
        return `v.object(${entries})`;
      }
      const parents = schema.extends.map((parent) => context.scope.use(parent));
      return `v.object(v.entriesFromObjects([${parents.join(", ")}, v.object(${entries})]))`;
    }
    case "partial": {
      // N.b. v.partial() wraps entries with v.optional(), which would allow properties to be explicitly `undefined`
      const name = context.scope.use(schema.source);
      const entries = renderEntries(objectEntries(schema.source), (key) => `v.exactOptional(${name}.entries.${key})`);
      return `v.object(${entries})`;
    }
    case "union":
      return `v.union([${schema.options.map((option) => render(option)).join(", ")}]${renderMessage(schema.message, context)})`;
    case "variant":
      return `v.variant(${renderLiteral(schema.key)}, [${schema.options.map((option) => render(option)).join(", ")}])`;
    case "intersect":
      return `v.intersect([${schema.options.map((option) => render(option)).join(", ")}]${renderMessage(schema.message, context)})`;
    default:
      throw new Error(`Unsupported schema: ${JSON.stringify(schema satisfies never)}`);
  }
}

function renderTypeGuard(definition: SchemaDefinition): string {
  const docs = renderJsDoc(
    { description: "A type guard that checks if the given value matches the type predicate." },
    {
      tags: ["@param value An unknown value", "@returns A type predicate"],
    },
  );
  const { name } = definition;
  return `${docs}\n// @__NO_SIDE_EFFECTS__\nexport function is${name}(value: unknown): value is ${name} {\n  return v.is(${name}, value);\n}`;
}

function renderDefinition(definition: Definition, context: Context): string {
  const docs = renderJsDoc(definition.docs);
  switch (definition.kind) {
    case "alias": {
      const { name } = definition;
      return `${docs}
export type ${name} = Types.${name};
export const ${name} = ${context.scope.use(definition.target)};`;
    }
    case "constant":
      // Constants are re-exported from the types package, see generateModule()
      return "";
    case "definition": {
      const { name, schema } = definition;
      const brand = schema.kind === "string" && schema.brand === true ? name : undefined;
      const declaration = `${docs}\nexport type ${name} = Types.${name};\nexport const ${name} = ${renderSchema(schema, context, brand)};`;
      return definition.typeGuard ? `${declaration}\n\n${renderTypeGuard(definition)}` : declaration;
    }
    default:
      throw new Error(`Unsupported definition: ${JSON.stringify(definition satisfies never)}`);
  }
}

function generateModule(module: Module, revision: Revision): string {
  const index = indexRevision(revision);
  const context: Context = { scope: createModuleScope(module, index), constants: new Set(), usesMessages: false };

  const definitions = module.definitions.map((definition) => renderDefinition(definition, context));
  const hasSchema = module.definitions.some((definition) => definition.kind !== "constant");
  const constants = module.definitions
    .filter((definition): definition is ConstantDefinition => definition.kind === "constant")
    .map((definition) => definition.name);

  const directives = [
    hasDeprecatedEntries(module)
      ? "/* oxlint-disable typescript/no-deprecated -- The API still returns deprecated properties, so they're validated */"
      : "",
    module.definitions.some((definition) => definition.kind === "alias")
      ? "/* oxlint-disable unicorn/prefer-export-from -- Aliases are declared, rather than re-exported, so they're documented */"
      : "",
  ];
  const imports = [
    hasSchema ? `import type * as Types from "${typesPackage(revision)}";\nimport * as v from "valibot";` : "",
    renderImport(context.constants, typesPackage(revision)),
    context.usesMessages ? `import * as m from "./lang/index.js";` : "",
    ...[...context.scope.imports()].map(([importedModule, names]) =>
      renderImport(names, `./${importedModule.name}.js`),
    ),
  ];
  const reexports = constants.length > 0 ? `export { ${constants.join(", ")} } from "${typesPackage(revision)}";` : "";

  return joinBlocks([
    directives.filter((line) => line !== "").join("\n"),
    imports.filter((line) => line !== "").join("\n"),
    reexports,
    ...definitions,
  ]);
}

function generateRevisionIndex(revision: Revision): string {
  return joinBlocks([
    `// oxlint-disable oxc/no-barrel-file -- This is an entrypoint for the ${revision.folder} API revision`,
    revision.modules.map((module) => `export * from "./${module.name}.js";`).join("\n"),
  ]);
}

function generateRootIndex(revision: Revision): string {
  return joinBlocks([
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
