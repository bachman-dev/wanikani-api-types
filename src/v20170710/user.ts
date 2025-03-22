import * as v from "valibot";
import { BaseResource, DatableString, Integer, Level } from "./base.js";

/**
 * The minimum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.
 *
 * @category User
 */
export const MIN_LESSON_BATCH_SIZE = 3;

/**
 * The maximum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.
 *
 * @category User
 */
export const MAX_LESSON_BATCH_SIZE = 10;

/**
 * A number representing a valid lesson batch size in WaniKani, from `3` to `10`.
 *
 * @category User
 */
export type LessonBatchSizeNumber = number & {};
export const LessonBatchSizeNumber = v.pipe(
  Integer,
  v.minValue(MIN_LESSON_BATCH_SIZE),
  v.maxValue(MAX_LESSON_BATCH_SIZE),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category User
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isLessonBatchSizeNumber(value: unknown): value is LessonBatchSizeNumber {
  return v.is(LessonBatchSizeNumber, value);
}

/**
 * User settings specific to the WaniKani application.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category User
 */
export interface UserPreferences {
  /**
   * @deprecated This is a deprecated user preference. It will always return `1` and cannot be set. It exists only to
   * ensure existing consumers of this API don't break.
   */
  default_voice_actor_id: number;

  /**
   * Automatically play pronunciation audio for vocabulary during extra study.
   */
  extra_study_autoplay_audio: boolean;

  /**
   * Automatically play pronunciation audio for vocabulary during lessons.
   */
  lessons_autoplay_audio: boolean;

  /**
   * Number of subjects introduced to the user during lessons before quizzing.
   */
  lessons_batch_size: LessonBatchSizeNumber;

  /**
   * @deprecated This is a deprecated user preference. It always returns `ascending_level_then_subject`. Setting this
   * preference will do nothing. It exists only to ensure existing consumers of this API don't break.
   */
  lessons_presentation_order: "ascending_level_then_shuffled" | "ascending_level_then_subject" | "shuffled";

  /**
   * Automatically play pronunciation audio for vocabulary during reviews.
   */
  reviews_autoplay_audio: boolean;

  /**
   * Toggle for display SRS change indicator after a subject has been completely answered during review.
   */
  reviews_display_srs_indicator: boolean;

  /**
   * The order in which reviews are presented. The options are `lower_levels_first` and `shuffled`.
   */
  reviews_presentation_order: "lower_levels_first" | "shuffled";
}
export const UserPreferences = v.object({
  default_voice_actor_id: Integer,
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
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category Resources
 * @category User
 */
export interface User extends BaseResource {
  /**
   * Data for the returned user.
   */
  data: {
    /**
     * If the user is on vacation, this will be the timestamp of when that vacation started. If the user is not on
     * vacation, this is `null`.
     */
    current_vacation_started_at: DatableString | null;

    /**
     * A user's unique ID string.
     */
    id: string;

    /**
     * The current level of the user. This ignores subscription status.
     */
    level: Level;

    /**
     * User settings specific to the WaniKani application.
     */
    preferences: UserPreferences;

    /**
     * The URL to the user's public facing profile page.
     */
    profile_url: string;

    /**
     * The signup date for the user.
     */
    started_at: DatableString;

    /**
     * Details about the user's subscription state.
     */
    subscription: {
      /**
       * Whether or not the user currently has a paid subscription.
       */
      active: boolean;

      /**
       * The maximum level of content accessible to the user for lessons, reviews, and content review. For unsubscribed/free
       * users, the maximum level is `3`. For subscribed users, this is `60`.
       *
       * **Any application that uses data from the WaniKani API must respect these access limits.**
       */
      max_level_granted: Level;

      /**
       * The date when the user's subscription period ends. If the user has subscription type `lifetime` or `free` then the
       * value is `null`.
       */
      period_ends_at: DatableString | null;

      /**
       * The type of subscription the user has. Options are following: `free`, `recurring`, and `lifetime`. A type of
       * `unknown` means the user subscription state isn't exactly known. This is a weird state on WaniKani, should be
       * treated as `free`, and reported to the WaniKani developers.
       */
      type: "free" | "lifetime" | "recurring" | "unknown";
    };

    /**
     * The user's username.
     */
    username: string;
  };

  /**
   * The kind of object returned.
   */
  object: "user";
}
export const User = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        current_vacation_started_at: v.union([DatableString, v.null()]),
        id: v.string(),
        level: Level,
        preferences: UserPreferences,
        profile_url: v.string(),
        started_at: DatableString,
        subscription: v.object({
          active: v.boolean(),
          max_level_granted: Level,
          period_ends_at: v.union([DatableString, v.null()]),
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
 */
// @__NO_SIDE_EFFECTS__
export function isUser(value: unknown): value is User {
  return v.is(User, value);
}

/**
 * The payload sent to the WaniKani API to update a user's preferences.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#update-user-information}
 * @category Payloads
 * @category User
 */
export interface UserPreferencesPayload {
  /**
   * The user object, as part of the payload.
   */
  user: {
    /**
     * The user preferences to be updated; only those specified in the object will be updated.
     */
    preferences: Partial<UserPreferences>;
  };
}
export const UserPreferencesPayload = v.object({
  user: v.object({
    preferences: v.partial(UserPreferences),
  }),
});
