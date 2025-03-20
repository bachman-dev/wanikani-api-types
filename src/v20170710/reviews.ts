import * as m from "./lang/index.js";
import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString } from "./base.js";
import { Assignment } from "./assignments.js";
import { ReviewStatistic } from "./review-statistics.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";

/**
 * Reviews log all the correct and incorrect answers provided through the 'Reviews' section of WaniKani. Review records
 * are created when a user answers all the parts of a subject correctly once; some subjects have both meaning or reading
 * parts, and some only have one or the other. Note that reviews are not created for the quizzes in lessons.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
 * @category Resources
 * @category Reviews
 */
export interface Review extends BaseResource {
  /**
   * Data for the returned review.
   */
  data: {
    /**
     * Unique identifier of the associated assignment.
     */
    assignment_id: number;

    /**
     * Timestamp when the review was created.
     */
    created_at: DatableString;

    /**
     * The SRS stage interval calculated from the number of correct and incorrect answers, with valid values ranging
     * from `1` to `9`.
     */
    ending_srs_stage: SpacedRepetitionSystemStageNumber;

    /**
     * The number of times the user has answered the meaning incorrectly.
     */
    incorrect_meaning_answers: number;

    /**
     * The number of times the user has answered the reading incorrectly.
     */
    incorrect_reading_answers: number;

    /**
     * Unique identifier of the associated `spaced_repetition_system`.
     */
    spaced_repetition_system_id: number;

    /**
     * The starting SRS stage interval, with valid values ranging from `1` to `8`.
     */
    starting_srs_stage: SpacedRepetitionSystemStageNumber;

    /**
     * Unique identifier of the associated subject.
     */
    subject_id: number;
  };

  /**
   * A unique number identifying the review.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "review";
}
export const Review = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        assignment_id: v.number(),
        created_at: DatableString,
        ending_srs_stage: SpacedRepetitionSystemStageNumber,
        incorrect_meaning_answers: v.number(),
        incorrect_reading_answers: v.number(),
        spaced_repetition_system_id: v.number(),
        starting_srs_stage: SpacedRepetitionSystemStageNumber,
        subject_id: v.number(),
      }),
      id: v.number(),
      object: v.literal("review"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isReview(value: unknown): value is Review {
  return v.is(Review, value);
}

/**
 * A collection of reviews returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @category Collections
 * @category Reviews
 */
export interface ReviewCollection extends BaseCollection {
  /**
   * An array of returned reviews.
   */
  data: Review[];
}
export const ReviewCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Review),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isReviewCollection(value: unknown): value is ReviewCollection {
  return v.is(ReviewCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Reviews
 */
export interface ReviewParameters extends CollectionParameters {
  /**
   * Only reviews where `data.assignment_id` matches one of the array values are returned.
   */
  assignment_ids?: number[];

  /**
   * Only reviews where `data.subject_id` matches one of the array values are returned.
   */
  subject_ids?: number[];
}
export const ReviewParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      assignment_ids: v.optional(v.array(v.number())),
      subject_ids: v.optional(v.array(v.number())),
    }),
  ]),
);

/**
 * The payload used in the request to create a new review via the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Payloads
 * @category Reviews
 */
export interface ReviewPayload {
  /**
   * A review object with either the `assignment_id` or `subject_id` specified.
   */
  review: {
    /**
     * Must be zero or a positive number. This is the number of times the meaning was answered incorrectly.
     */
    incorrect_meaning_answers: number;

    /**
     * Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that
     * subjects with a type of `radical` do not quiz on readings. Thus, set this value to `0`.
     */
    incorrect_reading_answers: number;

    /**
     * Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body.
     * Must be in the past, but after `assignment.available_at`.
     */
    created_at?: DatableString | Date;
  } & (
    | {
        /**
         * Unique identifier of the assignment. This or `subject_id` must be set.
         */
        assignment_id: number;

        /**
         * The `subject_id` should not be set at the same time as `assignment_id`.
         */
        subject_id?: never;
      }
    | {
        /**
         * Unique identifier of the subject. This or `assignment_id` must be set.
         */
        subject_id: number;

        /**
         * The `assignment_id` should never be set at the same time as `subject_id`.
         */
        assignment_id?: never;
      }
  );
}
export const ReviewPayload = v.object({
  review: v.intersect([
    v.object({
      incorrect_meaning_answers: v.number(),
      incorrect_reading_answers: v.number(),
      created_at: v.optional(v.union([DatableString, v.date()], m.dateUnion)),
    }),
    v.union([
      v.object({
        assignment_id: v.number(),
        subject_id: v.optional(v.never()),
      }),
      v.object({
        subject_id: v.number(),
        assignment_id: v.optional(v.never()),
      }),
    ]),
  ]),
});

/**
 * A created review returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Resources
 * @category Reviews
 */
export interface CreatedReview extends Review {
  /**
   * The resources updated alongside creating the review.
   */
  resources_updated: {
    /**
     * The updated assignment upon creating the review.
     * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
     */
    assignment: Assignment;

    /**
     * The updated review statistic upon creating the review.
     * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
     */
    review_statistic: ReviewStatistic;
  };
}
export const CreatedReview = v.object(
  v.entriesFromObjects([
    Review,
    v.object({
      resources_updated: v.object({
        assignment: Assignment,
        review_statistic: ReviewStatistic,
      }),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isCreatedReview(value: unknown): value is CreatedReview {
  return v.is(CreatedReview, value);
}
