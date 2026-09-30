import type * as v from "valibot";

import { getLocale } from "./_internal.js";

type Message = v.ErrorMessage<v.IntersectIssue>;

// oxlint-disable-next-line id-length -- RFC-5646 compliant language code
const en: Message =
  "Failed to intersect Review Payload objects; this is usually caused when trying to merge a base object with key/value type conflicts.";

// @__NO_SIDE_EFFECTS__
const reviewPayloadIntersect: Message = (issue) => {
  const locale = getLocale(issue);
  switch (locale) {
    default:
      return en;
  }
};

export default reviewPayloadIntersect;
