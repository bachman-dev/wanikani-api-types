import { assertType, describe, expectTypeOf } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    assertType<WaniKani.ApiRevision>(apiRevision);
  });
});

describe("DatableString", () => {
  testFor("DatableString is a branded string", () => {
    expectTypeOf<WaniKani.DatableString>().toExtend<string>();
    expectTypeOf<string>().not.toExtend<WaniKani.DatableString>();
  });
  testFor("DatableString fixtures", ({ dateTimeUtcString, collectionParamsWithDatableStrings }) => {
    expectTypeOf(dateTimeUtcString).not.toExtend<WaniKani.DatableString>();
    assertType<WaniKani.DatableString | Date | undefined>(collectionParamsWithDatableStrings.updated_after);
  });
});

describe("Level", () => {
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      for (const level of levels) {
        assertType<WaniKani.Level>(level);
      }
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    assertType<WaniKani.CollectionParameters>(emptyParams);
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    assertType<WaniKani.CollectionParameters>(collectionParamsWithEmptyArrays);
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    assertType<WaniKani.CollectionParameters>(collectionParamsWithManyOptions);
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    assertType<WaniKani.CollectionParameters>(collectionParamsWithDates);
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    assertType<WaniKani.CollectionParameters>(collectionParamsWithDatableStrings);
  });
});
