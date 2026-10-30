import { alias, array, define, defineModule, literal, nullable, object, property } from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-level-progressions"];

export const LevelProgression = define(
  "LevelProgression",
  object(
    {
      data: property(
        object({
          abandoned_at: property(
            nullable(DatableString),
            "Timestamp when the user abandons the level. This is primarily used when the user initiates a reset.",
          ),
          completed_at: property(
            nullable(DatableString),
            "Timestamp when the user burns 100% of the assignments belonging to the associated subject's level.",
          ),
          created_at: property(DatableString, "Timestamp when the level progression is created."),
          level: property(Level, "The level of the progression, with possible values from `1` to `60`."),
          passed_at: property(
            nullable(DatableString),
            "Timestamp, in ISO-8601 format, when the user passes at least 90% of the assignments with a type of `kanji` belonging to the associated subject's level.",
          ),
          started_at: property(
            nullable(DatableString),
            "Timestamp when the user starts their first lesson of a subject belonging to the level.",
          ),
          unlocked_at: property(
            nullable(DatableString),
            "Timestamp when the user can access lessons and reviews for the `level`.",
          ),
        }),
        "Data for the returned level progression.",
      ),
      id: property(SafeInteger, "A unique number identifying the level progression."),
      object: property(literal("level_progression"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description: [
      "Level progressions contain information about a user's progress through the WaniKani levels.",
      "A level progression is created when a user has met the prerequisites for leveling up, which are:",
      "- Reach a 90% passing rate on assignments for a user's current level with a `subject_type` of `kanji`. Passed assignments have `data.passed` equal to `true` and a `data.passed_at` that's in the past.",
      "- Have access to the level. Under `/user`, the `data.level` must be less than or equal to `data.subscription.max_level_granted`.",
    ],
    see: ["https://docs.api.wanikani.com/20170710/#level-progressions"],
  },
  { typeGuard: true },
);

export const LevelProgressionCollection = define(
  "LevelProgressionCollection",
  object(
    { data: property(array(LevelProgression), "An array of returned level progressions.") },
    { extends: [BaseCollection] },
  ),
  {
    description: "A collection of level progressions returned from the WaniKani API.",
    see: collectionSee,
  },
  { typeGuard: true },
);

export const LevelProgressionParameters = alias("LevelProgressionParameters", CollectionParameters, {
  description:
    "Parameters that can be passed to the WaniKani API to filter a request for a Level Progression Collection.",
  see: collectionSee,
});

export default defineModule("level-progressions", [
  LevelProgression,
  LevelProgressionCollection,
  LevelProgressionParameters,
]);
