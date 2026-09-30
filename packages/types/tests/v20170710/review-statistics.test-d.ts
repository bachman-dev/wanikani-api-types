import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    assertType<WaniKani.ReviewStatistic>(reviewStatistic);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    assertType<WaniKani.ReviewStatisticCollection>(reviewStatisticCollection);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    assertType<WaniKani.ReviewStatisticParameters>(emptyParams);
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    assertType<WaniKani.ReviewStatisticParameters>(reviewStatisticParamsWithEmptyArrays);
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    assertType<WaniKani.ReviewStatisticParameters>(reviewStatisticParamsWithManyOptions);
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    assertType<WaniKani.ReviewStatisticParameters>(reviewStatisticParamsWithDates);
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    assertType<WaniKani.ReviewStatisticParameters>(reviewStatisticParamsWithDatableStrings);
  });
});
