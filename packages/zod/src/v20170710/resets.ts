import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

import { BaseCollection, BaseResource, DatableString, Level, SafeInteger } from "./base.js";

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
export const Reset = z.toZod<Types.Reset>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      confirmed_at: z.nullable(DatableString),
      created_at: DatableString,
      original_level: Level,
      target_level: Level,
    }),
    id: SafeInteger,
    object: z.literal("reset"),
  }),
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
  return z.validate(Reset, value);
}

/**
 * A collection of resets returned from the WaniKani API.
 *
 * @category Collections
 * @category Resets
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 */
export type ResetCollection = Types.ResetCollection;
export const ResetCollection = z.toZod<Types.ResetCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(Reset),
  }),
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
  return z.validate(ResetCollection, value);
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
