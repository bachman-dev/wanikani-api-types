import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    assertType<WaniKani.Review>(review);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    assertType<WaniKani.ReviewCollection>(reviewCollection);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    assertType<WaniKani.ReviewParameters>(emptyParams);
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    assertType<WaniKani.ReviewParameters>(reviewParamsWithEmptyArrays);
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    assertType<WaniKani.ReviewParameters>(reviewParamsWithManyOptions);
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    assertType<WaniKani.ReviewParameters>(reviewParamsWithDates);
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    assertType<WaniKani.ReviewParameters>(reviewParamsWithDatableStrings);
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    assertType<WaniKani.ReviewPayload>(reviewPayloadWithAssignmentAndDate);
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    assertType<WaniKani.ReviewPayload>(reviewPayloadWithAssignmentAndDatableStrings);
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    assertType<WaniKani.ReviewPayload>(reviewPayloadWithSubjectAndDate);
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    assertType<WaniKani.ReviewPayload>(reviewPayloadWithSubjectAndDatableStrings);
  });
});

describe("CreatedReview", () => {
  testFor("Real CreatedReview", ({ createdReview }) => {
    assertType<WaniKani.CreatedReview>(createdReview);
  });
});
