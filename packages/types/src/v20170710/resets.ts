import type { BaseCollection, BaseResource, DatableString, Level } from "./base.js";

/**
 * Users can reset their progress back to any level at or below their current level. When they reset to a particular
 * level, all of the assignments and review_statistics at that level or higher are set back to their default state.
 *
 * Resets contain information about when those resets happen, the starting level, and the target level.
 *
 * @category Resets
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#resets}
 */
export interface Reset extends BaseResource {
  /** Data for the returned reset. */
  data: {
    /** Timestamp when the user confirmed the reset. */
    confirmed_at: DatableString | null;

    /** Timestamp when the reset was created. */
    created_at: DatableString;

    /** The user's level before the reset, from `1` to `60`. */
    original_level: Level;

    /** The user's level after the reset, from `1` to `60`. It must be less than or equal to `original_level`. */
    target_level: Level;
  };

  /** A unique number identifying the reset. */
  id: number;

  /** The kind of object returned. */
  object: "reset";
}

/**
 * A collection of resets returned from the WaniKani API.
 *
 * @category Collections
 * @category Resets
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 */
export interface ResetCollection extends BaseCollection {
  /** An array of returned resets. */
  data: Reset[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection.
 *
 * @category Parameters
 * @category Resets
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type { CollectionParameters as ResetParameters } from "./base.js";
