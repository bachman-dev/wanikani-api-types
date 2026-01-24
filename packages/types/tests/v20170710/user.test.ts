import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Invalid Lesson Batch Size: 2", () => {
    expect(() => v.assert(WK.LessonBatchSizeNumber, 2)).toThrow();
    expect(WK.isLessonBatchSizeNumber(2)).toBe(false);
  });
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      lessonBatchSizeNumbers.forEach((batchSize) => {
        expect(() => v.assert(WK.LessonBatchSizeNumber, batchSize)).not.toThrow();
        expect(WK.isLessonBatchSizeNumber(batchSize)).toBe(true);
      });
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
  testFor(`Invalid Lesson Batch Size: ${WK.MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => v.assert(WK.LessonBatchSizeNumber, WK.MAX_LESSON_BATCH_SIZE + 1)).toThrow();
    expect(WK.isLessonBatchSizeNumber(WK.MAX_LESSON_BATCH_SIZE + 1)).toBe(false);
  });
  testFor("Invalid Lesson Batch Size: Non-Integer", () => {
    expect(() => v.assert(WK.LessonBatchSizeNumber, 3.45)).toThrow();
    expect(WK.isLessonBatchSizeNumber(3.45)).toBe(false);
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    expect(() => v.assert(WK.User, user)).not.toThrow();
    expect(WK.isUser(user)).toBe(true);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    expect(() => v.assert(WK.UserPreferencesPayload, userPayloadWithRequiredProperties)).not.toThrow();
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    expect(() => v.assert(WK.UserPreferencesPayload, userPayloadWithAllProperties)).not.toThrow();
  });
});
