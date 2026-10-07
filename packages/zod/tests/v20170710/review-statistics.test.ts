import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    expect(() => WaniKani.ReviewStatistic.parse(reviewStatistic)).not.toThrow();
    expect(WaniKani.isReviewStatistic(reviewStatistic)).toBe(true);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    expect(() => WaniKani.ReviewStatisticCollection.parse(reviewStatisticCollection)).not.toThrow();
    expect(WaniKani.isReviewStatisticCollection(reviewStatisticCollection)).toBe(true);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    expect(() => WaniKani.ReviewStatisticParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    expect(() => WaniKani.ReviewStatisticParameters.parse(reviewStatisticParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    expect(() => WaniKani.ReviewStatisticParameters.parse(reviewStatisticParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    expect(() => WaniKani.ReviewStatisticParameters.parse(reviewStatisticParamsWithDates)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    expect(() => WaniKani.ReviewStatisticParameters.parse(reviewStatisticParamsWithDatableStrings)).not.toThrow();
  });
});
