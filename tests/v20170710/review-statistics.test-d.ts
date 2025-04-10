import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    assertType<WK.ReviewStatistic>(reviewStatistic);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    assertType<WK.ReviewStatisticCollection>(reviewStatisticCollection);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    assertType<WK.ReviewStatisticParameters>(emptyParams);
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    assertType<WK.ReviewStatisticParameters>(reviewStatisticParamsWithEmptyArrays);
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    assertType<WK.ReviewStatisticParameters>(reviewStatisticParamsWithManyOptions);
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    assertType<WK.ReviewStatisticParameters>(reviewStatisticParamsWithDates);
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    assertType<WK.ReviewStatisticParameters>(reviewStatisticParamsWithDatableStrings);
  });
});
