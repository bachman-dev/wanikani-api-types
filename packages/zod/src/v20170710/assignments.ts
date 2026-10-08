import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

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
export const Assignment = z.toZod<Types.Assignment>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      available_at: z.nullable(DatableString),
      burned_at: z.nullable(DatableString),
      created_at: DatableString,
      hidden: z.boolean(),
      passed_at: z.nullable(DatableString),
      resurrected_at: z.nullable(DatableString),
      srs_stage: SpacedRepetitionSystemStageNumber,
      started_at: z.nullable(DatableString),
      subject_id: SafeInteger,
      subject_type: SubjectType,
      unlocked_at: z.nullable(DatableString),
    }),
    id: SafeInteger,
    object: z.literal("assignment"),
  }),
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
  return z.validate(Assignment, value);
}

/**
 * A collection of assignments returned from the WaniKani API.
 *
 * @category Assignments
 * @category Collections
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 */
export type AssignmentCollection = Types.AssignmentCollection;

export const AssignmentCollection = z.toZod<Types.AssignmentCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(Assignment),
  }),
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
  return z.validate(AssignmentCollection, value);
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
export const AssignmentParameters = z.toZod<Types.AssignmentParameters>()(
  z.object({
    ...CollectionParameters.shape,
    available_after: z.exactOptional(z.union([DatableString, z.date()], { error: m.dateUnion })),
    available_before: z.exactOptional(z.union([DatableString, z.date()], { error: m.dateUnion })),
    burned: z.exactOptional(z.boolean()),
    hidden: z.exactOptional(z.boolean()),
    immediately_available_for_lessons: z.exactOptional(z.boolean()),
    immediately_available_for_review: z.exactOptional(z.boolean()),
    in_review: z.exactOptional(z.boolean()),
    levels: z.exactOptional(z.array(Level)),
    srs_stages: z.exactOptional(z.array(SpacedRepetitionSystemStageNumber)),
    started: z.exactOptional(z.boolean()),
    subject_ids: z.exactOptional(z.array(SafeInteger)),
    subject_types: z.exactOptional(SubjectTuple),
    unlocked: z.exactOptional(z.boolean()),
  }),
);

/**
 * The optional payload used in the request to start a new assignment via the WaniKani API.
 *
 * @category Assignments
 * @category Payloads
 * @see {@link https://docs.api.wanikani.com/20170710/#start-an-assignment}
 */
export type AssignmentPayload = Types.AssignmentPayload;
export const AssignmentPayload = z.toZod<Types.AssignmentPayload>()(
  z.object({
    assignment: z.object({
      started_at: z.exactOptional(z.union([DatableString, z.date()], { error: m.dateUnion })),
    }),
  }),
);
