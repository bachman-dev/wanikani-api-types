import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Invalid Lesson Batch Size: 2", () => {
    expect(() => v.assert(WaniKani.LessonBatchSizeNumber, 2)).toThrow("Invalid value: Expected >=3 but received 2");
    expect(WaniKani.isLessonBatchSizeNumber(2)).toBe(false);
  });
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      for (const batchSize of lessonBatchSizeNumbers) {
        expect(() => v.assert(WaniKani.LessonBatchSizeNumber, batchSize)).not.toThrow();
        expect(WaniKani.isLessonBatchSizeNumber(batchSize)).toBe(true);
      }
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
  testFor(`Invalid Lesson Batch Size: ${WaniKani.MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => v.assert(WaniKani.LessonBatchSizeNumber, WaniKani.MAX_LESSON_BATCH_SIZE + 1)).toThrow(
      "Invalid value: Expected <=10 but received 11",
    );
    expect(WaniKani.isLessonBatchSizeNumber(WaniKani.MAX_LESSON_BATCH_SIZE + 1)).toBe(false);
  });
  testFor("Invalid Lesson Batch Size: Non-Integer", () => {
    expect(() => v.assert(WaniKani.LessonBatchSizeNumber, 3.45)).toThrow("Invalid safe integer: Received 3.45");
    expect(WaniKani.isLessonBatchSizeNumber(3.45)).toBe(false);
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    expect(() => v.assert(WaniKani.User, user)).not.toThrow();
    expect(WaniKani.isUser(user)).toBe(true);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    expect(() => v.assert(WaniKani.UserPreferencesPayload, userPayloadWithRequiredProperties)).not.toThrow();
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    expect(() => v.assert(WaniKani.UserPreferencesPayload, userPayloadWithAllProperties)).not.toThrow();
  });
});
