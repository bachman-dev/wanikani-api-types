import type * as v from "valibot";
import { getLocale } from "./_internal.js";

type Message = v.ErrorMessage<v.UnionIssue<v.NeverIssue | v.NumberIssue | v.ObjectIssue>>;

const en: Message = "Review Payload must have one and only one of either an assignment_id or subject_id number";

// @__NO_SIDE_EFFECTS__
export const reviewPayloadUnion: Message = (issue) => {
  const locale = getLocale(issue);
  switch (locale) {
    default:
      return en;
  }
};
