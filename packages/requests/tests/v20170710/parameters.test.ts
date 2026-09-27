import type * as WK from "@bachman-dev/wanikani-api-types/v20170710";
import { describe, expect } from "vitest";

import stringifyParameters from "../../src/v20170710/parameters.ts";
import testFor from "./fixtures.js";

describe("stringifyParameters", () => {
  testFor("Properly stringifies empty objects", () => {
    const params: WK.AssignmentParameters = {};
    expect(stringifyParameters(params)).toBe("");
  });

  testFor("Properly stringifies booleans", () => {
    const params: WK.AssignmentParameters = {
      hidden: false,
      burned: true,
    };
    const expectedString = "?hidden=false&burned=true";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies WaniKani API empty query parameters", () => {
    const params: WK.AssignmentParameters = {
      immediately_available_for_lessons: true,
      immediately_available_for_review: true,
      in_review: true,
    };
    const expectedString = "?immediately_available_for_lessons&immediately_available_for_review&in_review";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies arrays", () => {
    const params: WK.SubjectParameters = {
      ids: [1, 2, 3, 4],
      types: ["radical", "kanji"],
    };
    const expectedString = "?ids=1,2,3,4&types=radical,kanji";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies dates", () => {
    const dateString = "2022-10-31T12:00:00.000Z";
    const params: WK.AssignmentParameters = {
      // @ts-expect-error -- This should ideally be a parsed DatableString, but should be okay for this test
      available_after: dateString,
      available_before: new Date("2021-10-31T12:00:00.000000Z"),
    };
    const expectedString = "?available_after=2022-10-31T12:00:00.000Z&available_before=2021-10-31T12:00:00.000Z";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Throws an error when passed a non-object", () => {
    const notAnObject = "not an object";
    // @ts-expect-error -- We pass a string instead of an object to test throwing an error
    expect(() => stringifyParameters(notAnObject)).toThrow("Parameters must be passed in as an object.");
  });
});
