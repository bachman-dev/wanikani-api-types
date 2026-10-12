// oxlint-disable oxc/no-barrel-file -- This is the entrypoint for building schema and generators
/**
 * The building blocks for defining the WaniKani API schema, and helpers for writing generators that turn it into type
 * definitions or runtime schema.
 */

export * from "./analysis.js";
export * from "./codegen.js";
export * from "./docs.js";
export * from "./revision.js";
export * from "./schema.js";
export * from "./text.js";
export { default as validateRevision } from "./validate.js";
