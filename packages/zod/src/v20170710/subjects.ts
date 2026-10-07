import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

import * as m from "./lang/index.ts";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level } from "./base.js";

/**
 * The types of subjects used on WaniKani and its API.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectType = Types.SubjectType;
export const SubjectType = z.toZod<Types.SubjectType>()(z.enum(["kana_vocabulary", "kanji", "radical", "vocabulary"]));

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Subjects
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSubjectType(value: unknown): value is SubjectType {
  return z.validate(SubjectType, value);
}

/**
 * A non-empty array of WaniKani subject types.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectTuple = Types.SubjectTuple;
export const SubjectTuple = z.toZod<Types.SubjectTuple>()(
  z.tuple([SubjectType], SubjectType).check(
    z.minLength(1),
    z.refine((items) => new Set(items).size === items.length, { error: m.subjectTupleDuplicate }),
  ),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Subjects
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSubjectTuple(value: unknown): value is SubjectTuple {
  return z.validate(SubjectTuple, value);
}

/**
 * A subject's auxilliary meanings.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectAuxiliaryMeaning = Types.SubjectAuxiliaryMeaning;
export const SubjectAuxiliaryMeaning = z.toZod<Types.SubjectAuxiliaryMeaning>()(
  z.object({
    meaning: z.string(),
    type: z.enum(["blacklist", "whitelist"]),
  }),
);

/**
 * Information pertaining to a subject's meaning.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectMeaning = Types.SubjectMeaning;
export const SubjectMeaning = z.toZod<Types.SubjectMeaning>()(
  z.object({
    accepted_answer: z.boolean(),
    meaning: z.string(),
    primary: z.boolean(),
  }),
);

/**
 * The common properties of all subjects on WaniKani.
 *
 * @remarks
 *   This only represents a partial structure of a subject, and it's highly recommended to use one of the child type
 *   definitions that extend this type definition.
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectBaseData = Types.SubjectBaseData;
export const SubjectBaseData = z.toZod<Types.SubjectBaseData>()(
  z.object({
    auxiliary_meanings: z.array(SubjectAuxiliaryMeaning),
    created_at: DatableString,
    document_url: z.string(),
    hidden_at: z.nullable(DatableString),
    lesson_position: z.number(),
    level: Level,
    meaning_mnemonic: z.string(),
    meanings: z.array(SubjectMeaning),
    slug: z.string(),
    spaced_repetition_system_id: z.number(),
  }),
);

/**
 * An image representing a radical subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type RadicalCharacterImage = Types.RadicalCharacterImage;
export const RadicalCharacterImage = z.toZod<Types.RadicalCharacterImage>()(
  z.intersection(
    z.object({
      url: z.string(),
    }),
    z.discriminatedUnion("content_type", [
      z.object({
        content_type: z.literal("image/svg+xml"),
        metadata: z.object({
          inline_styles: z.boolean(),
        }),
      }),
      z.object({
        content_type: z.literal("image/png"),
        metadata: z.object({
          color: z.string(),
          dimensions: z.string(),
          style_name: z.string(),
        }),
      }),
    ]),
  ),
);

/**
 * Data returned only for radical subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type RadicalData = Types.RadicalData;
export const RadicalData = z.toZod<Types.RadicalData>()(
  z.object({
    ...SubjectBaseData.shape,
    amalgamation_subject_ids: z.array(z.number()),
    character_images: z.array(RadicalCharacterImage),
    characters: z.nullable(z.string()),
  }),
);

/**
 * Information pertaining to a reading of a kanji subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanjiReading = Types.KanjiReading;
export const KanjiReading = z.toZod<Types.KanjiReading>()(
  z.object({
    accepted_answer: z.boolean(),
    primary: z.boolean(),
    reading: z.string(),
    type: z.enum(["kunyomi", "nanori", "onyomi"]),
  }),
);

/**
 * Data returned only for kanji subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanjiData = Types.KanjiData;
export const KanjiData = z.toZod<Types.KanjiData>()(
  z.object({
    ...SubjectBaseData.shape,
    amalgamation_subject_ids: z.array(z.number()),
    characters: z.string(),
    component_subject_ids: z.array(z.number()),
    meaning_hint: z.nullable(z.string()),
    reading_hint: z.nullable(z.string()),
    reading_mnemonic: z.string(),
    readings: z.array(KanjiReading),
    visually_similar_subject_ids: z.array(z.number()),
  }),
);

/**
 * Japanese context sentences for vocabulary, with a corresponding English translation.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyContextSentence = Types.VocabularyContextSentence;
export const VocabularyContextSentence = z.toZod<Types.VocabularyContextSentence>()(
  z.object({
    en: z.string(),
    ja: z.string(),
  }),
);

/**
 * Information pertaining to pronunciation audio for a vocabulary subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyPronunciationAudio = Types.VocabularyPronunciationAudio;
export const VocabularyPronunciationAudio = z.toZod<Types.VocabularyPronunciationAudio>()(
  z.object({
    content_type: z.enum(["audio/mpeg", "audio/ogg", "audio/webm"]),
    metadata: z.object({
      gender: z.enum(["female", "male"]),
      pronunciation: z.string(),
      source_id: z.number(),
      voice_actor_id: z.number(),
      voice_actor_name: z.string(),
      voice_description: z.string(),
    }),
    url: z.string(),
  }),
);

/**
 * Information pertaining to a reading of a vocabulary subject..
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyReading = Types.VocabularyReading;
export const VocabularyReading = z.toZod<Types.VocabularyReading>()(
  z.object({
    accepted_answer: z.boolean(),
    primary: z.boolean(),
    reading: z.string(),
  }),
);

/**
 * Data returned only for vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyData = Types.VocabularyData;
export const VocabularyData = z.toZod<Types.VocabularyData>()(
  z.object({
    ...SubjectBaseData.shape,
    characters: z.string(),
    component_subject_ids: z.array(z.number()),
    context_sentences: z.array(VocabularyContextSentence),
    parts_of_speech: z.array(z.string()),
    pronunciation_audios: z.array(VocabularyPronunciationAudio),
    reading_mnemonic: z.string(),
    readings: z.array(VocabularyReading),
  }),
);

/**
 * Data returned only for kana-only vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanaVocabularyData = Types.KanaVocabularyData;
export const KanaVocabularyData = z.toZod<Types.KanaVocabularyData>()(
  z.object({
    ...SubjectBaseData.shape,
    characters: z.string(),
    context_sentences: z.array(VocabularyContextSentence),
    parts_of_speech: z.array(z.string()),
    pronunciation_audios: z.array(VocabularyPronunciationAudio),
  }),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type is for mixed or unknown subject types; it is a discriminated union based on the subject's `object` key.
 *
 * @category Resources
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type Subject = Types.Subject;
export const Subject = z.toZod<Types.Subject>()(
  z.intersection(
    z.object({
      ...BaseResource.shape,
      id: z.number(),
    }),
    z.discriminatedUnion("object", [
      z.object({
        data: KanaVocabularyData,
        object: z.literal("kana_vocabulary"),
      }),
      z.object({
        data: KanjiData,
        object: z.literal("kanji"),
      }),
      z.object({
        data: RadicalData,
        object: z.literal("radical"),
      }),
      z.object({
        data: VocabularyData,
        object: z.literal("vocabulary"),
      }),
    ]),
  ),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Subjects
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSubject(value: unknown): value is Subject {
  return z.validate(Subject, value);
}

/**
 * A collection of subjects of mixed or unknown types returned from the WaniKani API.
 *
 * @category Collections
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 */
export type SubjectCollection = Types.SubjectCollection;
export const SubjectCollection = z.toZod<Types.SubjectCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(Subject),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Subjects
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSubjectCollection(value: unknown): value is SubjectCollection {
  return z.validate(SubjectCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Subject Collection.
 *
 * @category Parameters
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type SubjectParameters = Types.SubjectParameters;

export const SubjectParameters = z.toZod<Types.SubjectParameters>()(
  z.object({
    ...CollectionParameters.shape,
    hidden: z.exactOptional(z.boolean()),
    levels: z.exactOptional(z.array(Level)),
    slugs: z.exactOptional(z.array(z.string())),
    types: z.exactOptional(SubjectTuple),
  }),
);
