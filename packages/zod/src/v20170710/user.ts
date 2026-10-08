import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";
import { MAX_LESSON_BATCH_SIZE, MIN_LESSON_BATCH_SIZE } from "@bachman-dev/wanikani-api-types/v20170710";

import { BaseResource, DatableString, Level, SafeInteger } from "./base.js";

export { MIN_LESSON_BATCH_SIZE, MAX_LESSON_BATCH_SIZE } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * A number representing a valid lesson batch size in WaniKani, from `3` to `10`.
 *
 * @category User
 */
export type LessonBatchSizeNumber = Types.LessonBatchSizeNumber;
export const LessonBatchSizeNumber = SafeInteger.check(
  z.minimum(MIN_LESSON_BATCH_SIZE),
  z.maximum(MAX_LESSON_BATCH_SIZE),
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
  return z.validate(LessonBatchSizeNumber, value);
}

/**
 * User settings specific to the WaniKani application.
 *
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 */
export type UserPreferences = Types.UserPreferences;
export const UserPreferences = z.toZod<Types.UserPreferences>()(
  z.object({
    default_voice_actor_id: SafeInteger,
    extra_study_autoplay_audio: z.boolean(),
    lessons_autoplay_audio: z.boolean(),
    lessons_batch_size: LessonBatchSizeNumber,
    lessons_presentation_order: z.enum(["ascending_level_then_shuffled", "ascending_level_then_subject", "shuffled"]),
    reviews_autoplay_audio: z.boolean(),
    reviews_display_srs_indicator: z.boolean(),
    reviews_presentation_order: z.enum(["lower_levels_first", "shuffled"]),
  }),
);

/**
 * A user and their status/information on WaniKani.
 *
 * @category Resources
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 */
export type User = Types.User;
export const User = z.toZod<Types.User>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      current_vacation_started_at: z.nullable(DatableString),
      id: z.string(),
      level: Level,
      preferences: UserPreferences,
      profile_url: z.string(),
      started_at: DatableString,
      subscription: z.object({
        active: z.boolean(),
        max_level_granted: Level,
        period_ends_at: z.nullable(DatableString),
        type: z.enum(["free", "lifetime", "recurring", "unknown"]),
      }),
      username: z.string(),
    }),
    object: z.literal("user"),
  }),
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
  return z.validate(User, value);
}

/**
 * The payload sent to the WaniKani API to update a user's preferences.
 *
 * @category Payloads
 * @category User
 * @see {@link https://docs.api.wanikani.com/20170710/#update-user-information}
 */
export type UserPreferencesPayload = Types.UserPreferencesPayload;
export const UserPreferencesPayload = z.toZod<Types.UserPreferencesPayload>()(
  z.object({
    user: z.object({
      preferences: z.object({
        default_voice_actor_id: z.exactOptional(UserPreferences.shape.default_voice_actor_id),
        extra_study_autoplay_audio: z.exactOptional(UserPreferences.shape.extra_study_autoplay_audio),
        lessons_autoplay_audio: z.exactOptional(UserPreferences.shape.lessons_autoplay_audio),
        lessons_batch_size: z.exactOptional(UserPreferences.shape.lessons_batch_size),
        lessons_presentation_order: z.exactOptional(UserPreferences.shape.lessons_presentation_order),
        reviews_autoplay_audio: z.exactOptional(UserPreferences.shape.reviews_autoplay_audio),
        reviews_display_srs_indicator: z.exactOptional(UserPreferences.shape.reviews_display_srs_indicator),
        reviews_presentation_order: z.exactOptional(UserPreferences.shape.reviews_presentation_order),
      }),
    }),
  }),
);
