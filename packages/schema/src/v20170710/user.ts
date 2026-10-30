import {
  boolean,
  constant,
  define,
  defineModule,
  literal,
  nullable,
  number,
  object,
  partial,
  picklist,
  property,
  string,
} from "../core/index.js";
import { BaseResource, DatableString, Level, SafeInteger } from "./base.js";

const see = ["https://docs.api.wanikani.com/20170710/#user"];

export const MIN_LESSON_BATCH_SIZE = constant(
  "MIN_LESSON_BATCH_SIZE",
  // oxlint-disable-next-line no-magic-numbers -- This names the number
  3,
  "The minimum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.",
);

export const MAX_LESSON_BATCH_SIZE = constant(
  "MAX_LESSON_BATCH_SIZE",
  // oxlint-disable-next-line no-magic-numbers -- This names the number
  10,
  "The maximum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.",
);

export const LessonBatchSizeNumber = define(
  "LessonBatchSizeNumber",
  number({ base: SafeInteger, min: MIN_LESSON_BATCH_SIZE, max: MAX_LESSON_BATCH_SIZE }),
  "A number representing a valid lesson batch size in WaniKani, from `3` to `10`.",
  { typeGuard: true },
);

export const UserPreferences = define(
  "UserPreferences",
  object({
    default_voice_actor_id: property(SafeInteger, {
      deprecated:
        "This is a deprecated user preference. It will always return `1` and cannot be set. It exists only to ensure existing consumers of this API don't break.",
    }),
    extra_study_autoplay_audio: property(
      boolean(),
      "Automatically play pronunciation audio for vocabulary during extra study.",
    ),
    lessons_autoplay_audio: property(
      boolean(),
      "Automatically play pronunciation audio for vocabulary during lessons.",
    ),
    lessons_batch_size: property(
      LessonBatchSizeNumber,
      "Number of subjects introduced to the user during lessons before quizzing.",
    ),
    lessons_presentation_order: property(
      picklist(["ascending_level_then_shuffled", "ascending_level_then_subject", "shuffled"]),
      {
        deprecated:
          "This is a deprecated user preference. It always returns `ascending_level_then_subject`. Setting this preference will do nothing. It exists only to ensure existing consumers of this API don't break.",
      },
    ),
    reviews_autoplay_audio: property(
      boolean(),
      "Automatically play pronunciation audio for vocabulary during reviews.",
    ),
    reviews_display_srs_indicator: property(
      boolean(),
      "Toggle for display SRS change indicator after a subject has been completely answered during review.",
    ),
    reviews_presentation_order: property(
      picklist(["lower_levels_first", "shuffled"]),
      "The order in which reviews are presented. The options are `lower_levels_first` and `shuffled`.",
    ),
  }),
  { description: "User settings specific to the WaniKani application.", see },
);

export const User = define(
  "User",
  object(
    {
      data: property(
        object({
          current_vacation_started_at: property(
            nullable(DatableString),
            "If the user is on vacation, this will be the timestamp of when that vacation started. If the user is not on vacation, this is `null`.",
          ),
          id: property(string(), "A user's unique ID string."),
          level: property(Level, "The current level of the user. This ignores subscription status."),
          preferences: property(UserPreferences, "User settings specific to the WaniKani application."),
          profile_url: property(string(), "The URL to the user's public facing profile page."),
          started_at: property(DatableString, "The signup date for the user."),
          subscription: property(
            object({
              active: property(boolean(), "Whether or not the user currently has a paid subscription."),
              max_level_granted: property(Level, [
                "The maximum level of content accessible to the user for lessons, reviews, and content review. For unsubscribed/free users, the maximum level is `3`. For subscribed users, this is `60`.",
                "**Any application that uses data from the WaniKani API must respect these access limits.**",
              ]),
              period_ends_at: property(
                nullable(DatableString),
                "The date when the user's subscription period ends. If the user has subscription type `lifetime` or `free` then the value is `null`.",
              ),
              type: property(
                picklist(["free", "lifetime", "recurring", "unknown"]),
                "The type of subscription the user has. Options are following: `free`, `recurring`, and `lifetime`. A type of `unknown` means the user subscription state isn't exactly known. This is a weird state on WaniKani, should be treated as `free`, and reported to the WaniKani developers.",
              ),
            }),
            "Details about the user's subscription state.",
          ),
          username: property(string(), "The user's username."),
        }),
        "Data for the returned user.",
      ),
      object: property(literal("user"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  { description: "A user and their status/information on WaniKani.", see },
  { typeGuard: true },
);

export const UserPreferencesPayload = define(
  "UserPreferencesPayload",
  object({
    user: property(
      object({
        preferences: property(
          partial(UserPreferences),
          "The user preferences to be updated; only those specified in the object will be updated.",
        ),
      }),
      "The user object, as part of the payload.",
    ),
  }),
  {
    description: "The payload sent to the WaniKani API to update a user's preferences.",

    see: ["https://docs.api.wanikani.com/20170710/#update-user-information"],
  },
);

export default defineModule("user", [
  MIN_LESSON_BATCH_SIZE,
  MAX_LESSON_BATCH_SIZE,
  LessonBatchSizeNumber,
  UserPreferences,
  User,
  UserPreferencesPayload,
]);
