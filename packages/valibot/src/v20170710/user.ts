import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";
import { MAX_LESSON_BATCH_SIZE, MIN_LESSON_BATCH_SIZE } from "@bachman-dev/wanikani-api-types/v20170710";

import { BaseResource, DatableString, Level, SafeInteger } from "./base.js";

export { MIN_LESSON_BATCH_SIZE, MAX_LESSON_BATCH_SIZE } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * A number representing a valid lesson batch size in WaniKani, from `3` to `10`.
 *
 * @category User
 */
export type LessonBatchSizeNumber = Types.LessonBatchSizeNumber;
export const LessonBatchSizeNumber = v.pipe(
  SafeInteger,
  v.minValue(MIN_LESSON_BATCH_SIZE),
  v.maxValue(MAX_LESSON_BATCH_SIZE),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category User
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isLessonBatchSizeNumber(value: unknown): value is LessonBatchSizeNumber {
  return v.is(LessonBatchSizeNumber, value);
}

/**
 * User settings specific to the WaniKani application.
 *
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 */
export type UserPreferences = Types.UserPreferences;
export const UserPreferences = v.object({
  default_voice_actor_id: SafeInteger,
  extra_study_autoplay_audio: v.boolean(),
  lessons_autoplay_audio: v.boolean(),
  lessons_batch_size: LessonBatchSizeNumber,
  lessons_presentation_order: v.picklist(["ascending_level_then_shuffled", "ascending_level_then_subject", "shuffled"]),
  reviews_autoplay_audio: v.boolean(),
  reviews_display_srs_indicator: v.boolean(),
  reviews_presentation_order: v.picklist(["lower_levels_first", "shuffled"]),
});

/**
 * A user and their status/information on WaniKani.
 *
 * @category Resources
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 */
export type User = Types.User;
export const User = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        current_vacation_started_at: v.nullable(DatableString),
        id: v.string(),
        level: Level,
        preferences: UserPreferences,
        profile_url: v.string(),
        started_at: DatableString,
        subscription: v.object({
          active: v.boolean(),
          max_level_granted: Level,
          period_ends_at: v.nullable(DatableString),
          type: v.picklist(["free", "lifetime", "recurring", "unknown"]),
        }),
        username: v.string(),
      }),
      object: v.literal("user"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category User
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isUser(value: unknown): value is User {
  return v.is(User, value);
}

/**
 * The payload sent to the WaniKani API to update a user's preferences.
 *
 * @category Payloads
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#update-user-information}
 */
export type UserPreferencesPayload = Types.UserPreferencesPayload;
export const UserPreferencesPayload = v.object({
  user: v.object({
    // N.b. v.partial() wraps entries with v.optional(), which would allow properties to be explicitly `undefined`
    preferences: v.object({
      default_voice_actor_id: v.exactOptional(UserPreferences.entries.default_voice_actor_id),
      extra_study_autoplay_audio: v.exactOptional(UserPreferences.entries.extra_study_autoplay_audio),
      lessons_autoplay_audio: v.exactOptional(UserPreferences.entries.lessons_autoplay_audio),
      lessons_batch_size: v.exactOptional(UserPreferences.entries.lessons_batch_size),
      lessons_presentation_order: v.exactOptional(UserPreferences.entries.lessons_presentation_order),
      reviews_autoplay_audio: v.exactOptional(UserPreferences.entries.reviews_autoplay_audio),
      reviews_display_srs_indicator: v.exactOptional(UserPreferences.entries.reviews_display_srs_indicator),
      reviews_presentation_order: v.exactOptional(UserPreferences.entries.reviews_presentation_order),
    }),
  }),
});
