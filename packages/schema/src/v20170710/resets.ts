import { alias, array, define, defineModule, literal, nullable, object, property } from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-resets"];

export const Reset = define(
  "Reset",
  object(
    {
      data: property(
        object({
          confirmed_at: property(nullable(DatableString), "Timestamp when the user confirmed the reset."),
          created_at: property(DatableString, "Timestamp when the reset was created."),
          original_level: property(Level, "The user's level before the reset, from `1` to `60`."),
          target_level: property(
            Level,
            "The user's level after the reset, from `1` to `60`. It must be less than or equal to `original_level`.",
          ),
        }),
        "Data for the returned reset.",
      ),
      id: property(SafeInteger, "A unique number identifying the reset."),
      object: property(literal("reset"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description: [
      "Users can reset their progress back to any level at or below their current level. When they reset to a particular level, all of the assignments and review_statistics at that level or higher are set back to their default state.",
      "Resets contain information about when those resets happen, the starting level, and the target level.",
    ],

    see: ["https://docs.api.wanikani.com/20170710/#resets"],
  },
  { typeGuard: true },
);

export const ResetCollection = define(
  "ResetCollection",
  object({ data: property(array(Reset), "An array of returned resets.") }, { extends: [BaseCollection] }),
  {
    description: "A collection of resets returned from the WaniKani API.",

    see: collectionSee,
  },
  { typeGuard: true },
);

export const ResetParameters = alias("ResetParameters", CollectionParameters, {
  description: "Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection.",

  see: collectionSee,
});

export default defineModule("resets", [Reset, ResetCollection, ResetParameters]);
