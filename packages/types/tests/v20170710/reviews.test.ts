import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    expect(() => v.assert(WK.Review, review)).not.toThrow();
    expect(WK.isReview(review)).toBe(true);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    expect(() => v.assert(WK.ReviewCollection, reviewCollection)).not.toThrow();
    expect(WK.isReviewCollection(reviewCollection)).toBe(true);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.ReviewParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.ReviewParameters, reviewParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    expect(() => v.assert(WK.ReviewParameters, reviewParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    expect(() => v.assert(WK.ReviewParameters, reviewParamsWithDates)).not.toThrow();
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.ReviewParameters, reviewParamsWithDatableStrings)).not.toThrow();
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    expect(() => v.assert(WK.ReviewPayload, reviewPayloadWithAssignmentAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    expect(() => v.assert(WK.ReviewPayload, reviewPayloadWithAssignmentAndDatableStrings)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    expect(() => v.assert(WK.ReviewPayload, reviewPayloadWithSubjectAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    expect(() => v.assert(WK.ReviewPayload, reviewPayloadWithSubjectAndDatableStrings)).not.toThrow();
  });
});

describe("CreatedReview", () => {
  testFor("Real CreatedReview", ({ createdReview }) => {
    expect(() => v.assert(WK.CreatedReview, createdReview)).not.toThrow();
    expect(WK.isCreatedReview(createdReview)).toBe(true);
  });
});
