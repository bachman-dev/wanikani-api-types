import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    expect(() => v.assert(WK.ApiRevision, apiRevision)).not.toThrow();
    expect(WK.isApiRevision(apiRevision)).toBe(true);
  });
});

describe("DatableString", () => {
  testFor("Valid UTC timestamp string", ({ dateTimeUtcString }) => {
    expect(() => v.assert(WK.DatableString, dateTimeUtcString)).not.toThrow();
    expect(WK.isDatableString(dateTimeUtcString)).toBe(true);
  });
  testFor("Valid offset timestamp string", ({ dateTimeOffsetString }) => {
    expect(() => v.assert(WK.DatableString, dateTimeOffsetString)).not.toThrow();
    expect(WK.isDatableString(dateTimeOffsetString)).toBe(true);
  });
  testFor("String created from Date.toISOString", ({ dateIsoString }) => {
    expect(() => v.assert(WK.DatableString, dateIsoString)).not.toThrow();
    expect(WK.isDatableString(dateIsoString)).toBe(true);
  });
});

describe("Level", () => {
  testFor(`Invalid Level: ${WK.MIN_LEVEL - 1}`, () => {
    expect(() => v.assert(WK.Level, WK.MIN_LEVEL - 1)).toThrow();
    expect(WK.isLevel(WK.MIN_LEVEL - 1)).toBe(false);
  });
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      levels.forEach((level) => {
        expect(() => v.assert(WK.Level, level)).not.toThrow();
        expect(WK.isLevel(level)).toBe(true);
      });
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
  testFor(`Invalid Level: ${WK.MAX_LEVEL + 1}`, () => {
    expect(() => v.assert(WK.Level, WK.MAX_LEVEL + 1)).toThrow();
    expect(WK.isLevel(WK.MAX_LEVEL + 1)).toBe(false);
  });
  testFor("Invalid Level: Non-Integer", () => {
    expect(() => v.assert(WK.Level, 1.23)).toThrow();
    expect(WK.isLevel(1.23)).toBe(false);
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.CollectionParameters, emptyParams)).not.toThrow();
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.CollectionParameters, collectionParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    expect(() => v.assert(WK.CollectionParameters, collectionParamsWithManyOptions)).not.toThrow();
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    expect(() => v.assert(WK.CollectionParameters, collectionParamsWithDates)).not.toThrow();
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.CollectionParameters, collectionParamsWithDatableStrings)).not.toThrow();
  });
});

describe("ApiError", () => {
  testFor("Real ApiError", ({ apiError }) => {
    expect(() => v.assert(WK.ApiError, apiError)).not.toThrow();
    expect(WK.isApiError(apiError)).toBe(true);
  });
});
