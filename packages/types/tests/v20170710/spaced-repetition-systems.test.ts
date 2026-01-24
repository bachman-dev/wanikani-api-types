import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Invalid SRS Stage Number: -1", () => {
    expect(() => v.assert(WK.SpacedRepetitionSystemStageNumber, -1)).toThrow();
    expect(WK.isSpacedRepetitionSystemStageNumber(-1)).toBe(false);
  });
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      spacedRepetitionSystemStageNumbers.forEach((stage) => {
        expect(() => v.assert(WK.SpacedRepetitionSystemStageNumber, stage)).not.toThrow();
        expect(WK.isSpacedRepetitionSystemStageNumber(stage)).toBe(true);
      });
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
  testFor(`Invalid SRS Stage Number: ${WK.MAX_SRS_STAGE + 1}`, () => {
    expect(() => v.assert(WK.SpacedRepetitionSystemStageNumber, WK.MAX_SRS_STAGE + 1)).toThrow();
    expect(WK.isSpacedRepetitionSystemStageNumber(WK.MAX_SRS_STAGE + 1)).toBe(false);
  });
  testFor("Invalid SRS Stage: Non-Integer", () => {
    expect(() => v.assert(WK.SpacedRepetitionSystemStageNumber, 1.23)).toThrow();
    expect(WK.isSpacedRepetitionSystemStageNumber(1.23)).toBe(false);
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    expect(() => v.assert(WK.SpacedRepetitionSystem, spacedRepetitionSystem)).not.toThrow();
    expect(WK.isSpacedRepetitionSystem(spacedRepetitionSystem)).toBe(true);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    expect(() => v.assert(WK.SpacedRepetitionSystemCollection, spacedRepetitionSystemCollection)).not.toThrow();
    expect(WK.isSpacedRepetitionSystemCollection(spacedRepetitionSystemCollection)).toBe(true);
  });
});
