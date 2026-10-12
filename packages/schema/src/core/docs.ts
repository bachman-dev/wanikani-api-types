import type { Docs } from "./schema.js";
import { textLines } from "./text.js";

function prefixFirstLine(prefix: string, lines: string[]): string[] {
  return lines.map((line, index) => (index === 0 ? `${prefix}${line}` : line));
}

export interface JsDocOptions {
  /** `@category` tags to print; for definitions, see {@link categoriesOf}. */
  readonly categories?: readonly string[];

  /** Extra tags to print after all others, e.g. `@param value An unknown value`. */
  readonly tags?: readonly string[];
}

/**
 * Renders docs as a JSDoc comment, without wrapping lines or indentation; the generated code is expected to be run
 * through the formatter.
 *
 * @param docs The docs to render
 * @param options Additional tags to render
 * @returns The JSDoc comment, or an empty string if there's nothing to render
 */
export function renderJsDoc(docs: Docs | undefined, options: JsDocOptions = {}): string {
  const lines: string[] = docs?.description === undefined ? [] : textLines(docs.description);
  const tags: string[] = [];

  if (docs?.deprecated !== undefined) {
    tags.push(...prefixFirstLine("@deprecated ", textLines(docs.deprecated)));
  }
  if (docs?.remarks !== undefined) {
    tags.push(...prefixFirstLine("@remarks ", textLines(docs.remarks)));
  }
  for (const category of options.categories ?? []) {
    tags.push(`@category ${category}`);
  }
  for (const url of docs?.see ?? []) {
    tags.push(`@see {@link ${url}}`);
  }
  tags.push(...(options.tags ?? []));

  if (tags.length > 0) {
    if (lines.length > 0) {
      lines.push("");
    }
    lines.push(...tags);
  }

  if (lines.length === 0) {
    return "";
  }
  if (lines.length === 1) {
    return `/** ${lines[0]} */`;
  }
  return ["/**", ...lines.map((line) => (line === "" ? " *" : ` * ${line}`)), " */"].join("\n");
}
