import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      lessonBatchSizeNumbers.forEach((batchSize) => {
        assertType<WK.LessonBatchSizeNumber>(batchSize);
      });
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    assertType<WK.User>(user);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    assertType<WK.UserPreferencesPayload>(userPayloadWithRequiredProperties);
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    assertType<WK.UserPreferencesPayload>(userPayloadWithAllProperties);
  });
});
