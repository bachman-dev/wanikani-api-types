import type { BaseCollection, BaseResource, DatableString } from "./base.js";

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

/**
 * An individual Spaced Repetition System (SRS) Stage.
 *
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export interface SpacedRepetitionSystemStage {
  /** The length of time added to the time of review registration, adjusted to the beginning of the hour. */
  interval: number | null;

  /** Unit of time. Can be the following: `milliseconds`, `seconds`, `minutes`, `hours`, `days`, and `weeks`. */
  interval_unit: "days" | "hours" | "milliseconds" | "minutes" | "seconds" | "weeks" | null;

  /** The position of the stage within the continuous order. */
  position: SpacedRepetitionSystemStageNumber;
}

/**
 * Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has
 * relationship with Subjects.
 *
 * @category Resources
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 */
export interface SpacedRepetitionSystem extends BaseResource {
  /** Data for the return Spaced Repetition System. */
  data: {
    /** `position` of the burning stage. */
    burning_stage_position: SpacedRepetitionSystemStageNumber;

    /** Timestamp when the `spaced_repetition_system` was created. */
    created_at: DatableString;

    /** Details about the spaced repetition system. */
    description: string;

    /** The name of the spaced repetition system. */
    name: string;

    /** `position` of the passing stage. */
    passing_stage_position: SpacedRepetitionSystemStageNumber;

    /** A collection of stages. */
    stages: SpacedRepetitionSystemStage[];

    /** `position` of the starting stage. */
    starting_stage_position: SpacedRepetitionSystemStageNumber;

    /** `position` of the unlocking stage. */
    unlocking_stage_position: SpacedRepetitionSystemStageNumber;
  };

  /** A unique number identifying the Spaced Repetition System. */
  id: number;

  /** The kind of object returned. */
  object: "spaced_repetition_system";
}

/**
 * A collection of Spaced Repetition Systems returned from the WaniKani API.
 *
 * @category Collections
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 */
export interface SpacedRepetitionSystemCollection extends BaseCollection {
  /** An array of returned Spaced Repetition Systems. */
  data: SpacedRepetitionSystem[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Spaced Repetition System Collection.
 *
 * @category Parameters
 * @category Spaced Repetition Systems
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type { CollectionParameters as SpacedRepetitionSystemParameters } from "./base.js";
