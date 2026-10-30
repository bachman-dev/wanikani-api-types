import { array, define, defineModule, nullable, object, property } from "../core/index.js";
import { BaseReport, DatableString, SafeInteger } from "./base.js";

const see = ["https://docs.api.wanikani.com/20170710/#summary"];

export const SummaryInterval = define(
  "SummaryInterval",
  object({
    available_at: property(
      DatableString,
      "When the paired `subject_ids` are available for lessons. Always beginning of the current hour when the API endpoint is accessed.",
    ),
    subject_ids: property(array(SafeInteger), "Collection of unique identifiers for subjects."),
  }),
  { description: "Details about subjects listed as available for lessons in the Summary report.", see },
);

export const Summary = define(
  "Summary",
  object(
    {
      data: property(
        object({
          lessons: property(array(SummaryInterval), "Details about subjects available for lessons."),
          next_reviews_at: property(
            nullable(DatableString),
            "Earliest date when the reviews are available. Is `null` when the user has no reviews scheduled.",
          ),
          reviews: property(
            array(SummaryInterval),
            "Details about subjects available for reviews now and in the next 24 hours by the hour (total of 25 objects).",
          ),
        }),
        "Data for the Summary report.",
      ),
    },
    { extends: [BaseReport] },
  ),
  {
    description:
      "The summary report contains currently available lessons and reviews and the reviews that will become available in the next 24 hours, grouped by the hour.",
    see,
  },
  { typeGuard: true },
);

export default defineModule("summary", [SummaryInterval, Summary]);
