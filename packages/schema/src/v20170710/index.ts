// oxlint-disable oxc/no-barrel-file -- This is an entrypoint for the v20170710 API revision
import { defineRevision } from "../core/index.js";
import assignments from "./assignments.js";
import base from "./base.js";
import levelProgressions from "./level-progressions.js";
import resets from "./resets.js";
import reviewStatistics from "./review-statistics.js";
import reviews from "./reviews.js";
import spacedRepetitionSystems from "./spaced-repetition-systems.js";
import studyMaterials from "./study-materials.js";
import subjects from "./subjects.js";
import summary from "./summary.js";
import user from "./user.js";
import voiceActors from "./voice-actors.js";

export * from "./assignments.js";
export * from "./base.js";
export * from "./level-progressions.js";
export * from "./resets.js";
export * from "./review-statistics.js";
export * from "./reviews.js";
export * from "./spaced-repetition-systems.js";
export * from "./study-materials.js";
export * from "./subjects.js";
export * from "./summary.js";
export * from "./user.js";
export * from "./voice-actors.js";

/** The schema of the v20170710 WaniKani API revision. */
export const revision = defineRevision({
  revision: "20170710",
  modules: [
    assignments,
    base,
    levelProgressions,
    resets,
    reviewStatistics,
    reviews,
    spacedRepetitionSystems,
    studyMaterials,
    subjects,
    summary,
    user,
    voiceActors,
  ],
  messages: {
    dateUnion: "Expected either a valid ISO-8601 timestamp string or a JavaScript Date",
    reviewPayloadIntersect:
      "Failed to intersect Review Payload objects; this is usually caused when trying to merge a base object with key/value type conflicts.",
    reviewPayloadUnion:
      "Review Payload must have one and only one of either an assignment_id or subject_id positive integer",
    subjectTupleDuplicate: "Duplicate Subject Type detected in Subject Tuple",
  },
});
