import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

z.config(en());

describe("LessonBatchSizeNumber", () => {
  testFor(`Invalid Lesson Batch Size: ${WaniKani.MIN_LESSON_BATCH_SIZE - 1}`, () => {
    expect(() => WaniKani.LessonBatchSizeNumber.parse(WaniKani.MIN_LESSON_BATCH_SIZE - 1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_small",
          minimum: WaniKani.MIN_LESSON_BATCH_SIZE,
          inclusive: true,
          path: [],
          message: `Too small: expected number to be >=${WaniKani.MIN_LESSON_BATCH_SIZE}`,
        },
      ]),
    );
    expect(WaniKani.isLessonBatchSizeNumber(WaniKani.MIN_LESSON_BATCH_SIZE - 1)).toBe(false);
  });
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      for (const batchSize of lessonBatchSizeNumbers) {
        expect(() => WaniKani.LessonBatchSizeNumber.parse(batchSize)).not.toThrow();
        expect(WaniKani.isLessonBatchSizeNumber(batchSize)).toBe(true);
      }
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
  testFor(`Invalid Lesson Batch Size: ${WaniKani.MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => WaniKani.LessonBatchSizeNumber.parse(WaniKani.MAX_LESSON_BATCH_SIZE + 1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_big",
          maximum: WaniKani.MAX_LESSON_BATCH_SIZE,
          inclusive: true,
          path: [],
          message: `Too big: expected number to be <=${WaniKani.MAX_LESSON_BATCH_SIZE}`,
        },
      ]),
    );
    expect(WaniKani.isLessonBatchSizeNumber(WaniKani.MAX_LESSON_BATCH_SIZE + 1)).toBe(false);
  });
  testFor("Invalid Lesson Batch Size: Non-Integer", () => {
    const issue: z.$ZodIssueInvalidType & { format: "safeint" } = {
      expected: "int",
      format: "safeint",
      code: "invalid_type",
      path: [],
      message: "Invalid input: expected int, received number",
    };
    expect(() => WaniKani.LessonBatchSizeNumber.parse(3.45)).toThrow(new z.$ZodRealError([issue]));
    expect(WaniKani.isLessonBatchSizeNumber(3.45)).toBe(false);
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    expect(() => WaniKani.User.parse(user)).not.toThrow();
    expect(WaniKani.isUser(user)).toBe(true);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    expect(() => WaniKani.UserPreferencesPayload.parse(userPayloadWithRequiredProperties)).not.toThrow();
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    expect(() => WaniKani.UserPreferencesPayload.parse(userPayloadWithAllProperties)).not.toThrow();
  });
  testFor("Payload with an explicitly undefined property", () => {
    const payload = { user: { preferences: { lessons_batch_size: undefined } } };
    expect(() => WaniKani.UserPreferencesPayload.parse(payload)).toThrow(
      new z.$ZodRealError([
        {
          expected: "number",
          code: "invalid_type",
          path: ["user", "preferences", "lessons_batch_size"],
          message: "Invalid input: expected number, received undefined",
        },
      ]),
    );
  });
});
