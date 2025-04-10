import type * as v from "valibot";
import { getLocale } from "./_internal.js";

type Message = v.ErrorMessage<v.UnionIssue<v.DateIssue | v.IsoTimestampIssue<string> | v.StringIssue>>;

const en: Message = "Expected either a valid ISO-8601 timestamp string or a JavaScript Date";

// @__NO_SIDE_EFFECTS__
export const dateUnion: Message = (issue) => {
  const locale = getLocale(issue);
  switch (locale) {
    default:
      return en;
  }
};
