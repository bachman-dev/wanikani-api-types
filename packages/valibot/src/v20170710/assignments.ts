import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import * as m from "./lang/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Assignments contain information about a user's progress on a particular subject, including their current state and
 * timestamps for various progress milestones. Assignments are created when a user has passed all the components of the
 * given subject and the assignment is at or below their current level for the first time.
 *
 * @category Assignments
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
 */
export type Assignment = Types.Assignment;
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
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isAssignment(value: unknown): value is Assignment {
  return v.is(Assignment, value);
}

/**
 * A collection of assignments returned from the WaniKani API.
 *
 * @category Assignments
 * @category Collections
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 */
export type AssignmentCollection = Types.AssignmentCollection;
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
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isAssignmentCollection(value: unknown): value is AssignmentCollection {
  return v.is(AssignmentCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for an Assignment Collection.
 *
 * @category Assignments
 * @category Parameters
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type AssignmentParameters = Types.AssignmentParameters;
export const AssignmentParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      available_after: v.exactOptional(v.union([DatableString, v.date()], m.dateUnion)),
      available_before: v.exactOptional(v.union([DatableString, v.date()], m.dateUnion)),
      burned: v.exactOptional(v.boolean()),
      hidden: v.exactOptional(v.boolean()),
      immediately_available_for_lessons: v.exactOptional(v.boolean()),
      immediately_available_for_review: v.exactOptional(v.boolean()),
      in_review: v.exactOptional(v.boolean()),
      levels: v.exactOptional(v.array(Level)),
      srs_stages: v.exactOptional(v.array(SpacedRepetitionSystemStageNumber)),
      started: v.exactOptional(v.boolean()),
      subject_ids: v.exactOptional(v.array(SafeInteger)),
      subject_types: v.exactOptional(SubjectTuple),
      unlocked: v.exactOptional(v.boolean()),
    }),
  ]),
);

/**
 * The optional payload used in the request to start a new assignment via the WaniKani API.
 *
 * @category Assignments
 * @category Payloads
 * @see {@link https://docs.api.wanikani.com/20170710/#start-an-assignment}
 */
export type AssignmentPayload = Types.AssignmentPayload;
export const AssignmentPayload = v.object({
  assignment: v.object({
    started_at: v.exactOptional(v.union([DatableString, v.date()], m.dateUnion)),
  }),
});
