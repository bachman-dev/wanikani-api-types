import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";

/**
 * The minimum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MIN_SRS_STAGE = 0;

/**
 * The maximum SRS Stage Number used in WaniKani's reviews; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MAX_SRS_REVIEW_STAGE = 8;

/**
 * The maximum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MAX_SRS_STAGE = 9;

/**
 * A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.
 *
 * @category Spaced Repetition Systems
 */
export type SpacedRepetitionSystemStageNumber = number & {};
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
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystemStageNumber(value: unknown): value is SpacedRepetitionSystemStageNumber {
  return v.is(SpacedRepetitionSystemStageNumber, value);
}

/**
 * An individual Spaced Repetition System (SRS) Stage.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 * @category Spaced Repetition Systems
 */
export interface SpacedRepetitionSystemStage {
  /**
   * The length of time added to the time of review registration, adjusted to the beginning of the hour.
   */
  interval: number | null;

  /**
   * Unit of time. Can be the following: `milliseconds`, `seconds`, `minutes`, `hours`, `days`, and `weeks`.
   */
  interval_unit: "days" | "hours" | "milliseconds" | "minutes" | "seconds" | "weeks" | null;

  /**
   * The position of the stage within the continuous order.
   */
  position: SpacedRepetitionSystemStageNumber;
}
export const SpacedRepetitionSystemStage = v.object({
  interval: v.union([v.number(), v.null()]),
  interval_unit: v.union([v.picklist(["days", "hours", "milliseconds", "minutes", "seconds", "weeks"]), v.null()]),
  position: SpacedRepetitionSystemStageNumber,
});

/**
 * Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has
 * relationship with Subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 * @category Resources
 * @category Spaced Repetition Systems
 */
export interface SpacedRepetitionSystem extends BaseResource {
  /**
   * Data for the return Spaced Repetition System.
   */
  data: {
    /**
     * `position` of the burning stage.
     */
    burning_stage_position: SpacedRepetitionSystemStageNumber;

    /**
     * Timestamp when the `spaced_repetition_system` was created.
     */
    created_at: DatableString;

    /**
     * Details about the spaced repetition system.
     */
    description: string;

    /**
     * The name of the spaced repetition system.
     */
    name: string;

    /**
     * `position` of the passing stage.
     */
    passing_stage_position: SpacedRepetitionSystemStageNumber;

    /**
     * A collection of stages.
     */
    stages: SpacedRepetitionSystemStage[];

    /**
     * `position` of the starting stage.
     */
    starting_stage_position: SpacedRepetitionSystemStageNumber;

    /**
     * `position` of the unlocking stage.
     */
    unlocking_stage_position: SpacedRepetitionSystemStageNumber;
  };

  /**
   * A unique number identifying the Spaced Repetition System.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "spaced_repetition_system";
}
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
      id: v.number(),
      object: v.literal("spaced_repetition_system"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Spaced Repetition Systems
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystem(value: unknown): value is SpacedRepetitionSystem {
  return v.is(SpacedRepetitionSystem, value);
}

/**
 * A collection of Spaced Repetition Systems returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @category Collections
 * @category Spaced Repetition Systems
 */
export interface SpacedRepetitionSystemCollection extends BaseCollection {
  /**
   * An array of returned Spaced Repetition Systems.
   */
  data: SpacedRepetitionSystem[];
}
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
 */
// @__NO_SIDE_EFFECTS__
export function isSpacedRepetitionSystemCollection(value: unknown): value is SpacedRepetitionSystemCollection {
  return v.is(SpacedRepetitionSystemCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Spaced Repetition System Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 * @category Parameters
 * @category Spaced Repetition Systems
 */
export type SpacedRepetitionSystemParameters = CollectionParameters;
export const SpacedRepetitionSystemParameters = CollectionParameters;
