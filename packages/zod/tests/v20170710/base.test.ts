import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import { setLang } from "../../src/v20170710/lang/_internal.ts";
import testFor from "./fixtures.js";

z.config(en());
setLang("en");

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    expect(() => WaniKani.ApiRevision.parse(apiRevision)).not.toThrow();
    expect(WaniKani.isApiRevision(apiRevision)).toBe(true);
  });
});

describe("DatableString", () => {
  testFor("Valid UTC timestamp string", ({ dateTimeUtcString }) => {
    expect(() => WaniKani.DatableString.parse(dateTimeUtcString)).not.toThrow();
    expect(WaniKani.isDatableString(dateTimeUtcString)).toBe(true);
  });
  testFor("Valid offset timestamp string", ({ dateTimeOffsetString }) => {
    expect(() => WaniKani.DatableString.parse(dateTimeOffsetString)).not.toThrow();
    expect(WaniKani.isDatableString(dateTimeOffsetString)).toBe(true);
  });
  testFor("String created from Date.toISOString", ({ dateIsoString }) => {
    expect(() => WaniKani.DatableString.parse(dateIsoString)).not.toThrow();
    expect(WaniKani.isDatableString(dateIsoString)).toBe(true);
  });
});

describe("Level", () => {
  testFor(`Invalid Level: ${WaniKani.MIN_LEVEL - 1}`, () => {
    expect(() => WaniKani.Level.parse(WaniKani.MIN_LEVEL - 1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_small",
          minimum: 1,
          inclusive: true,
          path: [],
          message: "Too small: expected number to be >=1",
        },
      ]),
    );
    expect(WaniKani.isLevel(WaniKani.MIN_LEVEL - 1)).toBe(false);
  });
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      for (const level of levels) {
        expect(() => WaniKani.Level.parse(level)).not.toThrow();
        expect(WaniKani.isLevel(level)).toBe(true);
      }
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
  testFor(`Invalid Level: ${WaniKani.MAX_LEVEL + 1}`, () => {
    expect(() => WaniKani.Level.parse(WaniKani.MAX_LEVEL + 1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_big",
          maximum: 60,
          inclusive: true,
          path: [],
          message: "Too big: expected number to be <=60",
        },
      ]),
    );
    expect(WaniKani.isLevel(WaniKani.MAX_LEVEL + 1)).toBe(false);
  });
  testFor("Invalid Level: Non-Integer", () => {
    // Zod adds `format` to safe integer issues at runtime, but $ZodIssueInvalidType doesn't declare it
    const issue: z.$ZodIssueInvalidType & { format: "safeint" } = {
      expected: "int",
      format: "safeint",
      code: "invalid_type",
      path: [],
      message: "Invalid input: expected int, received number",
    };
    expect(() => WaniKani.Level.parse(1.23)).toThrow(new z.$ZodRealError([issue]));
    expect(WaniKani.isLevel(1.23)).toBe(false);
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    expect(() => WaniKani.CollectionParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    expect(() => WaniKani.CollectionParameters.parse(collectionParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    expect(() => WaniKani.CollectionParameters.parse(collectionParamsWithManyOptions)).not.toThrow();
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    expect(() => WaniKani.CollectionParameters.parse(collectionParamsWithDates)).not.toThrow();
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    expect(() => WaniKani.CollectionParameters.parse(collectionParamsWithDatableStrings)).not.toThrow();
  });
  testFor("CollectionParameters with a bad DatableString", ({ collectionParamsWithBadDatableStringUnion }) => {
    expect(() => WaniKani.CollectionParameters.parse(collectionParamsWithBadDatableStringUnion)).toThrow(
      new z.$ZodRealError([
        {
          code: "invalid_union",
          errors: [
            [
              {
                expected: "string",
                code: "invalid_type",
                path: [],
                message: "Invalid input: expected string, received number",
              },
            ],
            [
              {
                expected: "date",
                code: "invalid_type",
                path: [],
                message: "Invalid input: expected date, received number",
              },
            ],
          ],
          path: ["updated_after"],
          message: "Expected either a valid ISO-8601 timestamp string or a JavaScript Date",
        },
      ]),
    );
  });
  testFor("CollectionParameters with an explicitly undefined property", () => {
    expect(() => WaniKani.CollectionParameters.parse({ ids: undefined })).toThrow(
      new z.$ZodRealError([
        {
          expected: "array",
          code: "invalid_type",
          path: ["ids"],
          message: "Invalid input: expected array, received undefined",
        },
      ]),
    );
  });
});

describe("ApiError", () => {
  testFor("Real ApiError", ({ apiError }) => {
    expect(() => WaniKani.ApiError.parse(apiError)).not.toThrow();
    expect(WaniKani.isApiError(apiError)).toBe(true);
  });
});
