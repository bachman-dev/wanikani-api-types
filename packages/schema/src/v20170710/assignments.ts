import {
  array,
  boolean,
  define,
  defineModule,
  literal,
  nullable,
  object,
  optionalProperty,
  property,
} from "../core/index.js";
import {
  BaseCollection,
  BaseResource,
  CollectionParameters,
  DatableInput,
  DatableString,
  Level,
  SafeInteger,
} from "./base.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-assignments"];

export const Assignment = define(
  "Assignment",
  object(
    {
      data: property(
        object({
          available_at: property(
            nullable(DatableString),
            "When the related subject will be available in the user's review queue.",
          ),
          burned_at: property(nullable(DatableString), "When the user reaches SRS stage 9 the first time."),
          created_at: property(DatableString, "When the assignment was created."),
          hidden: property(
            boolean(),
            "Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.",
          ),
          passed_at: property(nullable(DatableString), "When the user reaches SRS stage `5` for the first time."),
          resurrected_at: property(
            nullable(DatableString),
            "When the subject is resurrected and placed back in the user's review queue.",
          ),
          srs_stage: property(
            SpacedRepetitionSystemStageNumber,
            "The current SRS stage interval. The interval range is determined by the related subject's Spaced Repetition System.",
          ),
          started_at: property(nullable(DatableString), "When the user completes the lesson for the related subject."),
          subject_id: property(SafeInteger, "Unique identifier of the associated subject."),
          subject_type: property(SubjectType, "The type of the associated subject."),
          unlocked_at: property(nullable(DatableString), [
            "When the related subjects has its prerequisites satisfied and is made available in lessons.",
            "Prerequisites are:",
            "- The subject components have reached SRS stage 5 once (they have been “passed”).",
            "- The user's level is equal to or greater than the level of the assignment’s subject.",
          ]),
        }),
        "Data for the returned assignment.",
      ),
      id: property(SafeInteger, "A unique number identifying the assignment."),
      object: property(literal("assignment"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description:
      "Assignments contain information about a user's progress on a particular subject, including their current state and timestamps for various progress milestones. Assignments are created when a user has passed all the components of the given subject and the assignment is at or below their current level for the first time.",
    see: ["https://docs.api.wanikani.com/20170710/#assignments"],
  },
  { typeGuard: true },
);

export const AssignmentCollection = define(
  "AssignmentCollection",
  object({ data: property(array(Assignment), "An array of returned assignments.") }, { extends: [BaseCollection] }),
  {
    description: "A collection of assignments returned from the WaniKani API.",
    see: collectionSee,
  },
  { typeGuard: true },
);

export const AssignmentParameters = define(
  "AssignmentParameters",
  object(
    {
      available_after: optionalProperty(DatableInput, "Only assignments available at or after this time are returned."),
      available_before: optionalProperty(
        DatableInput,
        "Only assignments available at or before this time are returned.",
      ),
      burned: optionalProperty(
        boolean(),
        "When set to `true`, returns assignments that have a value in `data.burned_at`. Returns assignments with a `null` `data.burned_at` if `false`.",
      ),
      hidden: optionalProperty(boolean(), "Return assignments with a matching value in the `hidden` attribute."),
      immediately_available_for_lessons: optionalProperty(
        boolean(),
        "When set to `true`, returns assignments which are immediately available for lessons.",
      ),
      immediately_available_for_review: optionalProperty(
        boolean(),
        "When set to `true`, returns assignments which are immediately available for review.",
      ),
      in_review: optionalProperty(boolean(), "When set to `true`, returns assignments which are in the review state."),
      levels: optionalProperty(
        array(Level),
        "Only assignments where the associated subject level matches one of the array values are returned. Valid values range from `1` to `60`.",
      ),
      srs_stages: optionalProperty(
        array(SpacedRepetitionSystemStageNumber),
        "Only assignments where `data.srs_stage` matches one of the array values are returned. Valid values range from `0` to `9`.",
      ),
      started: optionalProperty(
        boolean(),
        "When set to `true`, returns assignments that have a value in `data.started_at`. Returns assignments with a `null` `data.started_at` if `false`.",
      ),
      subject_ids: optionalProperty(
        array(SafeInteger),
        "Only assignments where `data.subject_id` matches one of the array values are returned.",
      ),
      subject_types: optionalProperty(
        SubjectTuple,
        "Only assignments where `data.subject_type` matches one of the array values are returned.",
      ),
      unlocked: optionalProperty(
        boolean(),
        "When set to true, returns assignments that have a value in `data.unlocked_at`. Returns assignments with a `null` `data.unlocked_at` if `false`.",
      ),
    },
    { extends: [CollectionParameters] },
  ),
  {
    description: "Parameters that can be passed to the WaniKani API to filter a request for an Assignment Collection.",
    see: collectionSee,
  },
);

export const AssignmentPayload = define(
  "AssignmentPayload",
  object({
    assignment: property(
      object({
        started_at: optionalProperty(
          DatableInput,
          "When the assignment was started. Must be greater than or equal to the assignment's `unlocked_at` date.",
        ),
      }),
      "Specify properties of the Assignment; currently only `started_at` is supported.",
    ),
  }),
  {
    description: "The optional payload used in the request to start a new assignment via the WaniKani API.",
    see: ["https://docs.api.wanikani.com/20170710/#start-an-assignment"],
  },
);

export default defineModule("assignments", [Assignment, AssignmentCollection, AssignmentParameters, AssignmentPayload]);
