function isListItem(line: string): boolean {
  return line.startsWith("- ");
}

/**
 * Documentation text. A plain string is a single paragraph; an array holds several paragraphs, where consecutive list
 * items (lines starting with `- `) are kept together as one list.
 *
 * Text isn't wrapped here; the generated code is run through the formatter, which wraps comments to the print width.
 */
export type Text = string | readonly string[];

/**
 * Joins documentation text into lines, separating paragraphs with an empty line.
 *
 * @param text The text to join
 * @returns The lines of text
 */
export function textLines(text: Text): string[] {
  const paragraphs = typeof text === "string" ? [text] : text;
  const lines: string[] = [];
  for (const [index, paragraph] of paragraphs.entries()) {
    const previous = paragraphs[index - 1];
    if (previous !== undefined && !(isListItem(previous) && isListItem(paragraph))) {
      lines.push("");
    }
    lines.push(paragraph);
  }
  return lines;
}
