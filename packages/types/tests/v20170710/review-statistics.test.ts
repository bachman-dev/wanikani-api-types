import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    expect(() => v.assert(WaniKani.ReviewStatistic, reviewStatistic)).not.toThrow();
    expect(WaniKani.isReviewStatistic(reviewStatistic)).toBe(true);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticCollection, reviewStatisticCollection)).not.toThrow();
    expect(WaniKani.isReviewStatisticCollection(reviewStatisticCollection)).toBe(true);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticParameters, reviewStatisticParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticParameters, reviewStatisticParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticParameters, reviewStatisticParamsWithDates)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.ReviewStatisticParameters, reviewStatisticParamsWithDatableStrings)).not.toThrow();
  });
});
