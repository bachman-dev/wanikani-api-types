import type { BaseCollection, BaseResource, CollectionParameters, DatableString, Level } from "./base.js";

/**
 * The types of subjects used on WaniKani and its API.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectType = "kana_vocabulary" | "kanji" | "radical" | "vocabulary";

/**
 * A non-empty array of WaniKani subject types.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type SubjectTuple = [first: SubjectType, ...rest: SubjectType[]];

/**
 * A subject's auxilliary meanings.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface SubjectAuxiliaryMeaning {
  /** A singular subject meaning. */
  meaning: string;

  /**
   * Either `whitelist` or `blacklist`. When evaluating user input, whitelisted meanings are used to match for
   * correctness. Blacklisted meanings are used to match for incorrectness.
   */
  type: "blacklist" | "whitelist";
}

/**
 * Information pertaining to a subject's meaning.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface SubjectMeaning {
  /** Indicates if the meaning is used to evaluate user input for correctness. */
  accepted_answer: boolean;

  /** A singular subject meaning. */
  meaning: string;

  /** Indicates priority in the WaniKani system. */
  primary: boolean;
}

/**
 * The common properties of all subjects on WaniKani.
 *
 * @remarks
 *   This only represents a partial structure of a subject, and it's highly recommended to use one of the child type
 *   definitions that extend this type definition.
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface SubjectBaseData {
  /** Collection of auxiliary meanings. */
  auxiliary_meanings: SubjectAuxiliaryMeaning[];

  /** Timestamp when the subject was created. */
  created_at: DatableString;

  /** A URL pointing to the page on wanikani.com that provides detailed information about this subject. */
  document_url: string;

  /**
   * Timestamp when the subject was hidden, indicating associated assignments will no longer appear in lessons or
   * reviews and that the subject page is no longer visible on wanikani.com.
   */
  hidden_at: DatableString | null;

  /**
   * The position that the subject appears in lessons. Note that the value is scoped to the level of the subject, so
   * there are duplicate values across levels.
   */
  lesson_position: number;

  /** The level of the subject, from `1` to `60`. */
  level: Level;

  /** The subject's meaning mnemonic. */
  meaning_mnemonic: string;

  /** The subject meanings. */
  meanings: SubjectMeaning[];

  /**
   * The string that is used when generating the document URL for the subject. Radicals use their meaning, downcased.
   * Kanji and vocabulary use their characters.
   */
  slug: string;

  /** Unique identifier of the associated Spaced Repetition System. */
  spaced_repetition_system_id: number;
}

/**
 * An image representing a radical subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export type RadicalCharacterImage = {
  /** The location of the image. */
  url: string;
} & (
  | {
      /** The content type of the image. */
      content_type: "image/png";
      /** Details about the image. Each `content_type` returns a uniquely structured object. */
      metadata: {
        /** Color of the asset in hexadecimal */
        color: string;
        /** Dimension of the asset in pixels */
        dimensions: string;
        /** A name descriptor */
        style_name: string;
      };
    }
  | {
      /** The content type of the image. */
      content_type: "image/svg+xml";

      /** Details about the image. Each `content_type` returns a uniquely structured object. */
      metadata: {
        /** The SVG asset contains built-in CSS styling. */
        inline_styles: boolean;
      };
    }
);

/**
 * Data returned only for radical subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface RadicalData extends SubjectBaseData {
  /** An array of numeric identifiers for the kanji that have the radical as a component. */
  amalgamation_subject_ids: number[];

  /** A collection of images of the radical. */
  character_images: RadicalCharacterImage[];

  /**
   * Unlike kanji and vocabulary, radicals can have a null value for characters. Not all radicals have a UTF entry, so
   * the radical must be visually represented with an image instead.
   */
  characters: string | null;
}

/**
 * Information pertaining to a reading of a kanji subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface KanjiReading {
  /** Indicates if the reading is used to evaluate user input for correctness. */
  accepted_answer: boolean;

  /** Indicates priority in the WaniKani system. */
  primary: boolean;

  /** A singular subject reading. */
  reading: string;

  /** The kanji reading's classfication: `kunyomi`, `nanori`, or `onyomi`. */
  type: "kunyomi" | "nanori" | "onyomi";
}

/**
 * Data returned only for kanji subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface KanjiData extends SubjectBaseData {
  /** An array of numeric identifiers for the vocabulary that have the kanji as a component. */
  amalgamation_subject_ids: number[];

  /** The UTF-8 characters for the subject, including kanji and hiragana. */
  characters: string;

  /**
   * An array of numeric identifiers for the radicals that make up this kanji. Note that these are the subjects that
   * must have passed assignments in order to unlock this subject's assignment.
   */
  component_subject_ids: number[];

  /** Meaning hint for the kanji. */
  meaning_hint: string | null;

  /** Reading hint for the kanji. */
  reading_hint: string | null;

  /** The kanji's reading mnemonic. */
  reading_mnemonic: string;

  /** Selected readings for the kanji. */
  readings: KanjiReading[];

  /** An array of numeric identifiers for kanji which are visually similar to the kanji in question. */
  visually_similar_subject_ids: number[];
}

/**
 * Japanese context sentences for vocabulary, with a corresponding English translation.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface VocabularyContextSentence {
  /** English translation of the sentence. */
  en: string;

  /** Japanese context sentence. */
  ja: string;
}

/**
 * Information pertaining to pronunciation audio for a vocabulary subject.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface VocabularyPronunciationAudio {
  /** The content type of the audio. Currently the API delivers `audio/mpeg`, `audio/ogg`, and `audio/webm`. */
  content_type: "audio/mpeg" | "audio/ogg" | "audio/webm";

  /** Details about the pronunciation audio. */
  metadata: {
    /** The gender of the voice actor. */
    gender: "female" | "male";

    /** Vocabulary being pronounced in kana. */
    pronunciation: string;

    /** A unique ID shared between same source pronunciation audio. */
    source_id: number;

    /** A unique ID belonging to the voice actor. */
    voice_actor_id: number;

    /** Humanized name of the voice actor. */
    voice_actor_name: string;

    /** Description of the voice. */
    voice_description: string;
  };

  /** The location of the audio. */
  url: string;
}

/**
 * Information pertaining to a reading of a vocabulary subject..
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface VocabularyReading {
  /** Indicates if the reading is used to evaluate user input for correctness. */
  accepted_answer: boolean;

  /** Indicates priority in the WaniKani system. */
  primary: boolean;

  /** A singular subject reading. */
  reading: string;
}

/**
 * Data returned only for vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface VocabularyData extends SubjectBaseData {
  /** The UTF-8 characters for the subject, including kanji and hiragana. */
  characters: string;

  /**
   * An array of numeric identifiers for the kanji that make up this vocabulary. Note that these are the subjects that
   * must be have passed assignments in order to unlock this subject's assignment.
   */
  component_subject_ids: number[];

  /** A collection of context sentences. */
  context_sentences: VocabularyContextSentence[];

  /** Parts of speech. */
  parts_of_speech: string[];

  /** A collection of pronunciation audio. */
  pronunciation_audios: VocabularyPronunciationAudio[];

  /** The vocabulary's reading mnemonic. */
  reading_mnemonic: string;

  /** Selected readings for the vocabulary. */
  readings: VocabularyReading[];
}

/**
 * Data returned only for kana-only vocabulary subjects.
 *
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 */
export interface KanaVocabularyData extends SubjectBaseData {
  /** The UTF-8 characters for the subject, including kanji and hiragana. */
  characters: string;

  /** A collection of context sentences. */
  context_sentences: VocabularyContextSentence[];

  /** Parts of speech. */
  parts_of_speech: string[];

  /** A collection of pronunciation audio. */
  pronunciation_audios: VocabularyPronunciationAudio[];
}

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
export type Subject = BaseResource & {
  /** A unique number identifying the subject. */
  id: number;
} & (
    | {
        /** Data for the returned kana-only vocabulary. */
        data: KanaVocabularyData;

        /** The kind of object returned. */
        object: "kana_vocabulary";
      }
    | {
        /** Data for the returned kanji. */
        data: KanjiData;

        /** The kind of object returned. */
        object: "kanji";
      }
    | {
        /** Data for the returned radical. */
        data: RadicalData;

        /** The kind of object returned. */
        object: "radical";
      }
    | {
        /** Data for the returned vocabulary. */
        data: VocabularyData;

        /** The kind of object returned. */
        object: "vocabulary";
      }
  );

/**
 * A collection of subjects of mixed or unknown types returned from the WaniKani API.
 *
 * @category Collections
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 */
export interface SubjectCollection extends BaseCollection {
  /** An array of returned subjects of mixed or unknown type. */
  data: Subject[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Subject Collection.
 *
 * @category Parameters
 * @category Subjects
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface SubjectParameters extends CollectionParameters {
  /** Return subjects which are or are not hidden from the user-facing application. */
  hidden?: boolean;

  /** Return subjects at the specified levels. */
  levels?: Level[];

  /** Return subjects of the specified slug. */
  slugs?: string[];

  /** Return subjects of the specified types. */
  types?: SubjectTuple;
}
