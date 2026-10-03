let lang: string | undefined;

export type Locale = "en";

/**
 * Set the language for this package's custom messages
 *
 * @param value The RFC-5646 tag to set the preferred locale to
 */
export function setLang(value: string | undefined): void {
  lang = value;
}

// @__NO_SIDE_EFFECTS__
export function getLocale(): Locale | undefined {
  if (lang === undefined || lang === "en" || lang.startsWith("en-")) {
    return "en";
  }
  return undefined;
}
