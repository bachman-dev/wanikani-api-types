import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";
import { MAX_SRS_STAGE } from "@bachman-dev/wanikani-api-types/v20170710";

import { BaseCollection, BaseResource, DatableString, SafeInteger } from "./base.js";

export { MIN_SRS_STAGE, MAX_SRS_REVIEW_STAGE, MAX_SRS_STAGE } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.
 *
 * @category Spaced Repetition Systems
 */
export type SpacedRepetitionSystemStageNumber = Types.SpacedRepetitionSystemStageNumber;
export const SpacedRepetitionSystemStageNumber = z.toZod<Types.SpacedRepetitionSystemStageNumber>()(
  SafeInteger.check(z.maximum(MAX_SRS_STAGE)),
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
  return z.validate(SpacedRepetitionSystemStageNumber, value);
}

/**
 * An individual Spaced Repetition System (SRS) Stage.
 *
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export type SpacedRepetitionSystemStage = Types.SpacedRepetitionSystemStage;
export const SpacedRepetitionSystemStage = z.toZod<Types.SpacedRepetitionSystemStage>()(
  z.object({
    interval: z.nullable(SafeInteger),
    interval_unit: z.nullable(z.enum(["days", "hours", "milliseconds", "minutes", "seconds", "weeks"])),
    position: SpacedRepetitionSystemStageNumber,
  }),
);

/**
 * Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has
 * relationship with Subjects.
 *
 * @category Resources
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export type SpacedRepetitionSystem = Types.SpacedRepetitionSystem;
export const SpacedRepetitionSystem = z.toZod<Types.SpacedRepetitionSystem>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      burning_stage_position: SpacedRepetitionSystemStageNumber,
      created_at: DatableString,
      description: z.string(),
      name: z.string(),
      passing_stage_position: SpacedRepetitionSystemStageNumber,
      stages: z.array(SpacedRepetitionSystemStage),
      starting_stage_position: SpacedRepetitionSystemStageNumber,
      unlocking_stage_position: SpacedRepetitionSystemStageNumber,
    }),
    id: SafeInteger,
    object: z.literal("spaced_repetition_system"),
  }),
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
  return z.validate(SpacedRepetitionSystem, value);
}

/**
 * A collection of Spaced Repetition Systems returned from the WaniKani API.
 *
 * @category Collections
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 */
export type SpacedRepetitionSystemCollection = Types.SpacedRepetitionSystemCollection;
export const SpacedRepetitionSystemCollection = z.toZod<Types.SpacedRepetitionSystemCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(SpacedRepetitionSystem),
  }),
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
  return z.validate(SpacedRepetitionSystemCollection, value);
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
