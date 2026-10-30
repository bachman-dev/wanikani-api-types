import {
  array,
  boolean,
  define,
  defineModule,
  intersect,
  literal,
  nullable,
  object,
  optionalProperty,
  picklist,
  property,
  string,
  tuple,
  variant,
} from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level, SafeInteger } from "./base.js";

const see = ["https://docs.api.wanikani.com/20170710/#subjects"];

const imageMetadataDocs = "Details about the image. Each `content_type` returns a uniquely structured object.";

export const SubjectType = define(
  "SubjectType",
  picklist(["kana_vocabulary", "kanji", "radical", "vocabulary"]),
  { description: "The types of subjects used on WaniKani and its API.", see },
  { typeGuard: true },
);

export const SubjectTuple = define(
  "SubjectTuple",
  tuple([{ name: "first", schema: SubjectType }], {
    rest: { name: "rest", schema: SubjectType },
    unique: { message: "subjectTupleDuplicate" },
  }),
  { description: "A non-empty array of WaniKani subject types.", see },
  { typeGuard: true },
);

export const SubjectAuxiliaryMeaning = define(
  "SubjectAuxiliaryMeaning",
  object({
    meaning: property(string(), "A singular subject meaning."),
    type: property(
      picklist(["blacklist", "whitelist"]),
      "Either `whitelist` or `blacklist`. When evaluating user input, whitelisted meanings are used to match for correctness. Blacklisted meanings are used to match for incorrectness.",
    ),
  }),
  { description: "A subject's auxilliary meanings.", see },
);

export const SubjectMeaning = define(
  "SubjectMeaning",
  object({
    accepted_answer: property(boolean(), "Indicates if the meaning is used to evaluate user input for correctness."),
    meaning: property(string(), "A singular subject meaning."),
    primary: property(boolean(), "Indicates priority in the WaniKani system."),
  }),
  { description: "Information pertaining to a subject's meaning.", see },
);

export const SubjectBaseData = define(
  "SubjectBaseData",
  object({
    auxiliary_meanings: property(array(SubjectAuxiliaryMeaning), "Collection of auxiliary meanings."),
    created_at: property(DatableString, "Timestamp when the subject was created."),
    document_url: property(
      string(),
      "A URL pointing to the page on wanikani.com that provides detailed information about this subject.",
    ),
    hidden_at: property(
      nullable(DatableString),
      "Timestamp when the subject was hidden, indicating associated assignments will no longer appear in lessons or reviews and that the subject page is no longer visible on wanikani.com.",
    ),
    lesson_position: property(
      SafeInteger,
      "The position that the subject appears in lessons. Note that the value is scoped to the level of the subject, so there are duplicate values across levels.",
    ),
    level: property(Level, "The level of the subject, from `1` to `60`."),
    meaning_mnemonic: property(string(), "The subject's meaning mnemonic."),
    meanings: property(array(SubjectMeaning), "The subject meanings."),
    slug: property(
      string(),
      "The string that is used when generating the document URL for the subject. Radicals use their meaning, downcased. Kanji and vocabulary use their characters.",
    ),
    spaced_repetition_system_id: property(SafeInteger, "Unique identifier of the associated Spaced Repetition System."),
  }),
  {
    description: "The common properties of all subjects on WaniKani.",
    remarks:
      "This only represents a partial structure of a subject, and it's highly recommended to use one of the child type definitions that extend this type definition.",
    see,
  },
);

export const RadicalCharacterImage = define(
  "RadicalCharacterImage",
  intersect([
    object({
      url: property(string(), "The location of the image."),
    }),
    variant("content_type", [
      object({
        content_type: property(literal("image/png"), "The content type of the image."),
        metadata: property(
          object({
            color: property(string(), "Color of the asset in hexadecimal"),
            dimensions: property(string(), "Dimension of the asset in pixels"),
            style_name: property(string(), "A name descriptor"),
          }),
          imageMetadataDocs,
        ),
      }),
      object({
        content_type: property(literal("image/svg+xml"), "The content type of the image."),
        metadata: property(
          object({
            inline_styles: property(boolean(), "The SVG asset contains built-in CSS styling."),
          }),
          imageMetadataDocs,
        ),
      }),
    ]),
  ]),
  { description: "An image representing a radical subject.", see },
);

export const RadicalData = define(
  "RadicalData",
  object(
    {
      amalgamation_subject_ids: property(
        array(SafeInteger),
        "An array of numeric identifiers for the kanji that have the radical as a component.",
      ),
      character_images: property(array(RadicalCharacterImage), "A collection of images of the radical."),
      characters: property(
        nullable(string()),
        "Unlike kanji and vocabulary, radicals can have a null value for characters. Not all radicals have a UTF entry, so the radical must be visually represented with an image instead.",
      ),
    },
    { extends: [SubjectBaseData] },
  ),
  { description: "Data returned only for radical subjects.", see },
);

export const KanjiReading = define(
  "KanjiReading",
  object({
    accepted_answer: property(boolean(), "Indicates if the reading is used to evaluate user input for correctness."),
    primary: property(boolean(), "Indicates priority in the WaniKani system."),
    reading: property(string(), "A singular subject reading."),
    type: property(
      picklist(["kunyomi", "nanori", "onyomi"]),
      "The kanji reading's classfication: `kunyomi`, `nanori`, or `onyomi`.",
    ),
  }),
  { description: "Information pertaining to a reading of a kanji subject.", see },
);

export const KanjiData = define(
  "KanjiData",
  object(
    {
      amalgamation_subject_ids: property(
        array(SafeInteger),
        "An array of numeric identifiers for the vocabulary that have the kanji as a component.",
      ),
      characters: property(string(), "The UTF-8 characters for the subject, including kanji and hiragana."),
      component_subject_ids: property(
        array(SafeInteger),
        "An array of numeric identifiers for the radicals that make up this kanji. Note that these are the subjects that must have passed assignments in order to unlock this subject's assignment.",
      ),
      meaning_hint: property(nullable(string()), "Meaning hint for the kanji."),
      reading_hint: property(nullable(string()), "Reading hint for the kanji."),
      reading_mnemonic: property(string(), "The kanji's reading mnemonic."),
      readings: property(array(KanjiReading), "Selected readings for the kanji."),
      visually_similar_subject_ids: property(
        array(SafeInteger),
        "An array of numeric identifiers for kanji which are visually similar to the kanji in question.",
      ),
    },
    { extends: [SubjectBaseData] },
  ),
  { description: "Data returned only for kanji subjects.", see },
);

export const VocabularyContextSentence = define(
  "VocabularyContextSentence",
  object({
    en: property(string(), "English translation of the sentence."),
    ja: property(string(), "Japanese context sentence."),
  }),
  { description: "Japanese context sentences for vocabulary, with a corresponding English translation.", see },
);

export const VocabularyPronunciationAudio = define(
  "VocabularyPronunciationAudio",
  object({
    content_type: property(
      picklist(["audio/mpeg", "audio/ogg", "audio/webm"]),
      "The content type of the audio. Currently the API delivers `audio/mpeg`, `audio/ogg`, and `audio/webm`.",
    ),
    metadata: property(
      object({
        gender: property(picklist(["female", "male"]), "The gender of the voice actor."),
        pronunciation: property(string(), "Vocabulary being pronounced in kana."),
        source_id: property(SafeInteger, "A unique ID shared between same source pronunciation audio."),
        voice_actor_id: property(SafeInteger, "A unique ID belonging to the voice actor."),
        voice_actor_name: property(string(), "Humanized name of the voice actor."),
        voice_description: property(string(), "Description of the voice."),
      }),
      "Details about the pronunciation audio.",
    ),
    url: property(string(), "The location of the audio."),
  }),
  { description: "Information pertaining to pronunciation audio for a vocabulary subject.", see },
);

export const VocabularyReading = define(
  "VocabularyReading",
  object({
    accepted_answer: property(boolean(), "Indicates if the reading is used to evaluate user input for correctness."),
    primary: property(boolean(), "Indicates priority in the WaniKani system."),
    reading: property(string(), "A singular subject reading."),
  }),
  { description: "Information pertaining to a reading of a vocabulary subject..", see },
);

export const VocabularyData = define(
  "VocabularyData",
  object(
    {
      characters: property(string(), "The UTF-8 characters for the subject, including kanji and hiragana."),
      component_subject_ids: property(
        array(SafeInteger),
        "An array of numeric identifiers for the kanji that make up this vocabulary. Note that these are the subjects that must be have passed assignments in order to unlock this subject's assignment.",
      ),
      context_sentences: property(array(VocabularyContextSentence), "A collection of context sentences."),
      parts_of_speech: property(array(string()), "Parts of speech."),
      pronunciation_audios: property(array(VocabularyPronunciationAudio), "A collection of pronunciation audio."),
      reading_mnemonic: property(string(), "The vocabulary's reading mnemonic."),
      readings: property(array(VocabularyReading), "Selected readings for the vocabulary."),
    },
    { extends: [SubjectBaseData] },
  ),
  { description: "Data returned only for vocabulary subjects.", see },
);

export const KanaVocabularyData = define(
  "KanaVocabularyData",
  object(
    {
      characters: property(string(), "The UTF-8 characters for the subject, including kanji and hiragana."),
      context_sentences: property(array(VocabularyContextSentence), "A collection of context sentences."),
      parts_of_speech: property(array(string()), "Parts of speech."),
      pronunciation_audios: property(array(VocabularyPronunciationAudio), "A collection of pronunciation audio."),
    },
    { extends: [SubjectBaseData] },
  ),
  { description: "Data returned only for kana-only vocabulary subjects.", see },
);

export const Subject = define(
  "Subject",
  intersect([
    object({ id: property(SafeInteger, "A unique number identifying the subject.") }, { extends: [BaseResource] }),
    variant("object", [
      object({
        data: property(KanaVocabularyData, "Data for the returned kana-only vocabulary."),
        object: property(literal("kana_vocabulary"), "The kind of object returned."),
      }),
      object({
        data: property(KanjiData, "Data for the returned kanji."),
        object: property(literal("kanji"), "The kind of object returned."),
      }),
      object({
        data: property(RadicalData, "Data for the returned radical."),
        object: property(literal("radical"), "The kind of object returned."),
      }),
      object({
        data: property(VocabularyData, "Data for the returned vocabulary."),
        object: property(literal("vocabulary"), "The kind of object returned."),
      }),
    ]),
  ]),
  {
    description: [
      "The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`, `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves differently than the common attribute of the same name.",
      "This type is for mixed or unknown subject types; it is a discriminated union based on the subject's `object` key.",
    ],

    see,
  },
  { typeGuard: true },
);

export const SubjectCollection = define(
  "SubjectCollection",
  object(
    { data: property(array(Subject), "An array of returned subjects of mixed or unknown type.") },
    { extends: [BaseCollection] },
  ),
  {
    description: "A collection of subjects of mixed or unknown types returned from the WaniKani API.",

    see: ["https://docs.api.wanikani.com/20170710/#get-all-subjects"],
  },
  { typeGuard: true },
);

export const SubjectParameters = define(
  "SubjectParameters",
  object(
    {
      hidden: optionalProperty(
        boolean(),
        "Return subjects which are or are not hidden from the user-facing application.",
      ),
      levels: optionalProperty(array(Level), "Return subjects at the specified levels."),
      slugs: optionalProperty(array(string()), "Return subjects of the specified slug."),
      types: optionalProperty(SubjectTuple, "Return subjects of the specified types."),
    },
    { extends: [CollectionParameters] },
  ),
  {
    description: "Parameters that can be passed to the WaniKani API to filter a request for a Subject Collection.",

    see: ["https://docs.api.wanikani.com/20170710/#get-all-subjects"],
  },
);

export default defineModule("subjects", [
  SubjectType,
  SubjectTuple,
  SubjectAuxiliaryMeaning,
  SubjectMeaning,
  SubjectBaseData,
  RadicalCharacterImage,
  RadicalData,
  KanjiReading,
  KanjiData,
  VocabularyContextSentence,
  VocabularyPronunciationAudio,
  VocabularyReading,
  VocabularyData,
  KanaVocabularyData,
  Subject,
  SubjectCollection,
  SubjectParameters,
]);
