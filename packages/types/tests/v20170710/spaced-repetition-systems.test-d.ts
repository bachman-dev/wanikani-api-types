import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      for (const stage of spacedRepetitionSystemStageNumbers) {
        assertType<WaniKani.SpacedRepetitionSystemStageNumber>(stage);
      }
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    assertType<WaniKani.SpacedRepetitionSystem>(spacedRepetitionSystem);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    assertType<WaniKani.SpacedRepetitionSystemCollection>(spacedRepetitionSystemCollection);
  });
});
