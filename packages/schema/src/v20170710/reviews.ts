import {
  array,
  define,
  defineModule,
  intersect,
  literal,
  never,
  object,
  optionalProperty,
  property,
  union,
} from "../core/index.js";
import { Assignment } from "./assignments.js";
import {
  BaseCollection,
  BaseResource,
  CollectionParameters,
  DatableInput,
  DatableString,
  SafeInteger,
} from "./base.js";
import { ReviewStatistic } from "./review-statistics.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";

const createSee = ["https://docs.api.wanikani.com/20170710/#create-a-review"];

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-reviews"];

export const Review = define(
  "Review",
  object(
    {
      data: property(
        object({
          assignment_id: property(SafeInteger, "Unique identifier of the associated assignment."),
          created_at: property(DatableString, "Timestamp when the review was created."),
          ending_srs_stage: property(
            SpacedRepetitionSystemStageNumber,
            "The SRS stage interval calculated from the number of correct and incorrect answers, with valid values ranging from `1` to `9`.",
          ),
          incorrect_meaning_answers: property(
            SafeInteger,
            "The number of times the user has answered the meaning incorrectly.",
          ),
          incorrect_reading_answers: property(
            SafeInteger,
            "The number of times the user has answered the reading incorrectly.",
          ),
          spaced_repetition_system_id: property(
            SafeInteger,
            "Unique identifier of the associated `spaced_repetition_system`.",
          ),
          starting_srs_stage: property(
            SpacedRepetitionSystemStageNumber,
            "The starting SRS stage interval, with valid values ranging from `1` to `8`.",
          ),
          subject_id: property(SafeInteger, "Unique identifier of the associated subject."),
        }),
        "Data for the returned review.",
      ),
      id: property(SafeInteger, "A unique number identifying the review."),
      object: property(literal("review"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description:
      "Reviews log all the correct and incorrect answers provided through the 'Reviews' section of WaniKani. Review records are created when a user answers all the parts of a subject correctly once; some subjects have both meaning or reading parts, and some only have one or the other. Note that reviews are not created for the quizzes in lessons.",
    see: ["https://docs.api.wanikani.com/20170710/#reviews"],
  },
  { typeGuard: true },
);

export const ReviewCollection = define(
  "ReviewCollection",
  object({ data: property(array(Review), "An array of returned reviews.") }, { extends: [BaseCollection] }),
  {
    description: "A collection of reviews returned from the WaniKani API.",
    see: collectionSee,
  },
  { typeGuard: true },
);

export const ReviewParameters = define(
  "ReviewParameters",
  object(
    {
      assignment_ids: optionalProperty(
        array(SafeInteger),
        "Only reviews where `data.assignment_id` matches one of the array values are returned.",
      ),
      subject_ids: optionalProperty(
        array(SafeInteger),
        "Only reviews where `data.subject_id` matches one of the array values are returned.",
      ),
    },
    { extends: [CollectionParameters] },
  ),
  {
    description: "Parameters that can be passed to the WaniKani API to filter a request for a Review Collection.",
    see: collectionSee,
  },
);

export const ReviewPayload = define(
  "ReviewPayload",
  object({
    review: property(
      intersect(
        [
          object({
            incorrect_meaning_answers: property(
              SafeInteger,
              "Must be zero or a positive number. This is the number of times the meaning was answered incorrectly.",
            ),
            incorrect_reading_answers: property(
              SafeInteger,
              "Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that subjects with a type of `radical` do not quiz on readings. Thus, set this value to `0`.",
            ),
            created_at: optionalProperty(
              DatableInput,
              "Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body. Must be in the past, but after `assignment.available_at`.",
            ),
          }),
          union(
            [
              object({
                assignment_id: property(
                  SafeInteger,
                  "Unique identifier of the assignment. This or `subject_id` must be set.",
                ),
                subject_id: optionalProperty(
                  never(),
                  "The `subject_id` should not be set at the same time as `assignment_id`.",
                ),
              }),
              object({
                subject_id: property(
                  SafeInteger,
                  "Unique identifier of the subject. This or `assignment_id` must be set.",
                ),
                assignment_id: optionalProperty(
                  never(),
                  "The `assignment_id` should never be set at the same time as `subject_id`.",
                ),
              }),
            ],
            { message: "reviewPayloadUnion" },
          ),
        ],
        { message: "reviewPayloadIntersect" },
      ),
      "A review object with either the `assignment_id` or `subject_id` specified.",
    ),
  }),
  {
    description: "The payload used in the request to create a new review via the WaniKani API.",
    see: createSee,
  },
);

export const CreatedReview = define(
  "CreatedReview",
  object(
    {
      resources_updated: property(
        object({
          assignment: property(Assignment, {
            description: "The updated assignment upon creating the review.",
            see: ["https://docs.api.wanikani.com/20170710/#assignments"],
          }),
          review_statistic: property(ReviewStatistic, {
            description: "The updated review statistic upon creating the review.",
            see: ["https://docs.api.wanikani.com/20170710/#review-statistics"],
          }),
        }),
        "The resources updated alongside creating the review.",
      ),
    },
    { extends: [Review] },
  ),
  {
    description: "A created review returned from the WaniKani API.",
    see: createSee,
  },
  { typeGuard: true },
);

export default defineModule("reviews", [Review, ReviewCollection, ReviewParameters, ReviewPayload, CreatedReview]);
