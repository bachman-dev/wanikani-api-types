import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    assertType<WK.Review>(review);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    assertType<WK.ReviewCollection>(reviewCollection);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    assertType<WK.ReviewParameters>(emptyParams);
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    assertType<WK.ReviewParameters>(reviewParamsWithEmptyArrays);
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    assertType<WK.ReviewParameters>(reviewParamsWithManyOptions);
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    assertType<WK.ReviewParameters>(reviewParamsWithDates);
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    assertType<WK.ReviewParameters>(reviewParamsWithDatableStrings);
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    assertType<WK.ReviewPayload>(reviewPayloadWithAssignmentAndDate);
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    assertType<WK.ReviewPayload>(reviewPayloadWithAssignmentAndDatableStrings);
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    assertType<WK.ReviewPayload>(reviewPayloadWithSubjectAndDate);
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    assertType<WK.ReviewPayload>(reviewPayloadWithSubjectAndDatableStrings);
  });
});

describe("CreatedReview", () => {
  testFor("Real CreatedReview", ({ createdReview }) => {
    assertType<WK.CreatedReview>(createdReview);
  });
});
