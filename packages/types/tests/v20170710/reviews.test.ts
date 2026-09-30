import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    expect(() => v.assert(WaniKani.Review, review)).not.toThrow();
    expect(WaniKani.isReview(review)).toBe(true);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    expect(() => v.assert(WaniKani.ReviewCollection, reviewCollection)).not.toThrow();
    expect(WaniKani.isReviewCollection(reviewCollection)).toBe(true);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.ReviewParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.ReviewParameters, reviewParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.ReviewParameters, reviewParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    expect(() => v.assert(WaniKani.ReviewParameters, reviewParamsWithDates)).not.toThrow();
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.ReviewParameters, reviewParamsWithDatableStrings)).not.toThrow();
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    expect(() => v.assert(WaniKani.ReviewPayload, reviewPayloadWithAssignmentAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    expect(() => v.assert(WaniKani.ReviewPayload, reviewPayloadWithAssignmentAndDatableStrings)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    expect(() => v.assert(WaniKani.ReviewPayload, reviewPayloadWithSubjectAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    expect(() => v.assert(WaniKani.ReviewPayload, reviewPayloadWithSubjectAndDatableStrings)).not.toThrow();
  });
});

describe("CreatedReview", () => {
  testFor("Real CreatedReview", ({ createdReview }) => {
    expect(() => v.assert(WaniKani.CreatedReview, createdReview)).not.toThrow();
    expect(WaniKani.isCreatedReview(createdReview)).toBe(true);
  });
});
