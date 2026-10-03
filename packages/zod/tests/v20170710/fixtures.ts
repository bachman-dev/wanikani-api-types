import createFixtures from "@bachman-dev/wanikani-api-fixtures/v20170710";
import { test } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";

const fixtures = createFixtures((value) => WaniKani.DatableString.parse(value));

const testFor = test.extend(fixtures);

export default testFor;
