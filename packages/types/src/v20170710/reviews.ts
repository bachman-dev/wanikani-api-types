import type { Assignment } from "./assignments.js";
import type { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import type { ReviewStatistic } from "./review-statistics.js";
import type { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";

/**
 * Reviews log all the correct and incorrect answers provided through the 'Reviews' section of WaniKani. Review records
 * are created when a user answers all the parts of a subject correctly once; some subjects have both meaning or reading
 * parts, and some only have one or the other. Note that reviews are not created for the quizzes in lessons.
 *
 * @category Resources
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
 */
export interface Review extends BaseResource {
  /** Data for the returned review. */
  data: {
    /** Unique identifier of the associated assignment. */
    assignment_id: number;

    /** Timestamp when the review was created. */
    created_at: DatableString;

    /**
     * The SRS stage interval calculated from the number of correct and incorrect answers, with valid values ranging
     * from `1` to `9`.
     */
    ending_srs_stage: SpacedRepetitionSystemStageNumber;

    /** The number of times the user has answered the meaning incorrectly. */
    incorrect_meaning_answers: number;

    /** The number of times the user has answered the reading incorrectly. */
    incorrect_reading_answers: number;

    /** Unique identifier of the associated `spaced_repetition_system`. */
    spaced_repetition_system_id: number;

    /** The starting SRS stage interval, with valid values ranging from `1` to `8`. */
    starting_srs_stage: SpacedRepetitionSystemStageNumber;

    /** Unique identifier of the associated subject. */
    subject_id: number;
  };

  /** A unique number identifying the review. */
  id: number;

  /** The kind of object returned. */
  object: "review";
}

/**
 * A collection of reviews returned from the WaniKani API.
 *
 * @category Collections
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 */
export interface ReviewCollection extends BaseCollection {
  /** An array of returned reviews. */
  data: Review[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Collection.
 *
 * @category Parameters
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface ReviewParameters extends CollectionParameters {
  /** Only reviews where `data.assignment_id` matches one of the array values are returned. */
  assignment_ids?: SafeInteger[];

  /** Only reviews where `data.subject_id` matches one of the array values are returned. */
  subject_ids?: SafeInteger[];
}

/**
 * The payload used in the request to create a new review via the WaniKani API.
 *
 * @category Payloads
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export interface ReviewPayload {
  /** A review object with either the `assignment_id` or `subject_id` specified. */
  review: {
    /** Must be zero or a positive number. This is the number of times the meaning was answered incorrectly. */
    incorrect_meaning_answers: SafeInteger;

    /**
     * Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that
     * subjects with a type of `radical` do not quiz on readings. Thus, set this value to `0`.
     */
    incorrect_reading_answers: SafeInteger;

    /**
     * Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body.
     * Must be in the past, but after `assignment.available_at`.
     */
    created_at?: DatableString | Date;
  } & (
    | {
        /** Unique identifier of the assignment. This or `subject_id` must be set. */
        assignment_id: SafeInteger;

        /** The `subject_id` should not be set at the same time as `assignment_id`. */
        subject_id?: never;
      }
    | {
        /** Unique identifier of the subject. This or `assignment_id` must be set. */
        subject_id: SafeInteger;

        /** The `assignment_id` should never be set at the same time as `subject_id`. */
        assignment_id?: never;
      }
  );
}

/**
 * A created review returned from the WaniKani API.
 *
 * @category Resources
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export interface CreatedReview extends Review {
  /** The resources updated alongside creating the review. */
  resources_updated: {
    /**
     * The updated assignment upon creating the review.
     *
     * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
     */
    assignment: Assignment;

    /**
     * The updated review statistic upon creating the review.
     *
     * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
     */
    review_statistic: ReviewStatistic;
  };
}
