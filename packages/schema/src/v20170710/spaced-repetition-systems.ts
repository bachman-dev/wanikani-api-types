import {
  alias,
  array,
  constant,
  define,
  defineModule,
  literal,
  nullable,
  number,
  object,
  picklist,
  property,
  string,
} from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";

const see = ["https://docs.api.wanikani.com/20170710/#spaced-repetition-systems"];

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems"];

export const MIN_SRS_STAGE = constant(
  "MIN_SRS_STAGE",
  0,
  "The minimum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.",
);

export const MAX_SRS_REVIEW_STAGE = constant(
  "MAX_SRS_REVIEW_STAGE",
  // oxlint-disable-next-line no-magic-numbers -- This names the number
  8,
  "The maximum SRS Stage Number used in WaniKani's reviews; exported for use in lieu of a Magic Number.",
);

export const MAX_SRS_STAGE = constant(
  "MAX_SRS_STAGE",
  // oxlint-disable-next-line no-magic-numbers -- This names the number
  9,
  "The maximum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.",
);

export const SpacedRepetitionSystemStageNumber = define(
  "SpacedRepetitionSystemStageNumber",
  number({ base: SafeInteger, min: MIN_SRS_STAGE, max: MAX_SRS_STAGE }),
  "A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.",
  { typeGuard: true },
);

export const SpacedRepetitionSystemStage = define(
  "SpacedRepetitionSystemStage",
  object({
    interval: property(
      nullable(SafeInteger),
      "The length of time added to the time of review registration, adjusted to the beginning of the hour.",
    ),
    interval_unit: property(
      nullable(picklist(["days", "hours", "milliseconds", "minutes", "seconds", "weeks"])),
      "Unit of time. Can be the following: `milliseconds`, `seconds`, `minutes`, `hours`, `days`, and `weeks`.",
    ),
    position: property(SpacedRepetitionSystemStageNumber, "The position of the stage within the continuous order."),
  }),
  { description: "An individual Spaced Repetition System (SRS) Stage.", see },
);

export const SpacedRepetitionSystem = define(
  "SpacedRepetitionSystem",
  object(
    {
      data: property(
        object({
          burning_stage_position: property(SpacedRepetitionSystemStageNumber, "`position` of the burning stage."),
          created_at: property(DatableString, "Timestamp when the `spaced_repetition_system` was created."),
          description: property(string(), "Details about the spaced repetition system."),
          name: property(string(), "The name of the spaced repetition system."),
          passing_stage_position: property(SpacedRepetitionSystemStageNumber, "`position` of the passing stage."),
          stages: property(array(SpacedRepetitionSystemStage), "A collection of stages."),
          starting_stage_position: property(SpacedRepetitionSystemStageNumber, "`position` of the starting stage."),
          unlocking_stage_position: property(SpacedRepetitionSystemStageNumber, "`position` of the unlocking stage."),
        }),
        "Data for the return Spaced Repetition System.",
      ),
      id: property(SafeInteger, "A unique number identifying the Spaced Repetition System."),
      object: property(literal("spaced_repetition_system"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description:
      "Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has relationship with Subjects.",
    categories: ["Resources"],
    see,
  },
  { typeGuard: true },
);

export const SpacedRepetitionSystemCollection = define(
  "SpacedRepetitionSystemCollection",
  object(
    { data: property(array(SpacedRepetitionSystem), "An array of returned Spaced Repetition Systems.") },
    { extends: [BaseCollection] },
  ),
  {
    description: "A collection of Spaced Repetition Systems returned from the WaniKani API.",
    categories: ["Collections"],
    see: collectionSee,
  },
  { typeGuard: true },
);

export const SpacedRepetitionSystemParameters = alias("SpacedRepetitionSystemParameters", CollectionParameters, {
  description:
    "Parameters that can be passed to the WaniKani API to filter a request for a Spaced Repetition System Collection.",
  categories: ["Parameters"],
  see: collectionSee,
});

export default defineModule("spaced-repetition-systems", "Spaced Repetition Systems", [
  MIN_SRS_STAGE,
  MAX_SRS_REVIEW_STAGE,
  MAX_SRS_STAGE,
  SpacedRepetitionSystemStageNumber,
  SpacedRepetitionSystemStage,
  SpacedRepetitionSystem,
  SpacedRepetitionSystemCollection,
  SpacedRepetitionSystemParameters,
]);
