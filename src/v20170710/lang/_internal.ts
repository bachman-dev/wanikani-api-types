import type * as v from "valibot";
/*
N.b. This is a union of RFC-5646 compliant language codes, kept as simplified as possible, i.e. only using
extensive codes for languages where there is significant difference in writing, usage, etc.
*/
export type Locale = "en";

// @__NO_SIDE_EFFECTS__
export function getLocale(issue: v.GenericIssue): Locale {
  if (typeof issue.lang === "string") {
    // English
    if (issue.lang === "en" || issue.lang.startsWith("en-")) {
      return "en";
    }
  }

  // Default: English
  return "en";
}
