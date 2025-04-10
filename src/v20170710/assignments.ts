import * as m from "./lang/index.js";
import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";

/**
 * Assignments contain information about a user's progress on a particular subject, including their current state and
 * timestamps for various progress milestones. Assignments are created when a user has passed all the components of the
 * given subject and the assignment is at or below their current level for the first time.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
 * @category Assignments
 * @category Resources
 */
export interface Assignment extends BaseResource {
  /**
   * Data for the returned assignment.
   */
  data: {
    /**
     * When the related subject will be available in the user's review queue.
     */
    available_at: DatableString | null;

    /**
     * When the user reaches SRS stage 9 the first time.
     */
    burned_at: DatableString | null;

    /**
     * When the assignment was created.
     */
    created_at: DatableString;

    /**
     * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
     */
    hidden: boolean;

    /**
     * When the user reaches SRS stage `5` for the first time.
     */
    passed_at: DatableString | null;

    /**
     * When the subject is resurrected and placed back in the user's review queue.
     */
    resurrected_at: DatableString | null;

    /**
     * The current SRS stage interval. The interval range is determined by the related subject's Spaced Repetition
     * System.
     */
    srs_stage: SpacedRepetitionSystemStageNumber;

    /**
     * When the user completes the lesson for the related subject.
     */
    started_at: DatableString | null;

    /**
     * Unique identifier of the associated subject.
     */
    subject_id: number;

    /**
     * The type of the associated subject.
     */
    subject_type: SubjectType;

    /**
     * When the related subjects has its prerequisites satisfied and is made available in lessons.
     *
     * Prerequisites are:
     * * The subject components have reached SRS stage 5 once (they have been “passed”).
     * * The user's level is equal to or greater than the level of the assignment’s subject.
     */
    unlocked_at: DatableString | null;
  };

  /**
   * A unique number identifying the assignment.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "assignment";
}
export const Assignment = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        available_at: v.union([DatableString, v.null()]),
        burned_at: v.union([DatableString, v.null()]),
        created_at: DatableString,
        hidden: v.boolean(),
        passed_at: v.union([DatableString, v.null()]),
        resurrected_at: v.union([DatableString, v.null()]),
        srs_stage: SpacedRepetitionSystemStageNumber,
        started_at: v.union([DatableString, v.null()]),
        subject_id: v.number(),
        subject_type: SubjectType,
        unlocked_at: v.union([DatableString, v.null()]),
      }),
      id: v.number(),
      object: v.literal("assignment"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Assignments
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isAssignment(value: unknown): value is Assignment {
  return v.is(Assignment, value);
}

/**
 * A collection of assignments returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @category Assignments
 * @category Collections
 */
export interface AssignmentCollection extends BaseCollection {
  /**
   * An array of returned assignments.
   */
  data: Assignment[];
}
export const AssignmentCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Assignment),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Assignments
 * @category Type Guards
 */
// @__NO_SIDE_EFFECTS__
export function isAssignmentCollection(value: unknown): value is AssignmentCollection {
  return v.is(AssignmentCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for an
 * Assignment Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @see {@link stringifyParameters}
 * @category Assignments
 * @category Parameters
 */
export interface AssignmentParameters extends CollectionParameters {
  /**
   * Only assignments available at or after this time are returned.
   */
  available_after?: DatableString | Date;

  /**
   * Only assignments available at or before this time are returned.
   */
  available_before?: DatableString | Date;

  /**
   * When set to `true`, returns assignments that have a value in `data.burned_at`. Returns assignments with a `null`
   * `data.burned_at` if `false`.
   */
  burned?: boolean;

  /**
   * Return assignments with a matching value in the `hidden` attribute.
   */
  hidden?: boolean;

  /**
   * When set to `true`, returns assignments which are immediately available for lessons.
   */
  immediately_available_for_lessons?: boolean;

  /**
   * When set to `true`, returns assignments which are immediately available for review.
   */
  immediately_available_for_review?: boolean;

  /**
   * When set to `true`, returns assignments which are in the review state.
   */
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

  /**
   * Only assignments where `data.subject_id` matches one of the array values are returned.
   */
  subject_ids?: SafeInteger[];

  /**
   * Only assignments where `data.subject_type` matches one of the array values are returned.
   */
  subject_types?: SubjectTuple;

  /**
   * When set to true, returns assignments that have a value in `data.unlocked_at`. Returns assignments with a `null`
   * `data.unlocked_at` if `false`.
   */
  unlocked?: boolean;
}
export const AssignmentParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      available_after: v.optional(v.union([DatableString, v.date()], m.dateUnion)),
      available_before: v.optional(v.union([DatableString, v.date()], m.dateUnion)),
      burned: v.optional(v.boolean()),
      hidden: v.optional(v.boolean()),
      immediately_available_for_lessons: v.optional(v.boolean()),
      immediately_available_for_review: v.optional(v.boolean()),
      in_review: v.optional(v.boolean()),
      levels: v.optional(v.array(Level)),
      srs_stages: v.optional(v.array(SpacedRepetitionSystemStageNumber)),
      started: v.optional(v.boolean()),
      subject_ids: v.optional(v.array(SafeInteger)),
      subject_types: v.optional(SubjectTuple),
      unlocked: v.optional(v.boolean()),
    }),
  ]),
);

/**
 * The optional payload used in the request to start a new assignment via the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#start-an-assignment}
 * @category Assignments
 * @category Payloads
 */
export interface AssignmentPayload {
  /**
   * Specify properties of the Assignment; currently only `started_at` is supported.
   */
  assignment: {
    /**
     * When the assignment was started. Must be greater than or equal to the assignment's `unlocked_at` date.
     */
    started_at?: DatableString | Date;
  };
}
export const AssignmentPayload = v.object({
  assignment: v.object({
    started_at: v.optional(v.union([DatableString, v.date()], m.dateUnion)),
  }),
});
