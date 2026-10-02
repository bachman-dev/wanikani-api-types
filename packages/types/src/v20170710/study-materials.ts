import type { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import type { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Data found in all study materials whether they are being created/updated, or received from the WaniKani API.
 *
 * @remarks
 *   For creating study materials, use {@link StudyMaterialCreatePayload}; for updating study materials, use
 *   {@link StudyMaterialUpdatePayload}.
 * @category Study Materials
 */
export interface StudyMaterialBaseData {
  /** Free form note related to the meaning(s) of the associated subject. */
  meaning_note: string;

  /** Synonyms for the meaning of the subject. These are used as additional correct answers during reviews. */
  meaning_synonyms: string[];

  /** Free form note related to the reading(s) of the associated subject. */
  reading_note: string;
}

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @category Resources
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 */
export interface StudyMaterial extends BaseResource {
  /** Data for the returned study material. */
  data: StudyMaterialBaseData & {
    /** Timestamp when the study material was created. */
    created_at: DatableString;

    /** Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews. */
    hidden: boolean;

    /** Unique identifier of the associated subject. */
    subject_id: number;

    /** The type of the associated subject. */
    subject_type: SubjectType;
  };

  /** A unique number identifying the study material. */
  id: number;

  /** The kind of object returned. */
  object: "study_material";
}

/**
 * A collection of study materials returned from the WaniKani API.
 *
 * @category Collections
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 */
export interface StudyMaterialCollection extends BaseCollection {
  /** An array of returned study materials. */
  data: StudyMaterial[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Study Material Collection.
 *
 * @category Parameters
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface StudyMaterialParameters extends CollectionParameters {
  /** Return study materials with a matching value in the `hidden` attribute. */
  hidden?: boolean;

  /** Only study material records where `data.subject_id` matches one of the array values are returned. */
  subject_ids?: SafeInteger[];

  /** Only study material records where `data.subject_type` matches one of the array values are returned. */
  subject_types?: SubjectTuple;
}

/**
 * The payload sent to the WaniKani API when updating study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 */
export type StudyMaterialUpdatePayload = Partial<StudyMaterialBaseData>;

/**
 * The payload sent to the WaniKani API when creating new study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-study-material}
 */
export interface StudyMaterialCreatePayload extends StudyMaterialUpdatePayload {
  /** Unique identifier of the associated subject. */
  subject_id: SafeInteger;
}
