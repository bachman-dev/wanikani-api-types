import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

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
export const StudyMaterialBaseData = z.toZod<Types.StudyMaterialBaseData>()(
  z.object({
    meaning_note: z.string(),
    meaning_synonyms: z.array(z.string()),
    reading_note: z.string(),
  }),
);

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @category Resources
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 */
export type StudyMaterial = Types.StudyMaterial;
export const StudyMaterial = z.toZod<Types.StudyMaterial>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      ...StudyMaterialBaseData.shape,
      created_at: DatableString,
      hidden: z.boolean(),
      subject_id: z.number(),
      subject_type: SubjectType,
    }),
    id: z.number(),
    object: z.literal("study_material"),
  }),
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
  return z.validate(StudyMaterial, value);
}

/**
 * A collection of study materials returned from the WaniKani API.
 *
 * @category Collections
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 */
export type StudyMaterialCollection = Types.StudyMaterialCollection;
export const StudyMaterialCollection = z.toZod<Types.StudyMaterialCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(StudyMaterial),
  }),
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
  return z.validate(StudyMaterialCollection, value);
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
export const StudyMaterialParameters = z.toZod<Types.StudyMaterialParameters>()(
  z.object({
    ...CollectionParameters.shape,
    hidden: z.exactOptional(z.boolean()),
    subject_ids: z.exactOptional(z.array(SafeInteger)),
    subject_types: z.exactOptional(SubjectTuple),
  }),
);

/**
 * The payload sent to the WaniKani API when updating study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 */
export type StudyMaterialUpdatePayload = Types.StudyMaterialUpdatePayload;
export const StudyMaterialUpdatePayload = z.toZod<Types.StudyMaterialUpdatePayload>()(
  z.object({
    meaning_note: z.exactOptional(StudyMaterialBaseData.shape.meaning_note),
    meaning_synonyms: z.exactOptional(StudyMaterialBaseData.shape.meaning_synonyms),
    reading_note: z.exactOptional(StudyMaterialBaseData.shape.reading_note),
  }),
);

/**
 * The payload sent to the WaniKani API when creating new study materials.
 *
 * @category Payloads
 * @category Study Materials
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-study-material}
 */
export type StudyMaterialCreatePayload = Types.StudyMaterialCreatePayload;
export const StudyMaterialCreatePayload = z.toZod<Types.StudyMaterialCreatePayload>()(
  z.object({
    ...StudyMaterialUpdatePayload.shape,
    subject_id: SafeInteger,
  }),
);
