import type * as core from "zod/v4/core";

import { getLocale } from "./_internal.js";

type Message = core.$ZodErrorMap<NonNullable<core.$ZodIssue>>;

// oxlint-disable-next-line id-length -- RFC-5646 compliant language code
const en = "Duplicate Subject Type detected in Subject Tuple";

// @__NO_SIDE_EFFECTS__
const subjectTupleDuplicate: Message = () => {
  switch (getLocale()) {
    case "en":
      return en;
    default:
      // oxlint-disable-next-line unicorn/no-useless-undefined -- Zod needs this undefined explicitly returned
      return undefined;
  }
};

export default subjectTupleDuplicate;
