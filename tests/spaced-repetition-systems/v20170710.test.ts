import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  MAX_SRS_STAGE,
  MIN_SRS_STAGE,
  SpacedRepetitionSystemStageNumber,
} from "../../src/spaced-repetition-systems/v20170710";

describe("Revision 20170710: Spaced Repetition Systems", () => {
  test("SpacedRepetitionSystemStageNumber", () => {
    expect(() => v.parse(SpacedRepetitionSystemStageNumber, -1)).toThrow();
    Array<number>(MAX_SRS_STAGE)
      .fill(MIN_SRS_STAGE)
      .map((stage, stageIdx) => stage + stageIdx)
      .forEach((stage) => expect(() => v.parse(SpacedRepetitionSystemStageNumber, stage)).not.toThrow());
    expect(() => v.parse(SpacedRepetitionSystemStageNumber, MAX_SRS_STAGE + 1)).toThrow();
  });
});
