import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";
import { MAX_SRS_STAGE, MIN_SRS_STAGE } from "@bachman-dev/wanikani-api-types/v20170710";

import { BaseCollection, BaseResource, DatableString, SafeInteger } from "./base.js";

export { MIN_SRS_STAGE, MAX_SRS_REVIEW_STAGE, MAX_SRS_STAGE } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.
 *
 * @category Spaced Repetition Systems
 */
export type SpacedRepetitionSystemStageNumber = Types.SpacedRepetitionSystemStageNumber;
export const SpacedRepetitionSystemStageNumber = v.pipe(
  SafeInteger,
  v.minValue(MIN_SRS_STAGE),
  v.maxValue(MAX_SRS_STAGE),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Spaced Repetition Systems
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystemStageNumber(value: unknown): value is SpacedRepetitionSystemStageNumber {
  return v.is(SpacedRepetitionSystemStageNumber, value);
}

/**
 * An individual Spaced Repetition System (SRS) Stage.
 *
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export type SpacedRepetitionSystemStage = Types.SpacedRepetitionSystemStage;
export const SpacedRepetitionSystemStage = v.object({
  interval: v.nullable(SafeInteger),
  interval_unit: v.nullable(v.picklist(["days", "hours", "milliseconds", "minutes", "seconds", "weeks"])),
  position: SpacedRepetitionSystemStageNumber,
});

/**
 * Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has
 * relationship with Subjects.
 *
 * @category Resources
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export type SpacedRepetitionSystem = Types.SpacedRepetitionSystem;
export const SpacedRepetitionSystem = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        burning_stage_position: SpacedRepetitionSystemStageNumber,
        created_at: DatableString,
        description: v.string(),
        name: v.string(),
        passing_stage_position: SpacedRepetitionSystemStageNumber,
        stages: v.array(SpacedRepetitionSystemStage),
        starting_stage_position: SpacedRepetitionSystemStageNumber,
        unlocking_stage_position: SpacedRepetitionSystemStageNumber,
      }),
      id: SafeInteger,
      object: v.literal("spaced_repetition_system"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Spaced Repetition Systems
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystem(value: unknown): value is SpacedRepetitionSystem {
  return v.is(SpacedRepetitionSystem, value);
}

/**
 * A collection of Spaced Repetition Systems returned from the WaniKani API.
 *
 * @category Collections
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 */
export type SpacedRepetitionSystemCollection = Types.SpacedRepetitionSystemCollection;
export const SpacedRepetitionSystemCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(SpacedRepetitionSystem),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Spaced Repetition Systems
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystemCollection(value: unknown): value is SpacedRepetitionSystemCollection {
  return v.is(SpacedRepetitionSystemCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Spaced Repetition System Collection.
 *
 * @category Parameters
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export { CollectionParameters as SpacedRepetitionSystemParameters } from "./base.js";
