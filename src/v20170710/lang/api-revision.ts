import type * as v from "valibot";
import { getLocale } from "./_internal.js";

type Message = v.ErrorMessage<v.LiteralIssue>;

// @__NO_SIDE_EFFECTS__
const en: Message = (issue) => `WaniKani API Revision must be ${issue.expected}, received ${issue.received}`;

// @__NO_SIDE_EFFECTS__
export const apiRevision: Message = (issue) => {
  const locale = getLocale(issue);
  switch (locale) {
    default:
      return en(issue);
  }
};
