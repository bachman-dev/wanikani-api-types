import * as v from "valibot";
import createFixtures from "@bachman-dev/wanikani-api-fixtures/v20170710";
import { test } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";

const fixtures = createFixtures((value) => v.parse(WaniKani.DatableString, value));

const testFor = test.extend(fixtures);

export default testFor;
