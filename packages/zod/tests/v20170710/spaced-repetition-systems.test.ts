import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import { setLang } from "../../src/v20170710/lang/_internal.ts";
import testFor from "./fixtures.js";

z.config(en());
setLang("en");

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Invalid SRS Stage Number: -1", () => {
    expect(() => WaniKani.SpacedRepetitionSystemStageNumber.parse(-1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_small",
          minimum: WaniKani.MIN_SRS_STAGE,
          inclusive: true,
          path: [],
          message: "Too small: expected number to be >=0",
        },
      ]),
    );
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(-1)).toBe(false);
  });
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      for (const stage of spacedRepetitionSystemStageNumbers) {
        expect(() => WaniKani.SpacedRepetitionSystemStageNumber.parse(stage)).not.toThrow();
        expect(WaniKani.isSpacedRepetitionSystemStageNumber(stage)).toBe(true);
      }
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
  testFor(`Invalid SRS Stage Number: ${WaniKani.MAX_SRS_STAGE + 1}`, () => {
    expect(() => WaniKani.SpacedRepetitionSystemStageNumber.parse(WaniKani.MAX_SRS_STAGE + 1)).toThrow(
      new z.$ZodRealError([
        {
          origin: "number",
          code: "too_big",
          maximum: WaniKani.MAX_SRS_STAGE,
          inclusive: true,
          path: [],
          message: "Too big: expected number to be <=9",
        },
      ]),
    );
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(WaniKani.MAX_SRS_STAGE + 1)).toBe(false);
  });
  testFor("Invalid SRS Stage: Non-Integer", () => {
    const issue: z.$ZodIssueInvalidType & { format: "safeint" } = {
      expected: "int",
      format: "safeint",
      code: "invalid_type",
      path: [],
      message: "Invalid input: expected int, received number",
    };
    expect(() => WaniKani.SpacedRepetitionSystemStageNumber.parse(1.23)).toThrow(new z.$ZodRealError([issue]));
    expect(WaniKani.isSpacedRepetitionSystemStageNumber(1.23)).toBe(false);
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    expect(() => WaniKani.SpacedRepetitionSystem.parse(spacedRepetitionSystem)).not.toThrow();
    expect(WaniKani.isSpacedRepetitionSystem(spacedRepetitionSystem)).toBe(true);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    expect(() => WaniKani.SpacedRepetitionSystemCollection.parse(spacedRepetitionSystemCollection)).not.toThrow();
    expect(WaniKani.isSpacedRepetitionSystemCollection(spacedRepetitionSystemCollection)).toBe(true);
  });
});
