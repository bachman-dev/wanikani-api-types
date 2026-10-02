import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    expect(() => v.assert(WaniKani.Reset, reset)).not.toThrow();
    expect(WaniKani.isReset(reset)).toBe(true);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    expect(() => v.assert(WaniKani.ResetCollection, resetCollection)).not.toThrow();
    expect(WaniKani.isResetCollection(resetCollection)).toBe(true);
  });
});
