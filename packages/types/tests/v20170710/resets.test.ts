import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    expect(() => v.assert(WK.Reset, reset)).not.toThrow();
    expect(WK.isReset(reset)).toBe(true);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    expect(() => v.assert(WK.ResetCollection, resetCollection)).not.toThrow();
    expect(WK.isResetCollection(resetCollection)).toBe(true);
  });
});
