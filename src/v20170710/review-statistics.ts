import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Review statistics summarize the activity recorded in reviews. They contain sum the number of correct and incorrect
 * answers for both meaning and reading. They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on the related subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
 * @category Resources
 * @category Review Statistics
 */
export interface ReviewStatistic extends BaseResource {
  /**
   * Data for the returned review statistic.
   */
  data: {
    /**
     * Timestamp when the review statistic was created.
     */
    created_at: DatableString;

    /**
     * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
     */
    hidden: boolean;

    /**
     * Total number of correct answers submitted for the meaning of the associated subject.
     */
    meaning_correct: number;

    /**
     * The current, uninterrupted series of correct answers given for the meaning of the associated subject.
     */
    meaning_current_streak: number;

    /**
     * Total number of incorrect answers submitted for the meaning of the associated subject.
     */
    meaning_incorrect: number;

    /**
     * The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject.
     */
    meaning_max_streak: number;

    /**
     * The overall correct answer rate by the user for the subject, including both meaning and reading.
     */
    percentage_correct: number;

    /**
     * Total number of correct answers submitted for the reading of the associated subject.
     */
    reading_correct: number;

    /**
     * The current, uninterrupted series of correct answers given for the reading of the associated subject.
     */
    reading_current_streak: number;

    /**
     * Total number of incorrect answers submitted for the reading of the associated subject.
     */
    reading_incorrect: number;

    /**
     * The longest, uninterrupted series of correct answers ever given for the reading of the associated subject.
     */
    reading_max_streak: number;

    /**
     * Unique identifier of the associated subject.
     */
    subject_id: number;

    /**
     * The type of the associated subject.
     */
    subject_type: SubjectType;
  };

  /**
   * A unique number identifying the review statistic.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "review_statistic";
}
export const ReviewStatistic = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        created_at: DatableString,
        hidden: v.boolean(),
        meaning_correct: v.number(),
        meaning_current_streak: v.number(),
        meaning_incorrect: v.number(),
        meaning_max_streak: v.number(),
        percentage_correct: v.number(),
        reading_correct: v.number(),
        reading_current_streak: v.number(),
        reading_incorrect: v.number(),
        reading_max_streak: v.number(),
        subject_id: v.number(),
        subject_type: SubjectType,
      }),
      id: v.number(),
      object: v.literal("review_statistic"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Review Statistics
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isReviewStatistic(value: unknown): value is ReviewStatistic {
  return v.is(ReviewStatistic, value);
}

/**
 * A collection of review statistics returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @category Collections
 * @category Review Statistics
 */
export interface ReviewStatisticCollection extends BaseCollection {
  /**
   * An array of returned review statistics.
   */
  data: ReviewStatistic[];
}
export const ReviewStatisticCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(ReviewStatistic),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Review Statistics
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isReviewStatisticCollection(value: unknown): value is ReviewStatisticCollection {
  return v.is(ReviewStatisticCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Statistic Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Review Statistics
 */
export interface ReviewStatisticParameters extends CollectionParameters {
  /**
   * Return review statistics with a matching value in the `hidden` attribute.
   */
  hidden?: boolean;

  /**
   * Return review statistics where the `percentage_correct` is greater than the value.
   */
  percentages_greater_than?: number;

  /**
   * Return review statistics where the `percentage_correct` is less than the value.
   */
  percentages_less_than?: number;

  /**
   * Only review statistics where `data.subject_id` matches one of the array values are returned.
   */
  subject_ids?: SafeInteger[];

  /**
   * Only review statistics where `data.subject_type` matches one of the array values are returned.
   */
  subject_types?: SubjectTuple;
}
export const ReviewStatisticParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      hidden: v.optional(v.boolean()),
      percentages_greater_than: v.optional(v.number()),
      percentages_less_than: v.optional(v.number()),
      subject_ids: v.optional(v.array(SafeInteger)),
      subject_types: v.optional(SubjectTuple),
    }),
  ]),
);
