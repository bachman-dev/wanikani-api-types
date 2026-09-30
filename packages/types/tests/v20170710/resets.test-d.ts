import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    assertType<WaniKani.Reset>(reset);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    assertType<WaniKani.ResetCollection>(resetCollection);
  });
});
