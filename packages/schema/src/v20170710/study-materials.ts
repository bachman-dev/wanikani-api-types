import {
  array,
  boolean,
  define,
  defineModule,
  literal,
  object,
  optionalProperty,
  partial,
  property,
  string,
} from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-study-materials"];

export const StudyMaterialBaseData = define(
  "StudyMaterialBaseData",
  object({
    meaning_note: property(string(), "Free form note related to the meaning(s) of the associated subject."),
    meaning_synonyms: property(
      array(string()),
      "Synonyms for the meaning of the subject. These are used as additional correct answers during reviews.",
    ),
    reading_note: property(string(), "Free form note related to the reading(s) of the associated subject."),
  }),
  {
    description:
      "Data found in all study materials whether they are being created/updated, or received from the WaniKani API.",
    remarks:
      "For creating study materials, use {@link StudyMaterialCreatePayload}; for updating study materials, use {@link StudyMaterialUpdatePayload}.",
  },
);

export const StudyMaterial = define(
  "StudyMaterial",
  object(
    {
      data: property(
        object(
          {
            created_at: property(DatableString, "Timestamp when the study material was created."),
            hidden: property(
              boolean(),
              "Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.",
            ),
            subject_id: property(SafeInteger, "Unique identifier of the associated subject."),
            subject_type: property(SubjectType, "The type of the associated subject."),
          },
          { extends: [StudyMaterialBaseData] },
        ),
        "Data for the returned study material.",
      ),
      id: property(SafeInteger, "A unique number identifying the study material."),
      object: property(literal("study_material"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description:
      "Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the user enters any study information.",
    see: ["https://docs.api.wanikani.com/20170710/#study-materials"],
  },
  { typeGuard: true },
);

export const StudyMaterialCollection = define(
  "StudyMaterialCollection",
  object(
    { data: property(array(StudyMaterial), "An array of returned study materials.") },
    { extends: [BaseCollection] },
  ),
  {
    description: "A collection of study materials returned from the WaniKani API.",
    see: collectionSee,
  },
  { typeGuard: true },
);

export const StudyMaterialParameters = define(
  "StudyMaterialParameters",
  object(
    {
      hidden: optionalProperty(boolean(), "Return study materials with a matching value in the `hidden` attribute."),
      subject_ids: optionalProperty(
        array(SafeInteger),
        "Only study material records where `data.subject_id` matches one of the array values are returned.",
      ),
      subject_types: optionalProperty(
        SubjectTuple,
        "Only study material records where `data.subject_type` matches one of the array values are returned.",
      ),
    },
    { extends: [CollectionParameters] },
  ),
  {
    description:
      "Parameters that can be passed to the WaniKani API to filter a request for a Study Material Collection.",
    see: collectionSee,
  },
);

export const StudyMaterialUpdatePayload = define("StudyMaterialUpdatePayload", partial(StudyMaterialBaseData), {
  description: "The payload sent to the WaniKani API when updating study materials.",
  see: ["https://docs.api.wanikani.com/20170710/#update-a-study-material"],
});

export const StudyMaterialCreatePayload = define(
  "StudyMaterialCreatePayload",
  object(
    { subject_id: property(SafeInteger, "Unique identifier of the associated subject.") },
    { extends: [StudyMaterialUpdatePayload] },
  ),
  {
    description: "The payload sent to the WaniKani API when creating new study materials.",
    see: ["https://docs.api.wanikani.com/20170710/#create-a-study-material"],
  },
);

export default defineModule("study-materials", [
  StudyMaterialBaseData,
  StudyMaterial,
  StudyMaterialCollection,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
  StudyMaterialCreatePayload,
]);
