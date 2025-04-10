import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    assertType<WK.Reset>(reset);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    assertType<WK.ResetCollection>(resetCollection);
  });
});
