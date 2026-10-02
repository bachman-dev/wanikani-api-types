import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level } from "./base.js";

/**
 * The types of subjects used on WaniKani and its API.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectType = Types.SubjectType;
export const SubjectType = v.picklist(["kana_vocabulary", "kanji", "radical", "vocabulary"]);

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
  return v.is(SubjectType, value);
}

/**
 * A non-empty array of WaniKani subject types.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectTuple = Types.SubjectTuple;
export const SubjectTuple = v.pipe(
  v.tupleWithRest([SubjectType], SubjectType),
  v.nonEmpty(),
  v.checkItems(
    (item, index, array) => array.indexOf(item) === index,
    "Duplicate Subject Type detected in Subject Tuple",
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
  return v.is(SubjectTuple, value);
}

/**
 * A subject's auxilliary meanings.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectAuxiliaryMeaning = Types.SubjectAuxiliaryMeaning;
export const SubjectAuxiliaryMeaning = v.object({
  meaning: v.string(),
  type: v.picklist(["blacklist", "whitelist"]),
});

/**
 * Information pertaining to a subject's meaning.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectMeaning = Types.SubjectMeaning;
export const SubjectMeaning = v.object({
  accepted_answer: v.boolean(),
  meaning: v.string(),
  primary: v.boolean(),
});

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
export const SubjectBaseData = v.object({
  auxiliary_meanings: v.array(SubjectAuxiliaryMeaning),
  created_at: DatableString,
  document_url: v.string(),
  hidden_at: v.union([DatableString, v.null()]),
  lesson_position: v.number(),
  level: Level,
  meaning_mnemonic: v.string(),
  meanings: v.array(SubjectMeaning),
  slug: v.string(),
  spaced_repetition_system_id: v.number(),
});

/**
 * An image representing a radical subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type RadicalCharacterImage = Types.RadicalCharacterImage;
export const RadicalCharacterImage = v.intersect([
  v.object({
    url: v.string(),
  }),
  v.variant("content_type", [
    v.object({
      content_type: v.literal("image/svg+xml"),
      metadata: v.object({
        inline_styles: v.boolean(),
      }),
    }),
    v.object({
      content_type: v.literal("image/png"),
      metadata: v.object({
        color: v.string(),
        dimensions: v.string(),
        style_name: v.string(),
      }),
    }),
  ]),
]);

/**
 * Data returned only for radical subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type RadicalData = Types.RadicalData;
export const RadicalData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      amalgamation_subject_ids: v.array(v.number()),
      character_images: v.array(RadicalCharacterImage),
      characters: v.union([v.string(), v.null()]),
    }),
  ]),
);

/**
 * Information pertaining to a reading of a kanji subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanjiReading = Types.KanjiReading;
export const KanjiReading = v.object({
  accepted_answer: v.boolean(),
  primary: v.boolean(),
  reading: v.string(),
  type: v.picklist(["kunyomi", "nanori", "onyomi"]),
});

/**
 * Data returned only for kanji subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanjiData = Types.KanjiData;
export const KanjiData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      amalgamation_subject_ids: v.array(v.number()),
      characters: v.string(),
      component_subject_ids: v.array(v.number()),
      meaning_hint: v.union([v.string(), v.null()]),
      reading_hint: v.union([v.string(), v.null()]),
      reading_mnemonic: v.string(),
      readings: v.array(KanjiReading),
      visually_similar_subject_ids: v.array(v.number()),
    }),
  ]),
);

/**
 * Japanese context sentences for vocabulary, with a corresponding English translation.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyContextSentence = Types.VocabularyContextSentence;
export const VocabularyContextSentence = v.object({
  en: v.string(),
  ja: v.string(),
});

/**
 * Information pertaining to pronunciation audio for a vocabulary subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyPronunciationAudio = Types.VocabularyPronunciationAudio;
export const VocabularyPronunciationAudio = v.object({
  content_type: v.picklist(["audio/mpeg", "audio/ogg", "audio/webm"]),
  metadata: v.object({
    gender: v.picklist(["female", "male"]),
    pronunciation: v.string(),
    source_id: v.number(),
    voice_actor_id: v.number(),
    voice_actor_name: v.string(),
    voice_description: v.string(),
  }),
  url: v.string(),
});

/**
 * Information pertaining to a reading of a vocabulary subject..
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyReading = Types.VocabularyReading;
export const VocabularyReading = v.object({
  accepted_answer: v.boolean(),
  primary: v.boolean(),
  reading: v.string(),
});

/**
 * Data returned only for vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type VocabularyData = Types.VocabularyData;
export const VocabularyData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      characters: v.string(),
      component_subject_ids: v.array(v.number()),
      context_sentences: v.array(VocabularyContextSentence),
      parts_of_speech: v.array(v.string()),
      pronunciation_audios: v.array(VocabularyPronunciationAudio),
      reading_mnemonic: v.string(),
      readings: v.array(VocabularyReading),
    }),
  ]),
);

/**
 * Data returned only for kana-only vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type KanaVocabularyData = Types.KanaVocabularyData;
export const KanaVocabularyData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      characters: v.string(),
      context_sentences: v.array(VocabularyContextSentence),
      parts_of_speech: v.array(v.string()),
      pronunciation_audios: v.array(VocabularyPronunciationAudio),
    }),
  ]),
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
export const Subject = v.intersect([
  BaseResource,
  v.object({
    id: v.number(),
  }),
  v.variant("object", [
    v.object({
      data: KanaVocabularyData,
      object: v.literal("kana_vocabulary"),
    }),
    v.object({
      data: KanjiData,
      object: v.literal("kanji"),
    }),
    v.object({
      data: RadicalData,
      object: v.literal("radical"),
    }),
    v.object({
      data: VocabularyData,
      object: v.literal("vocabulary"),
    }),
  ]),
]);

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
  return v.is(Subject, value);
}

/**
 * A collection of subjects of mixed or unknown types returned from the WaniKani API.
 *
 * @category Collections
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 */
export type SubjectCollection = Types.SubjectCollection;
export const SubjectCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Subject),
    }),
  ]),
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
  return v.is(SubjectCollection, value);
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
export const SubjectParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      hidden: v.exactOptional(v.boolean()),
      levels: v.exactOptional(v.array(Level)),
      slugs: v.exactOptional(v.array(v.string())),
      types: v.exactOptional(SubjectTuple),
    }),
  ]),
);
