import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("LevelProgression", () => {
  testFor("Real LevelProgression", ({ levelProgression }) => {
    assertType<WaniKani.LevelProgression>(levelProgression);
  });
});

describe("LevelProgressionCollection", () => {
  testFor("Real LevelProgressionCollection", ({ levelProgressionCollection }) => {
    assertType<WaniKani.LevelProgressionCollection>(levelProgressionCollection);
  });
});
