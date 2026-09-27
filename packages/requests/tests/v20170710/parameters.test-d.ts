import { describe, expectTypeOf } from "vitest";

import stringifyParameters from "../../src/v20170710/parameters.ts";
import testFor from "./fixtures.js";

describe("stringifyParameters", () => {
  testFor("Return type is a string", ({ collectionParamsWithManyOptions }) => {
    expectTypeOf(stringifyParameters(collectionParamsWithManyOptions)).toBeString();
  });
});
