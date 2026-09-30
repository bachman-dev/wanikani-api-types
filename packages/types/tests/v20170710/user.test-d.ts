import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      for (const batchSize of lessonBatchSizeNumbers) {
        assertType<WaniKani.LessonBatchSizeNumber>(batchSize);
      }
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    assertType<WaniKani.User>(user);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    assertType<WaniKani.UserPreferencesPayload>(userPayloadWithRequiredProperties);
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    assertType<WaniKani.UserPreferencesPayload>(userPayloadWithAllProperties);
  });
});
