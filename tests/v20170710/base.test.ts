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

describe("stringifyParameters", () => {
  testFor("Properly stringifies empty objects", () => {
    const params: WK.AssignmentParameters = {};
    expect(WK.stringifyParameters(params)).toBe("");
  });

  testFor("Properly stringifies booleans", () => {
    const params: WK.AssignmentParameters = {
      hidden: false,
      burned: true,
    };
    const expectedString = "?hidden=false&burned=true";
    expect(WK.stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies WaniKani API empty query parameters", () => {
    const params: WK.AssignmentParameters = {
      immediately_available_for_lessons: true,
      immediately_available_for_review: true,
      in_review: true,
    };
    const expectedString = "?immediately_available_for_lessons&immediately_available_for_review&in_review";
    expect(WK.stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies arrays", () => {
    const params: WK.SubjectParameters = {
      ids: [1, 2, 3, 4],
      types: ["radical", "kanji"],
    };
    const expectedString = "?ids=1,2,3,4&types=radical,kanji";
    expect(WK.stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies dates", () => {
    const dateString = v.parse(WK.DatableString, "2022-10-31T12:00:00.000Z");
    const params: WK.AssignmentParameters = {
      available_after: dateString,
      available_before: new Date("2021-10-31T12:00:00.000000Z"),
    };
    const expectedString = "?available_after=2022-10-31T12:00:00.000Z&available_before=2021-10-31T12:00:00.000Z";
    expect(WK.stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Throws an error when passed a non-object", () => {
    const notAnObject = "not an object";
    // @ts-expect-error -- We pass a string instead of an object to test throwing an error
    expect(() => WK.stringifyParameters(notAnObject)).toThrow(
      'Invalid type: Expected Object but received "not an object"',
    );
  });
});

describe("ApiError", () => {
  testFor("Real ApiError", ({ apiError }) => {
    expect(() => v.assert(WK.ApiError, apiError)).not.toThrow();
    expect(WK.isApiError(apiError)).toBe(true);
  });
});
