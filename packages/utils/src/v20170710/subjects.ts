/**
 * A regular expression that matches the markup found in WaniKani's subject mnemonics and hints. Both the tag and inner
 * text are captured for each match.
 *
 * @category Subjects
 */
export const SUBJECT_MARKUP_MATCHER =
  /<(?<tag>ja|kanji|meaning|radical|reading|vocabulary)>(?<textContent>.*?)<\/\1>/dgv;

/**
 * An object representing parsed subject markup.
 *
 * @category Subjects
 */
export type ParsedSubjectMarkup =
  | {
      /** Plain text, either on its own or within a markup tag. */
      text: string;
    }
  | {
      /** The children underneath a given markup tag, can be either text or additional markup tags. */
      children: ParsedSubjectMarkup[];
      /** The subject markup tag that encapsulates text or other markup tags. */
      tag: "ja" | "kanji" | "meaning" | "radical" | "reading" | "vocabulary";
    };

/**
 * Parses WaniKani subject markup (mnemonics, hints, etc) for easier display/formatting.
 *
 * @category Subjects
 * @param text The subject markup to parse
 * @returns A structured array of objects that can be traversed and displayed
 */
export function parseSubjectMarkup(text: string): ParsedSubjectMarkup[] {
  if (!text) {
    return [];
  }
  const markupArray: ParsedSubjectMarkup[] = [];
  let lastIdx = 0;

  for (const match of text.matchAll(SUBJECT_MARKUP_MATCHER)) {
    if (typeof match.indices?.[0] !== "undefined") {
      const beforeText = text.slice(lastIdx, match.indices[0][0]);
      if (beforeText) {
        markupArray.push({
          text: beforeText,
        });
      }
      if (
        typeof match.groups?.textContent === "string" &&
        (match.groups.tag === "ja" ||
          match.groups.tag === "kanji" ||
          match.groups.tag === "meaning" ||
          match.groups.tag === "radical" ||
          match.groups.tag === "reading" ||
          match.groups.tag === "vocabulary")
      ) {
        const tagNode: ParsedSubjectMarkup = {
          tag: match.groups.tag,
          children: parseSubjectMarkup(match.groups.textContent),
        };
        markupArray.push(tagNode);
      }
      lastIdx = match.indices[0][1];
    }
  }
  const afterText = text.slice(lastIdx);
  if (afterText) {
    markupArray.push({
      text: afterText,
    });
  }

  return markupArray;
}
