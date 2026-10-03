import type * as core from "zod/v4/core";

import { getLocale } from "./_internal.ts";

type Message = core.$ZodErrorMap<core.$ZodIssueInvalidUnion>;

// oxlint-disable-next-line id-length -- RFC-5646 compliant language code
const en = "Review Payload must have one and only one of either an assignment_id or subject_id positive integer";

// @__NO_SIDE_EFFECTS__
const reviewPayloadUnion: Message = () => {
  switch (getLocale()) {
    case "en":
      return en;
    default:
      // oxlint-disable-next-line unicorn/no-useless-undefined -- Zod needs this undefined explicitly returned
      return undefined;
  }
};

export default reviewPayloadUnion;
