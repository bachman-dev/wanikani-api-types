import { describe, expectTypeOf } from "vitest";

import * as Utils from "../../src/v20170710/index.js";
import { testFor } from "./fixtures.js";

describe("stringifyParameters", () => {
  testFor("Return type is a string", ({ collectionParamsWithManyOptions }) => {
    expectTypeOf(Utils.stringifyParameters(collectionParamsWithManyOptions)).toBeString();
  });
});
