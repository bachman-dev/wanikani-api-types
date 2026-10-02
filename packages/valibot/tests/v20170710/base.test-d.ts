import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import type * as v from "valibot";
import { describe, expectTypeOf } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("DatableString", () => {
  testFor("Schema output is the DatableString type from the types package", () => {
    expectTypeOf<v.InferOutput<typeof WaniKani.DatableString>>().toEqualTypeOf<Types.DatableString>();
    expectTypeOf<WaniKani.DatableString>().toEqualTypeOf<Types.DatableString>();
  });
  testFor("Schema input is a plain string", () => {
    expectTypeOf<v.InferInput<typeof WaniKani.DatableString>>().toEqualTypeOf<string>();
  });
});
