import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    expect(() => WaniKani.Review.parse(review)).not.toThrow();
    expect(WaniKani.isReview(review)).toBe(true);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    expect(() => WaniKani.ReviewCollection.parse(reviewCollection)).not.toThrow();
    expect(WaniKani.isReviewCollection(reviewCollection)).toBe(true);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    expect(() => WaniKani.ReviewParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    expect(() => WaniKani.ReviewParameters.parse(reviewParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    expect(() => WaniKani.ReviewParameters.parse(reviewParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    expect(() => WaniKani.ReviewParameters.parse(reviewParamsWithDates)).not.toThrow();
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    expect(() => WaniKani.ReviewParameters.parse(reviewParamsWithDatableStrings)).not.toThrow();
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    expect(() => WaniKani.ReviewPayload.parse(reviewPayloadWithAssignmentAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    expect(() => WaniKani.ReviewPayload.parse(reviewPayloadWithAssignmentAndDatableStrings)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    expect(() => WaniKani.ReviewPayload.parse(reviewPayloadWithSubjectAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    expect(() => WaniKani.ReviewPayload.parse(reviewPayloadWithSubjectAndDatableStrings)).not.toThrow();
  });
  testFor("ReviewPayload with an explicitly undefined Subject ID", () => {
    const payload = {
      review: { assignment_id: 1, subject_id: undefined, incorrect_meaning_answers: 0, incorrect_reading_answers: 0 },
    };
    expect(() => WaniKani.ReviewPayload.parse(payload)).toThrow(
      "Review Payload must have one and only one of either an assignment_id or subject_id positive integer",
    );
  });
});

describe("CreatedReview", () => {
  testFor("Real CreatedReview", ({ createdReview }) => {
    expect(() => WaniKani.CreatedReview.parse(createdReview)).not.toThrow();
    expect(WaniKani.isCreatedReview(createdReview)).toBe(true);
  });
});
