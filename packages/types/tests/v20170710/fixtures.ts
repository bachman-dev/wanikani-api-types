import createFixtures from "@bachman-dev/wanikani-api-fixtures/v20170710";
import { test } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";

const fixtures = createFixtures(
  // Type tests only need a DatableString at the type level, so an assertion is sufficient
  // oxlint-disable-next-line typescript/consistent-type-assertions, typescript/no-unsafe-type-assertion -- Branded type
  (value) => value as WaniKani.DatableString,
);

const testFor = test.extend(fixtures);

export default testFor;
