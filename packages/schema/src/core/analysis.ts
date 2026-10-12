import type { Module } from "./revision.js";
import type {
  AliasDefinition,
  ConstantDefinition,
  Definition,
  NumberBound,
  NumberSchema,
  ObjectDefinition,
  Property,
  Schema,
  SchemaDefinition,
} from "./schema.js";

/** The checks a number schema applies. */
interface NumberConstraints {
  integer: boolean;
  max?: NumberBound;
  min?: NumberBound;
}

function inheritedConstraints(schema: NumberSchema): NumberConstraints {
  const inherited = schema.base === undefined ? { integer: false } : inheritedConstraints(schema.base.schema);
  const constraints: NumberConstraints = { integer: inherited.integer || schema.integer === true };
  const min = schema.min ?? inherited.min;
  const max = schema.max ?? inherited.max;
  if (min !== undefined) {
    constraints.min = min;
  }
  if (max !== undefined) {
    constraints.max = max;
  }
  return constraints;
}

/** A definition referenced by a schema. */
export type Reference = ConstantDefinition | Definition;

/**
 * Calls the visitor for each schema nested in the given schema, including itself, without following references.
 *
 * @param schema The schema to walk
 * @param visit Called for each schema
 */
export function walkSchema(schema: Schema, visit: (schema: Schema) => void): void {
  visit(schema);
  switch (schema.kind) {
    case "array":
      walkSchema(schema.item, visit);
      break;
    case "nullable":
      walkSchema(schema.wrapped, visit);
      break;
    case "tuple":
      for (const item of schema.items) {
        walkSchema(item.schema, visit);
      }
      if (schema.rest !== undefined) {
        walkSchema(schema.rest.schema, visit);
      }
      break;
    case "object":
      for (const property of Object.values(schema.entries)) {
        walkSchema(property.schema, visit);
      }
      break;
    case "intersect":
    case "union":
    case "variant":
      for (const option of schema.options) {
        walkSchema(option, visit);
      }
      break;
    default:
      break;
  }
}

/**
 * Lists the definitions directly referenced by a definition, in the order they're encountered.
 *
 * @param definition The definition
 * @returns The referenced definitions
 */
export function referencesOf(definition: Definition): Reference[] {
  const references = new Set<Reference>();
  switch (definition.kind) {
    case "alias":
      references.add(definition.target);
      break;
    case "constant":
      if (definition.type !== undefined) {
        references.add(definition.type);
      }
      break;
    case "definition":
      walkSchema(definition.schema, (schema) => {
        switch (schema.kind) {
          case "alias":
          case "definition":
            references.add(schema);
            break;
          case "number":
            for (const reference of [schema.base, schema.min, schema.max]) {
              if (typeof reference === "object") {
                references.add(reference);
              }
            }
            break;
          case "object":
            for (const parent of schema.extends) {
              references.add(parent);
            }
            break;
          case "partial":
            references.add(schema.source);
            break;
          default:
            break;
        }
      });
      break;
    default:
      break;
  }
  return [...references];
}

/**
 * Lists the message keys used by a definition.
 *
 * @param definition The definition
 * @returns The message keys
 */
export function messagesOf(definition: Definition): string[] {
  const messages: string[] = [];
  if (definition.kind === "definition") {
    walkSchema(definition.schema, (schema) => {
      if ((schema.kind === "union" || schema.kind === "intersect") && schema.message !== undefined) {
        messages.push(schema.message);
      } else if (schema.kind === "tuple" && schema.unique?.message !== undefined) {
        messages.push(schema.unique.message);
      }
    });
  }
  return messages;
}

/**
 * Follows an alias to the definition it names.
 *
 * @param definition A schema or alias definition
 * @returns The schema definition, or the aliased definition
 */
export function resolveAlias(definition: AliasDefinition | SchemaDefinition): SchemaDefinition {
  return definition.kind === "alias" ? definition.target : definition;
}

/**
 * Lists all entries of an object-like definition, including inherited ones, in the order they're printed.
 *
 * @param definition An object or partial object definition
 * @returns The entries; entries of a partial definition are all optional
 */
export function objectEntries(definition: ObjectDefinition): [key: string, property: Property][] {
  const { schema } = definition;
  if (schema.kind === "partial") {
    return objectEntries(schema.source).map(([key, property]) => [key, { ...property, optional: true }]);
  }
  const entries = new Map<string, Property>();
  for (const parent of schema.extends) {
    for (const [key, property] of objectEntries(parent)) {
      entries.set(key, property);
    }
  }
  for (const [key, property] of Object.entries(schema.entries)) {
    entries.set(key, property);
  }
  return [...entries];
}

/**
 * Gets the numeric value of a number bound.
 *
 * @param bound A number or constant definition
 * @returns The bound's value
 */
export function boundValue(bound: NumberBound): number {
  return typeof bound === "number" ? bound : bound.value;
}

/**
 * Determines which checks a number schema needs on top of its base; e.g. a minimum of `0` isn't repeated when the base
 * already requires it, which would otherwise report the same issue twice.
 *
 * @param schema A number schema
 * @returns The checks to apply, in addition to those of the schema's base
 */
export function numberChecks(schema: NumberSchema): NumberConstraints {
  const base = schema.base === undefined ? { integer: false } : inheritedConstraints(schema.base.schema);
  const checks: NumberConstraints = { integer: schema.integer === true && !base.integer };
  if (schema.min !== undefined && (base.min === undefined || boundValue(schema.min) > boundValue(base.min))) {
    checks.min = schema.min;
  }
  if (schema.max !== undefined && (base.max === undefined || boundValue(schema.max) < boundValue(base.max))) {
    checks.max = schema.max;
  }
  return checks;
}

/**
 * Collects the categories of a definition: its module's category, along with any of its own, sorted alphabetically.
 *
 * @param definition The definition
 * @param module The module containing the definition
 * @returns The categories
 */
export function categoriesOf(definition: Definition, module: Module): string[] {
  return [...new Set([module.category, ...(definition.docs.categories ?? [])])].toSorted();
}

/** Lookup helpers for a revision, shared by generators. */
export interface RevisionIndex {
  /** Finds the module containing a definition, if it's part of the revision. */
  findModule: (definition: Reference) => Module | undefined;

  /**
   * Finds the module containing a definition.
   *
   * @throws {Error} If the definition isn't part of the revision
   */
  moduleOf: (definition: Reference) => Module;
}

/**
 * Indexes a revision's definitions.
 *
 * @param revision The revision
 * @returns Lookup helpers
 */
export function indexRevision(revision: { readonly modules: readonly Module[] }): RevisionIndex {
  const modules = new Map<Reference, Module>();
  for (const module of revision.modules) {
    for (const definition of module.definitions) {
      modules.set(definition, module);
    }
  }
  return {
    findModule: (definition) => modules.get(definition),
    moduleOf: (definition) => {
      const module = modules.get(definition);
      if (module === undefined) {
        throw new Error(`${definition.name} isn't part of any module in the revision`);
      }
      return module;
    },
  };
}

/**
 * Checks whether any object entry in a module is documented as deprecated; referencing such entries in generated code
 * needs the `typescript/no-deprecated` lint rule disabled.
 *
 * @param module The module
 * @returns Whether the module has deprecated entries
 */
export function hasDeprecatedEntries(module: Module): boolean {
  const deprecated: string[] = [];
  const visit = (schema: Schema): void => {
    if (schema.kind === "object") {
      for (const [key, property] of Object.entries(schema.entries)) {
        if (property.docs?.deprecated !== undefined) {
          deprecated.push(key);
        }
      }
    }
  };
  for (const definition of module.definitions) {
    if (definition.kind === "definition") {
      walkSchema(definition.schema, visit);
    }
  }
  return deprecated.length > 0;
}
