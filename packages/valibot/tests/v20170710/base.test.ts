import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    expect(() => v.assert(WaniKani.ApiRevision, apiRevision)).not.toThrow();
    expect(WaniKani.isApiRevision(apiRevision)).toBe(true);
  });
});

describe("DatableString", () => {
  testFor("Valid UTC timestamp string", ({ dateTimeUtcString }) => {
    expect(() => v.assert(WaniKani.DatableString, dateTimeUtcString)).not.toThrow();
    expect(WaniKani.isDatableString(dateTimeUtcString)).toBe(true);
  });
  testFor("Valid offset timestamp string", ({ dateTimeOffsetString }) => {
    expect(() => v.assert(WaniKani.DatableString, dateTimeOffsetString)).not.toThrow();
    expect(WaniKani.isDatableString(dateTimeOffsetString)).toBe(true);
  });
  testFor("String created from Date.toISOString", ({ dateIsoString }) => {
    expect(() => v.assert(WaniKani.DatableString, dateIsoString)).not.toThrow();
    expect(WaniKani.isDatableString(dateIsoString)).toBe(true);
  });
});

describe("Level", () => {
  testFor(`Invalid Level: ${WaniKani.MIN_LEVEL - 1}`, () => {
    expect(() => v.assert(WaniKani.Level, WaniKani.MIN_LEVEL - 1)).toThrow(
      "Invalid value: Expected >=1 but received 0",
    );
    expect(WaniKani.isLevel(WaniKani.MIN_LEVEL - 1)).toBe(false);
  });
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      for (const level of levels) {
        expect(() => v.assert(WaniKani.Level, level)).not.toThrow();
        expect(WaniKani.isLevel(level)).toBe(true);
      }
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
  testFor(`Invalid Level: ${WaniKani.MAX_LEVEL + 1}`, () => {
    expect(() => v.assert(WaniKani.Level, WaniKani.MAX_LEVEL + 1)).toThrow(
      "Invalid value: Expected <=60 but received 61",
    );
    expect(WaniKani.isLevel(WaniKani.MAX_LEVEL + 1)).toBe(false);
  });
  testFor("Invalid Level: Non-Integer", () => {
    expect(() => v.assert(WaniKani.Level, 1.23)).toThrow("Invalid safe integer: Received 1.23");
    expect(WaniKani.isLevel(1.23)).toBe(false);
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, emptyParams)).not.toThrow();
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, collectionParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, collectionParamsWithManyOptions)).not.toThrow();
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, collectionParamsWithDates)).not.toThrow();
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, collectionParamsWithDatableStrings)).not.toThrow();
  });
  testFor("CollectionParameters with a bad DatableString", ({ collectionParamsWithBadDatableStringUnion }) => {
    expect(() => v.assert(WaniKani.CollectionParameters, collectionParamsWithBadDatableStringUnion)).toThrow(
      "Expected either a valid ISO-8601 timestamp string or a JavaScript Date",
    );
  });
  testFor("CollectionParameters with an explicitly undefined property", () => {
    expect(() => v.assert(WaniKani.CollectionParameters, { ids: undefined })).toThrow(
      "Invalid type: Expected Array but received undefined",
    );
  });
});

describe("ApiError", () => {
  testFor("Real ApiError", ({ apiError }) => {
    expect(() => v.assert(WaniKani.ApiError, apiError)).not.toThrow();
    expect(WaniKani.isApiError(apiError)).toBe(true);
  });
});
