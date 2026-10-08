import type { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";
import type { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";
import type { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Assignments contain information about a user's progress on a particular subject, including their current state and
 * timestamps for various progress milestones. Assignments are created when a user has passed all the components of the
 * given subject and the assignment is at or below their current level for the first time.
 *
 * @category Assignments
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
 */
export interface Assignment extends BaseResource {
  /** Data for the returned assignment. */
  data: {
    /** When the related subject will be available in the user's review queue. */
    available_at: DatableString | null;

    /** When the user reaches SRS stage 9 the first time. */
    burned_at: DatableString | null;

    /** When the assignment was created. */
    created_at: DatableString;

    /** Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews. */
    hidden: boolean;

    /** When the user reaches SRS stage `5` for the first time. */
    passed_at: DatableString | null;

    /** When the subject is resurrected and placed back in the user's review queue. */
    resurrected_at: DatableString | null;

    /**
     * The current SRS stage interval. The interval range is determined by the related subject's Spaced Repetition
     * System.
     */
    srs_stage: SpacedRepetitionSystemStageNumber;

    /** When the user completes the lesson for the related subject. */
    started_at: DatableString | null;

    /** Unique identifier of the associated subject. */
    subject_id: SafeInteger;

    /** The type of the associated subject. */
    subject_type: SubjectType;

    /**
     * When the related subjects has its prerequisites satisfied and is made available in lessons.
     *
     * Prerequisites are:
     *
     * - The subject components have reached SRS stage 5 once (they have been “passed”).
     * - The user's level is equal to or greater than the level of the assignment’s subject.
     */
    unlocked_at: DatableString | null;
  };

  /** A unique number identifying the assignment. */
  id: SafeInteger;

  /** The kind of object returned. */
  object: "assignment";
}

/**
 * A collection of assignments returned from the WaniKani API.
 *
 * @category Assignments
 * @category Collections
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 */
export interface AssignmentCollection extends BaseCollection {
  /** An array of returned assignments. */
  data: Assignment[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for an Assignment Collection.
 *
 * @category Assignments
 * @category Parameters
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface AssignmentParameters extends CollectionParameters {
  /** Only assignments available at or after this time are returned. */
  available_after?: DatableString | Date;

  /** Only assignments available at or before this time are returned. */
  available_before?: DatableString | Date;

  /**
   * When set to `true`, returns assignments that have a value in `data.burned_at`. Returns assignments with a `null`
   * `data.burned_at` if `false`.
   */
  burned?: boolean;

  /** Return assignments with a matching value in the `hidden` attribute. */
  hidden?: boolean;

  /** When set to `true`, returns assignments which are immediately available for lessons. */
  immediately_available_for_lessons?: boolean;

  /** When set to `true`, returns assignments which are immediately available for review. */
  immediately_available_for_review?: boolean;

  /** When set to `true`, returns assignments which are in the review state. */
  in_review?: boolean;

  /**
   * Only assignments where the associated subject level matches one of the array values are returned. Valid values
   * range from `1` to `60`.
   */
  levels?: Level[];

  /**
   * Only assignments where `data.srs_stage` matches one of the array values are returned. Valid values range from `0`
   * to `9`.
   */
  srs_stages?: SpacedRepetitionSystemStageNumber[];

  /**
   * When set to `true`, returns assignments that have a value in `data.started_at`. Returns assignments with a `null`
   * `data.started_at` if `false`.
   */
  started?: boolean;

  /** Only assignments where `data.subject_id` matches one of the array values are returned. */
  subject_ids?: SafeInteger[];

  /** Only assignments where `data.subject_type` matches one of the array values are returned. */
  subject_types?: SubjectTuple;

  /**
   * When set to true, returns assignments that have a value in `data.unlocked_at`. Returns assignments with a `null`
   * `data.unlocked_at` if `false`.
   */
  unlocked?: boolean;
}

/**
 * The optional payload used in the request to start a new assignment via the WaniKani API.
 *
 * @category Assignments
 * @category Payloads
 * @see {@link https://docs.api.wanikani.com/20170710/#start-an-assignment}
 */
export interface AssignmentPayload {
  /** Specify properties of the Assignment; currently only `started_at` is supported. */
  assignment: {
    /** When the assignment was started. Must be greater than or equal to the assignment's `unlocked_at` date. */
    started_at?: DatableString | Date;
  };
}
