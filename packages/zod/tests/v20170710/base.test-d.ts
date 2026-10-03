import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import type * as z from "zod/mini";
import { describe, expectTypeOf } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("DatableString", () => {
  testFor("Schema output is the DatableString type from the types package", () => {
    expectTypeOf<z.output<typeof WaniKani.DatableString>>().toEqualTypeOf<Types.DatableString>();
    expectTypeOf<WaniKani.DatableString>().toEqualTypeOf<Types.DatableString>();
  });
  testFor("Schema input is a plain string", () => {
    expectTypeOf<z.input<typeof WaniKani.DatableString>>().toEqualTypeOf<string>();
  });
});
