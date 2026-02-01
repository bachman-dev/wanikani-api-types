import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level } from "./base.js";

/**
 * Level progressions contain information about a user's progress through the WaniKani levels.
 *
 * A level progression is created when a user has met the prerequisites for leveling up, which are:
 *
 * * Reach a 90% passing rate on assignments for a user's current level with a `subject_type` of `kanji`. Passed
 * assignments have `data.passed` equal to `true` and a `data.passed_at` that's in the past.
 * * Have access to the level. Under `/user`, the `data.level` must be less than or equal to
 * `data.subscription.max_level_granted`.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#level-progressions}
 * @category Level Progressions
 * @category Resources
 */
export interface LevelProgression extends BaseResource {
  /**
   * Data for the returned level progression.
   */
  data: {
    /**
     * Timestamp when the user abandons the level. This is primarily used when the user initiates a reset.
     */
    abandoned_at: DatableString | null;

    /**
     * Timestamp when the user burns 100% of the assignments belonging to the associated subject's level.
     */
    completed_at: DatableString | null;

    /**
     * Timestamp when the level progression is created.
     */
    created_at: DatableString;

    /**
     * The level of the progression, with possible values from `1` to `60`.
     */
    level: Level;

    /**
     * Timestamp, in ISO-8601 format, when the user passes at least 90% of the assignments with a type of `kanji`
     * belonging to the associated subject's level.
     */
    passed_at: DatableString | null;

    /**
     * Timestamp when the user starts their first lesson of a subject belonging to the level.
     */
    started_at: DatableString | null;

    /**
     * Timestamp when the user can access lessons and reviews for the `level`.
     */
    unlocked_at: DatableString | null;
  };

  /**
   * A unique number identifying the level progression.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "level_progression";
}
export const LevelProgression = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        abandoned_at: v.union([DatableString, v.null()]),
        completed_at: v.union([DatableString, v.null()]),
        created_at: DatableString,
        level: Level,
        passed_at: v.union([DatableString, v.null()]),
        started_at: v.union([DatableString, v.null()]),
        unlocked_at: v.union([DatableString, v.null()]),
      }),
      id: v.number(),
      object: v.literal("level_progression"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Level Progressions
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isLevelProgression(value: unknown): value is LevelProgression {
  return v.is(LevelProgression, value);
}

/**
 * A collection of level progressions returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 * @category Collections
 * @category Level Progressions
 */
export interface LevelProgressionCollection extends BaseCollection {
  /**
   * An array of returned level progressions.
   */
  data: LevelProgression[];
}
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
 */
// @__NO_SIDE_EFFECTS__
export function isLevelProgressionCollection(value: unknown): value is LevelProgressionCollection {
  return v.is(LevelProgressionCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Level Progression Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 * @category Level Progressions
 * @category Parameters
 */
export type LevelProgressionParameters = CollectionParameters;
export const LevelProgressionParameters = CollectionParameters;
