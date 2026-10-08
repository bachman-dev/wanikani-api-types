import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseCollection, BaseResource, DatableString, Level, SafeInteger } from "./base.js";

/**
 * Level progressions contain information about a user's progress through the WaniKani levels.
 *
 * A level progression is created when a user has met the prerequisites for leveling up, which are:
 *
 * - Reach a 90% passing rate on assignments for a user's current level with a `subject_type` of `kanji`. Passed
 *   assignments have `data.passed` equal to `true` and a `data.passed_at` that's in the past.
 * - Have access to the level. Under `/user`, the `data.level` must be less than or equal to
 *   `data.subscription.max_level_granted`.
 *
 * @category Level Progressions
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#level-progressions}
 */
export type LevelProgression = Types.LevelProgression;
export const LevelProgression = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        abandoned_at: v.nullable(DatableString),
        completed_at: v.nullable(DatableString),
        created_at: DatableString,
        level: Level,
        passed_at: v.nullable(DatableString),
        started_at: v.nullable(DatableString),
        unlocked_at: v.nullable(DatableString),
      }),
      id: SafeInteger,
      object: v.literal("level_progression"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Level Progressions
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isLevelProgression(value: unknown): value is LevelProgression {
  return v.is(LevelProgression, value);
}

/**
 * A collection of level progressions returned from the WaniKani API.
 *
 * @category Collections
 * @category Level Progressions
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 */
export type LevelProgressionCollection = Types.LevelProgressionCollection;
export const LevelProgressionCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(LevelProgression),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Level Progressions
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isLevelProgressionCollection(value: unknown): value is LevelProgressionCollection {
  return v.is(LevelProgressionCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Level Progression Collection.
 *
 * @category Level Progressions
 * @category Parameters
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export { CollectionParameters as LevelProgressionParameters } from "./base.js";
