import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Data found in all study materials whether they are being created/updated, or received from the WaniKani API.
 *
 * @remarks
 *   For creating study materials, use {@link StudyMaterialCreatePayload}; for updating study materials, use
 *   {@link StudyMaterialUpdatePayload}.
 * @category Study Materials
 */
export type StudyMaterialBaseData = Types.StudyMaterialBaseData;
export const StudyMaterialBaseData = v.object({
  meaning_note: v.string(),
  meaning_synonyms: v.array(v.string()),
  reading_note: v.string(),
});

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @category Resources
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 */
export type StudyMaterial = Types.StudyMaterial;
export const StudyMaterial = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.intersect([
        StudyMaterialBaseData,
        v.object({
          created_at: DatableString,
          hidden: v.boolean(),
          subject_id: v.number(),
          subject_type: SubjectType,
        }),
      ]),
      id: v.number(),
      object: v.literal("study_material"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Study Materials
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isStudyMaterial(value: unknown): value is StudyMaterial {
  return v.is(StudyMaterial, value);
}

/**
 * A collection of study materials returned from the WaniKani API.
 *
 * @category Collections
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 */
export type StudyMaterialCollection = Types.StudyMaterialCollection;
export const StudyMaterialCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(StudyMaterial),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Study Materials
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isStudyMaterialCollection(value: unknown): value is StudyMaterialCollection {
  return v.is(StudyMaterialCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Study Material Collection.
 *
 * @category Parameters
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type StudyMaterialParameters = Types.StudyMaterialParameters;
export const StudyMaterialParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      hidden: v.exactOptional(v.boolean()),
      subject_ids: v.exactOptional(v.array(SafeInteger)),
      subject_types: v.exactOptional(SubjectTuple),
    }),
  ]),
);

/**
 * The payload sent to the WaniKani API when updating study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 */
export type StudyMaterialUpdatePayload = Types.StudyMaterialUpdatePayload;
// N.b. v.partial() wraps entries with v.optional(), which would allow properties to be explicitly `undefined`
export const StudyMaterialUpdatePayload = v.object({
  meaning_note: v.exactOptional(StudyMaterialBaseData.entries.meaning_note),
  meaning_synonyms: v.exactOptional(StudyMaterialBaseData.entries.meaning_synonyms),
  reading_note: v.exactOptional(StudyMaterialBaseData.entries.reading_note),
});

/**
 * The payload sent to the WaniKani API when creating new study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-study-material}
 */
export type StudyMaterialCreatePayload = Types.StudyMaterialCreatePayload;
export const StudyMaterialCreatePayload = v.object(
  v.entriesFromObjects([
    StudyMaterialUpdatePayload,
    v.object({
      subject_id: SafeInteger,
    }),
  ]),
);
