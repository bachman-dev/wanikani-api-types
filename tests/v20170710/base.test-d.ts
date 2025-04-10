import * as WK from "../../src/v20170710/index.js";
import type * as v from "valibot";
import { assertType, describe, expectTypeOf } from "vitest";
import { testFor } from "./fixtures.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    assertType<WK.ApiRevision>(apiRevision);
  });
});

describe("DatableString", () => {
  testFor("Valid DatableString Type", () => {
    expectTypeOf<v.InferOutput<typeof WK.DatableString>>().toEqualTypeOf<WK.DatableString>();
  });
});

describe("Level", () => {
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      levels.forEach((level) => {
        assertType<WK.Level>(level);
      });
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    assertType<WK.CollectionParameters>(emptyParams);
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    assertType<WK.CollectionParameters>(collectionParamsWithEmptyArrays);
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    assertType<WK.CollectionParameters>(collectionParamsWithManyOptions);
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    assertType<WK.CollectionParameters>(collectionParamsWithDates);
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    assertType<WK.CollectionParameters>(collectionParamsWithDatableStrings);
  });
});

describe("stringifyParameters", () => {
  testFor("Return type is a string", ({ collectionParamsWithManyOptions }) => {
    expectTypeOf(WK.stringifyParameters(collectionParamsWithManyOptions)).toBeString();
  });
});
