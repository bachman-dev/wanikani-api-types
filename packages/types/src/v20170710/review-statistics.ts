import type { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import type { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Review statistics summarize the activity recorded in reviews. They contain sum the number of correct and incorrect
 * answers for both meaning and reading. They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on the related subject.
 *
 * @category Resources
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
 */
export interface ReviewStatistic extends BaseResource {
  /** Data for the returned review statistic. */
  data: {
    /** Timestamp when the review statistic was created. */
    created_at: DatableString;

    /** Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews. */
    hidden: boolean;

    /** Total number of correct answers submitted for the meaning of the associated subject. */
    meaning_correct: SafeInteger;

    /** The current, uninterrupted series of correct answers given for the meaning of the associated subject. */
    meaning_current_streak: SafeInteger;

    /** Total number of incorrect answers submitted for the meaning of the associated subject. */
    meaning_incorrect: SafeInteger;

    /** The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject. */
    meaning_max_streak: SafeInteger;

    /** The overall correct answer rate by the user for the subject, including both meaning and reading. */
    percentage_correct: number;

    /** Total number of correct answers submitted for the reading of the associated subject. */
    reading_correct: SafeInteger;

    /** The current, uninterrupted series of correct answers given for the reading of the associated subject. */
    reading_current_streak: SafeInteger;

    /** Total number of incorrect answers submitted for the reading of the associated subject. */
    reading_incorrect: SafeInteger;

    /** The longest, uninterrupted series of correct answers ever given for the reading of the associated subject. */
    reading_max_streak: SafeInteger;

    /** Unique identifier of the associated subject. */
    subject_id: SafeInteger;

    /** The type of the associated subject. */
    subject_type: SubjectType;
  };

  /** A unique number identifying the review statistic. */
  id: SafeInteger;

  /** The kind of object returned. */
  object: "review_statistic";
}

/**
 * A collection of review statistics returned from the WaniKani API.
 *
 * @category Collections
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 */
export interface ReviewStatisticCollection extends BaseCollection {
  /** An array of returned review statistics. */
  data: ReviewStatistic[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Statistic Collection.
 *
 * @category Parameters
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface ReviewStatisticParameters extends CollectionParameters {
  /** Return review statistics with a matching value in the `hidden` attribute. */
  hidden?: boolean;

  /** Return review statistics where the `percentage_correct` is greater than the value. */
  percentages_greater_than?: number;

  /** Return review statistics where the `percentage_correct` is less than the value. */
  percentages_less_than?: number;

  /** Only review statistics where `data.subject_id` matches one of the array values are returned. */
  subject_ids?: SafeInteger[];

  /** Only review statistics where `data.subject_type` matches one of the array values are returned. */
  subject_types?: SubjectTuple;
}
