import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("LevelProgression", () => {
  testFor("Real LevelProgression", ({ levelProgression }) => {
    expect(() => WaniKani.LevelProgression.parse(levelProgression)).not.toThrow();
    expect(WaniKani.isLevelProgression(levelProgression)).toBe(true);
  });
});

describe("LevelProgressionCollection", () => {
  testFor("Real LevelProgressionCollection", ({ levelProgressionCollection }) => {
    expect(() => WaniKani.LevelProgressionCollection.parse(levelProgressionCollection)).not.toThrow();
    expect(WaniKani.isLevelProgressionCollection(levelProgressionCollection)).toBe(true);
  });
});
