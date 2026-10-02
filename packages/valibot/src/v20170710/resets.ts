import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseCollection, BaseResource, DatableString, Level } from "./base.js";

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
export type Reset = Types.Reset;
export const Reset = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        confirmed_at: v.union([DatableString, v.null()]),
        created_at: DatableString,
        original_level: Level,
        target_level: Level,
      }),
      id: v.number(),
      object: v.literal("reset"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Resets
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isReset(value: unknown): value is Reset {
  return v.is(Reset, value);
}

/**
 * A collection of resets returned from the WaniKani API.
 *
 * @category Collections
 * @category Resets
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 */
export type ResetCollection = Types.ResetCollection;
export const ResetCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Reset),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Resets
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isResetCollection(value: unknown): value is ResetCollection {
  return v.is(ResetCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection.
 *
 * @category Parameters
 * @category Resets
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export { CollectionParameters as ResetParameters } from "./base.js";
