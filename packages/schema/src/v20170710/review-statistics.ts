import {
  array,
  boolean,
  define,
  defineModule,
  literal,
  number,
  object,
  optionalProperty,
  property,
} from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-review-statistics"];

export const ReviewStatistic = define(
  "ReviewStatistic",
  object(
    {
      data: property(
        object({
          created_at: property(DatableString, "Timestamp when the review statistic was created."),
          hidden: property(
            boolean(),
            "Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.",
          ),
          meaning_correct: property(
            SafeInteger,
            "Total number of correct answers submitted for the meaning of the associated subject.",
          ),
          meaning_current_streak: property(
            SafeInteger,
            "The current, uninterrupted series of correct answers given for the meaning of the associated subject.",
          ),
          meaning_incorrect: property(
            SafeInteger,
            "Total number of incorrect answers submitted for the meaning of the associated subject.",
          ),
          meaning_max_streak: property(
            SafeInteger,
            "The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject.",
          ),
          percentage_correct: property(
            number(),
            "The overall correct answer rate by the user for the subject, including both meaning and reading.",
          ),
          reading_correct: property(
            SafeInteger,
            "Total number of correct answers submitted for the reading of the associated subject.",
          ),
          reading_current_streak: property(
            SafeInteger,
            "The current, uninterrupted series of correct answers given for the reading of the associated subject.",
          ),
          reading_incorrect: property(
            SafeInteger,
            "Total number of incorrect answers submitted for the reading of the associated subject.",
          ),
          reading_max_streak: property(
            SafeInteger,
            "The longest, uninterrupted series of correct answers ever given for the reading of the associated subject.",
          ),
          subject_id: property(SafeInteger, "Unique identifier of the associated subject."),
          subject_type: property(SubjectType, "The type of the associated subject."),
        }),
        "Data for the returned review statistic.",
      ),
      id: property(SafeInteger, "A unique number identifying the review statistic."),
      object: property(literal("review_statistic"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description: [
      "Review statistics summarize the activity recorded in reviews. They contain sum the number of correct and incorrect answers for both meaning and reading. They track current and maximum streaks of correct answers. They store the overall percentage of correct answers versus total answers.",
      "A review statistic is created when the user has done their first review on the related subject.",
    ],
    categories: ["Resources"],
    see: ["https://docs.api.wanikani.com/20170710/#review-statistics"],
  },
  { typeGuard: true },
);

export const ReviewStatisticCollection = define(
  "ReviewStatisticCollection",
  object(
    { data: property(array(ReviewStatistic), "An array of returned review statistics.") },
    { extends: [BaseCollection] },
  ),
  {
    description: "A collection of review statistics returned from the WaniKani API.",
    categories: ["Collections"],
    see: collectionSee,
  },
  { typeGuard: true },
);

export const ReviewStatisticParameters = define(
  "ReviewStatisticParameters",
  object(
    {
      hidden: optionalProperty(boolean(), "Return review statistics with a matching value in the `hidden` attribute."),
      percentages_greater_than: optionalProperty(
        number(),
        "Return review statistics where the `percentage_correct` is greater than the value.",
      ),
      percentages_less_than: optionalProperty(
        number(),
        "Return review statistics where the `percentage_correct` is less than the value.",
      ),
      subject_ids: optionalProperty(
        array(SafeInteger),
        "Only review statistics where `data.subject_id` matches one of the array values are returned.",
      ),
      subject_types: optionalProperty(
        SubjectTuple,
        "Only review statistics where `data.subject_type` matches one of the array values are returned.",
      ),
    },
    { extends: [CollectionParameters] },
  ),
  {
    description:
      "Parameters that can be passed to the WaniKani API to filter a request for a Review Statistic Collection.",
    categories: ["Parameters"],
    see: collectionSee,
  },
);

export default defineModule("review-statistics", "Review Statistics", [
  ReviewStatistic,
  ReviewStatisticCollection,
  ReviewStatisticParameters,
]);
