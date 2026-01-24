import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("LevelProgression", () => {
  testFor("Real LevelProgression", ({ levelProgression }) => {
    expect(() => v.assert(WK.LevelProgression, levelProgression)).not.toThrow();
    expect(WK.isLevelProgression(levelProgression)).toBe(true);
  });
});

describe("LevelProgressionCollection", () => {
  testFor("Real LevelProgressionCollection", ({ levelProgressionCollection }) => {
    expect(() => v.assert(WK.LevelProgressionCollection, levelProgressionCollection)).not.toThrow();
    expect(WK.isLevelProgressionCollection(levelProgressionCollection)).toBe(true);
  });
});
