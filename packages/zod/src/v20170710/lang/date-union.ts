import type * as core from "zod/v4/core";

import { getLocale } from "./_internal.js";

type Message = core.$ZodErrorMap<core.$ZodIssueInvalidUnion>;

// oxlint-disable-next-line id-length -- RFC-5646 compliant language code
const en = "Expected either a valid ISO-8601 timestamp string or a JavaScript Date";

// @__NO_SIDE_EFFECTS__
const dateUnion: Message = () => {
  switch (getLocale()) {
    case "en":
      return en;
    default:
      // oxlint-disable-next-line unicorn/no-useless-undefined -- Zod needs this undefined explicitly returned
      return undefined;
  }
};

export default dateUnion;
