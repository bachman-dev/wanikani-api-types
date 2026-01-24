import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      spacedRepetitionSystemStageNumbers.forEach((stage) => {
        assertType<WK.SpacedRepetitionSystemStageNumber>(stage);
      });
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    assertType<WK.SpacedRepetitionSystem>(spacedRepetitionSystem);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    assertType<WK.SpacedRepetitionSystemCollection>(spacedRepetitionSystemCollection);
  });
});
