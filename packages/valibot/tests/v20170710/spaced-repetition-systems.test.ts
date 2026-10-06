import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor(`Invalid SRS Stage Number: ${WaniKani.MIN_SRS_STAGE - 1}`, () => {
    expect(() => v.assert(WaniKani.SpacedRepetitionSystemStageNumber, -1)).toThrow(
      `Invalid value: Expected >=${WaniKani.MIN_SRS_STAGE} but received ${WaniKani.MIN_SRS_STAGE - 1}`,
    );
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(WaniKani.MIN_SRS_STAGE - 1)).toBe(false);
  });
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      for (const stage of spacedRepetitionSystemStageNumbers) {
        expect(() => v.assert(WaniKani.SpacedRepetitionSystemStageNumber, stage)).not.toThrow();
        expect(WaniKani.isSpacedRepetitionSystemStageNumber(stage)).toBe(true);
      }
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
  testFor(`Invalid SRS Stage Number: ${WaniKani.MAX_SRS_STAGE + 1}`, () => {
    expect(() => v.assert(WaniKani.SpacedRepetitionSystemStageNumber, WaniKani.MAX_SRS_STAGE + 1)).toThrow(
      `Invalid value: Expected <=${WaniKani.MAX_SRS_STAGE} but received ${WaniKani.MAX_SRS_STAGE + 1}`,
    );
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(WaniKani.MAX_SRS_STAGE + 1)).toBe(false);
  });
  testFor("Invalid SRS Stage: Non-Integer", () => {
    expect(() => v.assert(WaniKani.SpacedRepetitionSystemStageNumber, 1.23)).toThrow(
      "Invalid safe integer: Received 1.23",
    );
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(1.23)).toBe(false);
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    expect(() => v.assert(WaniKani.SpacedRepetitionSystem, spacedRepetitionSystem)).not.toThrow();
    expect(WaniKani.isSpacedRepetitionSystem(spacedRepetitionSystem)).toBe(true);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    expect(() => v.assert(WaniKani.SpacedRepetitionSystemCollection, spacedRepetitionSystemCollection)).not.toThrow();
    expect(WaniKani.isSpacedRepetitionSystemCollection(spacedRepetitionSystemCollection)).toBe(true);
  });
});
