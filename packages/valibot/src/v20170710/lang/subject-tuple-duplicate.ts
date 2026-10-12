import type * as v from "valibot";

import { getLocale } from "./_internal.js";

/*
N.b. v.CheckItemsIssue is invariant over the checked array's type, so this message accepts any issue to be usable with
whichever array schema checks for duplicates.
*/
type Message = (issue: v.GenericIssue) => string;

// oxlint-disable-next-line id-length -- RFC-5646 compliant language code
const en = "Duplicate Subject Type detected in Subject Tuple";

// @__NO_SIDE_EFFECTS__
const subjectTupleDuplicate: Message = (issue) => {
  const locale = getLocale(issue);
  switch (locale) {
    default:
      return en;
  }
};

export default subjectTupleDuplicate;
