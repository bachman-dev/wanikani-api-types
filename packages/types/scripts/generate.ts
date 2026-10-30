/*
Generates the type definitions in `src/` from @bachman-dev/wanikani-api-schema. Run with `pnpm generate`.
*/

import { fileURLToPath } from "node:url";

import { revisions } from "@bachman-dev/wanikani-api-schema";
import {
  type ConstantDefinition,
  type Definition,
  type Module,
  type ModuleScope,
  type Property,
  type Revision,
  type Schema,
  type SchemaDefinition,
  createModuleScope,
  generatePackageFiles,
  indexRevision,
  joinBlocks,
  renderImport,
  renderJsDoc,
  renderKey,
  renderLiteral,
  resolveAlias,
  writeGeneratedFiles,
} from "@bachman-dev/wanikani-api-schema/core";
import { format } from "oxfmt";

import formatConfig from "../../../oxfmt.config.ts";

/**
 * Checks whether a type needs parentheses when used as an operand of `&`.
 *
 * @param schema The type's schema
 * @returns Whether parentheses are needed
 */
function needsParentheses(schema: Schema): boolean {
  switch (schema.kind) {
    case "nullable":
    case "union":
    case "variant":
      return true;
    case "picklist":
      return schema.options.length > 1;
    default:
      return false;
  }
}

/**
 * Checks whether a type needs parentheses when used as an array item.
 *
 * @param schema The type's schema
 * @returns Whether parentheses are needed
 */
function needsArrayParentheses(schema: Schema): boolean {
  return (
    needsParentheses(schema) || schema.kind === "intersect" || (schema.kind === "object" && schema.extends.length > 0)
  );
}

function renderProperties(entries: Readonly<Record<string, Property>>, render: (schema: Schema) => string): string {
  const properties = Object.entries(entries).map(([key, property]) => {
    const docs = renderJsDoc(property.docs);
    const declaration = `${renderKey(key)}${property.optional ? "?" : ""}: ${render(property.schema)};`;
    return docs === "" ? declaration : `${docs}\n${declaration}`;
  });
  return `{\n${properties.join("\n\n")}\n}`;
}

function renderType(schema: Schema, scope: ModuleScope): string {
  const render = (inner: Schema): string => renderType(inner, scope);
  const renderOperand = (inner: Schema): string => (needsParentheses(inner) ? `(${render(inner)})` : render(inner));
  const renderArrayItem = (inner: Schema): string =>
    needsArrayParentheses(inner) ? `(${render(inner)})` : render(inner);

  switch (schema.kind) {
    case "alias":
    case "definition":
      return scope.use(resolveAlias(schema));
    case "literal":
      return renderLiteral(schema.value);
    case "boolean":
    case "never":
    case "number":
    case "string":
      return schema.kind;
    case "date":
      return "Date";
    case "picklist":
      return schema.options.map((option) => renderLiteral(option)).join(" | ");
    case "array":
      return `${renderArrayItem(schema.item)}[]`;
    case "tuple": {
      const items = schema.items.map((item) => `${item.name}: ${render(item.schema)}`);
      if (schema.rest !== undefined) {
        items.push(`...${schema.rest.name}: ${renderArrayItem(schema.rest.schema)}[]`);
      }
      return `[${items.join(", ")}]`;
    }
    case "nullable":
      return `${render(schema.wrapped)} | null`;
    case "object":
      return [...schema.extends.map((parent) => scope.use(parent)), renderProperties(schema.entries, render)].join(
        " & ",
      );
    case "partial":
      return `Partial<${scope.use(schema.source)}>`;
    case "union":
    case "variant":
      return schema.options.map((option) => render(option)).join(" | ");
    case "intersect":
      return schema.options.map((option) => renderOperand(option)).join(" & ");
    default:
      throw new Error(`Unsupported schema: ${JSON.stringify(schema satisfies never)}`);
  }
}

function brandSymbolName(definition: Definition): string {
  return `${definition.name.charAt(0).toLowerCase()}${definition.name.slice(1)}Brand`;
}

function isBranded(definition: Definition): boolean {
  return definition.kind === "definition" && definition.schema.kind === "string" && definition.schema.brand === true;
}

function renderDefinitionType(definition: SchemaDefinition, scope: ModuleScope): string {
  const { name, schema } = definition;
  switch (schema.kind) {
    case "object": {
      const parents = schema.extends.map((parent) => scope.use(parent));
      const heritage = parents.length > 0 ? ` extends ${parents.join(", ")}` : "";
      const body = renderProperties(schema.entries, (inner) => renderType(inner, scope));
      return `export interface ${name}${heritage} ${body}`;
    }
    case "number":
      // N.b. `& {}` keeps the type's name (and docs) when it's displayed, instead of collapsing it into `number`
      return `export type ${name} = number & {};`;
    case "string":
      return schema.brand === true
        ? `export type ${name} = string & { readonly [${brandSymbolName(definition)}]: ${renderLiteral(name)} };`
        : `export type ${name} = string;`;
    default:
      return `export type ${name} = ${renderType(schema, scope)};`;
  }
}

function renderConstant(definition: ConstantDefinition, scope: ModuleScope): string {
  const annotation = definition.type === undefined ? "" : `: ${scope.use(definition.type)}`;
  return `export const ${definition.name}${annotation} = ${renderLiteral(definition.value)};`;
}

function renderDefinition(definition: Definition, scope: ModuleScope): string {
  const docs = renderJsDoc(definition.docs);
  switch (definition.kind) {
    case "alias":
      return `${docs}\nexport type ${definition.name} = ${scope.use(definition.target)};`;
    case "constant":
      return `${docs}\n${renderConstant(definition, scope)}`;
    case "definition":
      return `${docs}\n${renderDefinitionType(definition, scope)}`;
    default:
      throw new Error(`Unsupported definition: ${JSON.stringify(definition satisfies never)}`);
  }
}

function generateModule(module: Module, revision: Revision): string {
  const index = indexRevision(revision);
  const scope = createModuleScope(module, index);

  const brands = module.definitions
    .filter((definition) => isBranded(definition))
    .map((definition) => {
      const docs = `/** A type-only symbol used to brand {@link ${definition.name}}, so a plain \`string\` can't be mistaken for one. */`;
      return `${docs}\ndeclare const ${brandSymbolName(definition)}: unique symbol;`;
    });
  const definitions = module.definitions.map((definition) => renderDefinition(definition, scope));
  const imports = [...scope.imports()].map(([importedModule, names]) =>
    renderImport(names, `./${importedModule.name}.js`, { type: true }),
  );

  return joinBlocks([imports.join("\n"), ...brands, ...definitions]);
}

function generateRevisionIndex(revision: Revision): string {
  const exports = revision.modules.map((module) => {
    const hasValues = module.definitions.some((definition) => definition.kind === "constant");
    return `export ${hasValues ? "*" : "type *"} from "./${module.name}.js";`;
  });
  return joinBlocks([
    `// oxlint-disable oxc/no-barrel-file -- This is an entrypoint for the ${revision.folder} API revision`,
    exports.join("\n"),
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
