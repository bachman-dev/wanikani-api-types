import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    expect(() => v.assert(WK.ReviewStatistic, reviewStatistic)).not.toThrow();
    expect(WK.isReviewStatistic(reviewStatistic)).toBe(true);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    expect(() => v.assert(WK.ReviewStatisticCollection, reviewStatisticCollection)).not.toThrow();
    expect(WK.isReviewStatisticCollection(reviewStatisticCollection)).toBe(true);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.ReviewStatisticParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.ReviewStatisticParameters, reviewStatisticParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    expect(() => v.assert(WK.ReviewStatisticParameters, reviewStatisticParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    expect(() => v.assert(WK.ReviewStatisticParameters, reviewStatisticParamsWithDates)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.ReviewStatisticParameters, reviewStatisticParamsWithDatableStrings)).not.toThrow();
  });
});
