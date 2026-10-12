import type { Text } from "./text.js";

function isText(docs: DocsInput): docs is Text {
  return typeof docs === "string" || Array.isArray(docs);
}

function toDocs(docs: DocsInput): Docs {
  return isText(docs) ? { description: docs } : docs;
}

/** Documentation attached to a definition or an object property. */
export interface Docs {
  /** The main description, printed first. */
  readonly description?: Text;

  /** Printed as a `@deprecated` tag. */
  readonly deprecated?: Text;

  /** Printed as a `@remarks` tag. */
  readonly remarks?: Text;

  /**
   * Printed as `@category` tags, alongside the category of the module containing the definition. Only used for
   * definitions.
   */
  readonly categories?: readonly string[];

  /** URLs printed as `@see` tags. */
  readonly see?: readonly string[];
}

/** Docs, or the text for a description-only set of docs. */
export type DocsInput = Docs | Text;

/** A literal value, e.g. the `object` key of a resource. */
export interface LiteralSchema {
  readonly kind: "literal";
  readonly value: boolean | number | string;
}

/** A string, optionally validated against a format. */
export interface StringSchema {
  readonly kind: "string";

  /**
   * When set, the string is branded with the name of its definition so that a plain `string` can't be mistaken for it;
   * only allowed for a definition's top-level schema, and should be paired with a `format`.
   */
  readonly brand?: boolean;

  /** A format the string is validated against. */
  readonly format?: "iso-timestamp";

  /** Whether surrounding whitespace is trimmed before validating. */
  readonly trim?: boolean;
}

/** A bound for a number; a constant definition is printed by name when the target supports it. */
export type NumberBound = ConstantDefinition<number> | number;

/** A number, optionally validated as a safe integer within bounds. */
export interface NumberSchema {
  readonly kind: "number";

  /** A number definition this one extends, inheriting its validation. */
  readonly base?: SchemaDefinition<NumberSchema>;

  /** Whether the number must be a safe integer. */
  readonly integer?: boolean;

  /** The inclusive maximum value. */
  readonly max?: NumberBound;

  /** The inclusive minimum value. */
  readonly min?: NumberBound;
}

export interface BooleanSchema {
  readonly kind: "boolean";
}

/** A JavaScript `Date` object. */
export interface DateSchema {
  readonly kind: "date";
}

/** A value that may never be present; used for mutually exclusive optional properties. */
export interface NeverSchema {
  readonly kind: "never";
}

/** One of a list of string values. */
export interface PicklistSchema {
  readonly kind: "picklist";
  readonly options: readonly [string, ...string[]];
}

export interface ArraySchema {
  readonly kind: "array";
  readonly item: Schema;
}

/** A labelled tuple element. */
export interface TupleItem {
  readonly name: string;
  readonly schema: Schema;
}

/** A tuple of fixed items, optionally followed by any number of rest items. */
export interface TupleSchema {
  readonly kind: "tuple";
  readonly items: readonly TupleItem[];
  readonly rest?: TupleItem;

  /** When set, all items of the tuple must be unique. */
  readonly unique?: { readonly message?: string };
}

/** An entry of an object schema. */
export interface Property {
  readonly docs?: Docs;
  readonly optional: boolean;
  readonly schema: Schema;
}

/** An object with known entries, optionally extending other object definitions. */
export interface ObjectSchema {
  readonly kind: "object";
  readonly entries: Readonly<Record<string, Property>>;
  readonly extends: readonly ObjectDefinition[];
}

/** An object with every entry of another object definition made optional. */
export interface PartialSchema {
  readonly kind: "partial";
  readonly source: ObjectDefinition;
}

export interface NullableSchema {
  readonly kind: "nullable";
  readonly wrapped: Schema;
}

export interface UnionSchema {
  readonly kind: "union";
  readonly options: readonly [Schema, Schema, ...Schema[]];

  /** The key of a custom message used when no option matches. */
  readonly message?: string;
}

/** A discriminated union of objects, keyed by a property with a literal value in each option. */
export interface VariantSchema {
  readonly kind: "variant";
  readonly key: string;
  readonly options: readonly [ObjectSchema, ObjectSchema, ...ObjectSchema[]];
}

export interface IntersectSchema {
  readonly kind: "intersect";
  readonly options: readonly [Schema, Schema, ...Schema[]];

  /** The key of a custom message used when the options can't be merged, if the target supports it. */
  readonly message?: string;
}

/** A schema that can be printed inline. */
export type InlineSchema =
  | ArraySchema
  | BooleanSchema
  | DateSchema
  | IntersectSchema
  | LiteralSchema
  | NeverSchema
  | NullableSchema
  | NumberSchema
  | ObjectSchema
  | PartialSchema
  | PicklistSchema
  | StringSchema
  | TupleSchema
  | UnionSchema
  | VariantSchema;

/** Any schema; definitions are referenced by name. */
export type Schema = AliasDefinition | InlineSchema | SchemaDefinition;

/** A named, exported schema. */
export interface SchemaDefinition<S extends InlineSchema = InlineSchema> {
  readonly kind: "definition";
  readonly name: string;
  readonly schema: S;
  readonly docs: Docs;

  /** Whether runtime schema libraries should export an `is<Name>` type guard for this definition. */
  readonly typeGuard: boolean;
}

/** A definition whose schema is object-like, i.e. can be extended or made partial. */
export type ObjectDefinition = SchemaDefinition<ObjectSchema | PartialSchema>;

/** A named, exported constant value. */
export interface ConstantDefinition<T extends number | string = number | string> {
  readonly kind: "constant";
  readonly name: string;
  readonly value: T;
  readonly docs: Docs;

  /** A definition used to annotate the constant's type. */
  readonly type?: SchemaDefinition;
}

/** Another name for an existing definition. */
export interface AliasDefinition {
  readonly kind: "alias";
  readonly name: string;
  readonly target: SchemaDefinition;
  readonly docs: Docs;
}

export type Definition = AliasDefinition | ConstantDefinition | SchemaDefinition;

export function literal(value: LiteralSchema["value"]): LiteralSchema {
  return { kind: "literal", value };
}

export function string(options: Omit<StringSchema, "kind"> = {}): StringSchema {
  return { kind: "string", ...options };
}

export function number(options: Omit<NumberSchema, "kind"> = {}): NumberSchema {
  return { kind: "number", ...options };
}

export function boolean(): BooleanSchema {
  return { kind: "boolean" };
}

export function date(): DateSchema {
  return { kind: "date" };
}

export function never(): NeverSchema {
  return { kind: "never" };
}

export function picklist(options: PicklistSchema["options"]): PicklistSchema {
  return { kind: "picklist", options };
}

export function array(item: Schema): ArraySchema {
  return { kind: "array", item };
}

export function tuple(items: readonly TupleItem[], options: Omit<TupleSchema, "items" | "kind"> = {}): TupleSchema {
  return { kind: "tuple", items, ...options };
}

export function nullable(wrapped: Schema): NullableSchema {
  return { kind: "nullable", wrapped };
}

export function union(options: UnionSchema["options"], settings: { message?: string } = {}): UnionSchema {
  return { kind: "union", options, ...settings };
}

export function variant(key: string, options: VariantSchema["options"]): VariantSchema {
  return { kind: "variant", key, options };
}

export function intersect(options: IntersectSchema["options"], settings: { message?: string } = {}): IntersectSchema {
  return { kind: "intersect", options, ...settings };
}

export function object(
  entries: Readonly<Record<string, Property>>,
  options: { extends?: readonly ObjectDefinition[] } = {},
): ObjectSchema {
  return { kind: "object", entries, extends: options.extends ?? [] };
}

export function partial(source: ObjectDefinition): PartialSchema {
  return { kind: "partial", source };
}

/**
 * A required object entry.
 *
 * @param schema The entry's schema
 * @param docs Documentation printed above the entry
 * @returns An object entry
 */
export function property(schema: Schema, docs?: DocsInput): Property {
  return docs === undefined ? { schema, optional: false } : { schema, optional: false, docs: toDocs(docs) };
}

/**
 * An optional object entry; when present, it may not be `undefined` unless its schema allows it.
 *
 * @param schema The entry's schema
 * @param docs Documentation printed above the entry
 * @returns An object entry
 */
export function optionalProperty(schema: Schema, docs?: DocsInput): Property {
  return docs === undefined ? { schema, optional: true } : { schema, optional: true, docs: toDocs(docs) };
}

/**
 * Defines a named, exported schema.
 *
 * @param name The exported name
 * @param schema The schema
 * @param docs Documentation printed above the export
 * @param options Generation options
 * @returns A schema definition, which can be referenced by other schemas
 */
export function define<S extends InlineSchema>(
  name: string,
  schema: S,
  docs: DocsInput,
  options: { typeGuard?: boolean } = {},
): SchemaDefinition<S> {
  return { kind: "definition", name, schema, docs: toDocs(docs), typeGuard: options.typeGuard ?? false };
}

/**
 * Defines a named, exported constant.
 *
 * @param name The exported name
 * @param value The constant's value
 * @param docs Documentation printed above the export
 * @param options Generation options
 * @returns A constant definition
 */
export function constant<T extends number | string>(
  name: string,
  value: T,
  docs: DocsInput,
  options: { type?: SchemaDefinition } = {},
): ConstantDefinition<T> {
  return options.type === undefined
    ? { kind: "constant", name, value, docs: toDocs(docs) }
    : { kind: "constant", name, value, docs: toDocs(docs), type: options.type };
}

/**
 * Defines another exported name for an existing schema definition.
 *
 * @param name The exported name
 * @param target The aliased definition
 * @param docs Documentation printed above the export
 * @returns An alias definition
 */
export function alias(name: string, target: SchemaDefinition, docs: DocsInput): AliasDefinition {
  return { kind: "alias", name, target, docs: toDocs(docs) };
}
