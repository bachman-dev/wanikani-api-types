import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { test } from "vitest";

// Base

const emptyParams: WK.CollectionParameters = {};

// Assignments

const assignment = {
  id: 85041695,
  object: "assignment" as const,
  url: "https://api.wanikani.com/v2/assignments/85041695",
  data_updated_at: v.parse(WK.DatableString, "2025-01-22T18:06:08.895692Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2017-10-22T15:41:43.861883Z"),
    subject_id: 8761,
    subject_type: "radical" as const,
    srs_stage: 9,
    unlocked_at: v.parse(WK.DatableString, "2021-07-22T21:03:22.905689Z"),
    started_at: v.parse(WK.DatableString, "2021-07-30T15:11:42.594913Z"),
    passed_at: v.parse(WK.DatableString, "2021-08-01T04:32:27.017606Z"),
    burned_at: v.parse(WK.DatableString, "2022-01-20T20:03:37.269028Z"),
    available_at: null,
    resurrected_at: null,
    hidden: false,
  },
};

// Level Progressions

const levelProgression = {
  id: 188765,
  object: "level_progression" as const,
  url: "https://api.wanikani.com/v2/level_progressions/188765",
  data_updated_at: v.parse(WK.DatableString, "2017-10-31T11:18:33.036424Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2017-10-22T15:41:43.832193Z"),
    level: 1,
    unlocked_at: v.parse(WK.DatableString, "2017-10-22T15:41:43.830826Z"),
    started_at: v.parse(WK.DatableString, "2017-10-22T16:01:12.321365Z"),
    passed_at: v.parse(WK.DatableString, "2017-10-31T11:18:33.026476Z"),
    completed_at: null,
    abandoned_at: null,
  },
};

// Resets

const reset = {
  id: 5006,
  object: "reset" as const,
  url: "https://api.wanikani.com/v2/resets/5006",
  data_updated_at: v.parse(WK.DatableString, "2018-01-08T13:39:38.304561Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2018-01-08T13:37:58.223692Z"),
    original_level: 5,
    target_level: 4,
    confirmed_at: v.parse(WK.DatableString, "2018-01-08T13:39:28.083543Z"),
  },
};

// Review Statistics

const reviewStatistic = {
  id: 85040524,
  object: "review_statistic" as const,
  url: "https://api.wanikani.com/v2/review_statistics/85040524",
  data_updated_at: v.parse(WK.DatableString, "2025-01-22T18:06:07.048082Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2017-10-22T15:41:43.876100Z"),
    subject_id: 8761,
    subject_type: "radical" as const,
    meaning_correct: 8,
    meaning_incorrect: 0,
    meaning_max_streak: 8,
    meaning_current_streak: 8,
    reading_correct: 8,
    reading_incorrect: 0,
    reading_max_streak: 8,
    reading_current_streak: 8,
    percentage_correct: 100,
    hidden: false,
  },
};

// Reviews

/*
 * N.b. The Review and ReviewCollection fixtures are mock data; the Reviews endpoint is disabled as of
 * writing.
 */

const review = {
  id: 534342,
  object: "review" as const,
  url: "https://api.wanikani.com/v2/reviews/534342",
  data_updated_at: v.parse(WK.DatableString, "2017-12-20T01:00:59.255427Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2017-12-20T01:00:59.255427Z"),
    assignment_id: 32132,
    spaced_repetition_system_id: 1,
    subject_id: 8,
    starting_srs_stage: 4,
    ending_srs_stage: 2,
    incorrect_meaning_answers: 1,
    incorrect_reading_answers: 0,
  },
};

// Spaced Repetition Systems

const spacedRepetitionSystem = {
  id: 1,
  object: "spaced_repetition_system" as const,
  url: "https://api.wanikani.com/v2/spaced_repetition_systems/1",
  data_updated_at: v.parse(WK.DatableString, "2020-06-09T03:36:51.134752Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2020-05-21T20:46:06.464460Z"),
    name: "Default system for dictionary subjects",
    description: "The original spaced repetition system",
    unlocking_stage_position: 0,
    starting_stage_position: 1,
    passing_stage_position: 5,
    burning_stage_position: 9,
    stages: [
      {
        position: 0,
        interval: null,
        interval_unit: "seconds" as const,
      },
      {
        position: 1,
        interval: 14400,
        interval_unit: "seconds" as const,
      },
      {
        position: 2,
        interval: 28800,
        interval_unit: "seconds" as const,
      },
      {
        position: 3,
        interval: 82800,
        interval_unit: "seconds" as const,
      },
      {
        position: 4,
        interval: 169200,
        interval_unit: "seconds" as const,
      },
      {
        position: 5,
        interval: 601200,
        interval_unit: "seconds" as const,
      },
      {
        position: 6,
        interval: 1206000,
        interval_unit: "seconds" as const,
      },
      {
        position: 7,
        interval: 2588400,
        interval_unit: "seconds" as const,
      },
      {
        position: 8,
        interval: 10364400,
        interval_unit: "seconds" as const,
      },
      {
        position: 9,
        interval: null,
        interval_unit: "seconds" as const,
      },
    ],
  },
};

// Study Materials

const studyMaterial = {
  id: 10089088,
  object: "study_material" as const,
  url: "https://api.wanikani.com/v2/study_materials/10089088",
  data_updated_at: v.parse(WK.DatableString, "2022-10-31T15:56:51.781056Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2022-10-31T15:49:19.637077Z"),
    subject_id: 1,
    subject_type: "radical" as const,
    meaning_note: "It's one of a kind! Get it?",
    reading_note: "",
    meaning_synonyms: [],
    hidden: false,
  },
};

const emptyStudyMaterialUpdatePayload: WK.StudyMaterialUpdatePayload = {};

// Subjects

// @ts-expect-error -- Intentionally empty tuple needed a type and can't use unknown[] with vitest fixtures
const emptySubjectTuple: WK.SubjectTuple = [];

const partialSubjectTuple: WK.SubjectTuple = ["kanji"];

const fullSubjectTuple: WK.SubjectTuple = ["kana_vocabulary", "kanji", "radical", "vocabulary"];

const radical = {
  id: 1,
  object: "radical" as const,
  url: "https://api.wanikani.com/v2/subjects/1",
  data_updated_at: v.parse(WK.DatableString, "2025-01-16T17:11:09.063973Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2012-02-27T18:08:16.000000Z"),
    level: 1,
    slug: "ground",
    hidden_at: null,
    document_url: "https://www.wanikani.com/radicals/ground",
    characters: "一",
    character_images: [
      {
        url: "https://example.com",
        metadata: {
          inline_styles: true,
        },
        content_type: "image/svg+xml" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "1024x1024",
          style_name: "original",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "1024x1024",
          style_name: "1024px",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "512x512",
          style_name: "512px",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "256x256",
          style_name: "256px",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "128x128",
          style_name: "128px",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "64x64",
          style_name: "64px",
        },
        content_type: "image/png" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          color: "#000000",
          dimensions: "32x32",
          style_name: "32px",
        },
        content_type: "image/png" as const,
      },
    ],
    meanings: [
      {
        meaning: "Ground",
        primary: true,
        accepted_answer: true,
      },
    ],
    auxiliary_meanings: [],
    amalgamation_subject_ids: [
      440, 449, 450, 451, 468, 488, 531, 533, 568, 590, 609, 633, 635, 709, 710, 724, 783, 808, 885, 913, 932, 965, 971,
      1000, 1020, 1085, 1119, 1126, 1137, 1178, 1198, 1241, 1249, 1310, 1326, 1340, 1367, 1372, 1376, 1379, 1428, 1431,
      1463, 1491, 1521, 1547, 1559, 1591, 1655, 1769, 1851, 1852, 1855, 1868, 1869, 1888, 2085, 2104, 2128, 2138, 2148,
      2171, 2172, 2182, 2212, 2277, 2334, 2375, 2419, 2437,
    ],
    meaning_mnemonic: "<snip>",
    lesson_position: 0,
    spaced_repetition_system_id: 2,
  },
};

const kanji = {
  id: 440,
  object: "kanji" as const,
  url: "https://api.wanikani.com/v2/subjects/440",
  data_updated_at: v.parse(WK.DatableString, "2025-01-21T15:25:03.362576Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2012-02-27T19:55:19.000000Z"),
    level: 1,
    slug: "一",
    hidden_at: null,
    document_url: "https://www.wanikani.com/kanji/%E4%B8%80",
    characters: "一",
    meanings: [
      {
        meaning: "One",
        primary: true,
        accepted_answer: true,
      },
    ],
    auxiliary_meanings: [
      {
        meaning: "1",
        type: "whitelist" as const,
      },
    ],
    readings: [
      {
        reading: "いち",
        primary: true,
        accepted_answer: true,
        type: "onyomi" as const,
      },
      {
        reading: "いつ",
        primary: false,
        accepted_answer: true,
        type: "onyomi" as const,
      },
      {
        reading: "ひと",
        primary: false,
        accepted_answer: false,
        type: "kunyomi" as const,
      },
      {
        reading: "かず",
        primary: false,
        accepted_answer: false,
        type: "nanori" as const,
      },
    ],
    component_subject_ids: [1],
    amalgamation_subject_ids: [
      2467, 2468, 2477, 2510, 2544, 2588, 2627, 2660, 2665, 2672, 2679, 2721, 2730, 2751, 2959, 3048, 3256, 3335, 3348,
      3349, 3372, 3481, 3527, 3528, 3656, 3663, 4133, 4173, 4258, 4282, 4563, 4615, 4701, 4823, 4906, 5050, 5224, 5237,
      5349, 5362, 5838, 6010, 6029, 6150, 6169, 6209, 6210, 6346, 6584, 6614, 6723, 6811, 6851, 7037, 7293, 7305, 7451,
      7561, 7617, 7734, 7780, 7927, 8209, 8214, 8414, 8456, 8583, 8709, 8896, 8921, 9056, 9103, 9268, 9286, 9305, 9306,
      9331,
    ],
    visually_similar_subject_ids: [],
    meaning_mnemonic: "<snip>",
    meaning_hint: "<snip>",
    reading_mnemonic: "<snip>",
    reading_hint: "<snip>",
    lesson_position: 25,
    spaced_repetition_system_id: 2,
  },
};

const vocabulary = {
  id: 2467,
  object: "vocabulary" as const,
  url: "https://api.wanikani.com/v2/subjects/2467",
  data_updated_at: v.parse(WK.DatableString, "2024-10-15T22:13:34.087679Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2012-02-28T08:04:47.000000Z"),
    level: 1,
    slug: "一",
    hidden_at: null,
    document_url: "https://www.wanikani.com/vocabulary/%E4%B8%80",
    characters: "一",
    meanings: [
      {
        meaning: "One",
        primary: true,
        accepted_answer: true,
      },
    ],
    auxiliary_meanings: [
      {
        meaning: "1",
        type: "whitelist" as const,
      },
    ],
    readings: [
      {
        reading: "いち",
        primary: true,
        accepted_answer: true,
      },
    ],
    parts_of_speech: ["numeral"],
    component_subject_ids: [440],
    meaning_mnemonic: "<snip>",
    reading_mnemonic: "<snip>",
    context_sentences: [
      {
        en: "<snip>",
        ja: "<snip>",
      },
    ],
    pronunciation_audios: [
      {
        url: "https://example.com",
        metadata: {
          gender: "male" as const,
          source_id: 2711,
          pronunciation: "いち",
          voice_actor_id: 2,
          voice_actor_name: "Kenichi",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/webm" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "female" as const,
          source_id: 21630,
          pronunciation: "いち",
          voice_actor_id: 1,
          voice_actor_name: "Kyoko",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/webm" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "female" as const,
          source_id: 21630,
          pronunciation: "いち",
          voice_actor_id: 1,
          voice_actor_name: "Kyoko",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/mpeg" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "male" as const,
          source_id: 2711,
          pronunciation: "いち",
          voice_actor_id: 2,
          voice_actor_name: "Kenichi",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/mpeg" as const,
      },
    ],
    lesson_position: 43,
    spaced_repetition_system_id: 2,
  },
};

const kanaVocabulary = {
  id: 9176,
  object: "kana_vocabulary" as const,
  url: "https://api.wanikani.com/v2/subjects/9176",
  data_updated_at: v.parse(WK.DatableString, "2024-10-15T22:19:11.286457Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2022-09-14T11:39:10.684981Z"),
    level: 10,
    slug: "ちょっと",
    hidden_at: null,
    document_url: "https://www.wanikani.com/vocabulary/%E3%81%A1%E3%82%87%E3%81%A3%E3%81%A8",
    characters: "ちょっと",
    meanings: [
      {
        meaning: "A Little",
        primary: true,
        accepted_answer: true,
      },
      {
        meaning: "A Moment",
        primary: false,
        accepted_answer: true,
      },
    ],
    auxiliary_meanings: [
      {
        meaning: "A Bit",
        type: "whitelist" as const,
      },
      {
        meaning: "A Few",
        type: "whitelist" as const,
      },
      {
        meaning: "For A Moment",
        type: "whitelist" as const,
      },
      {
        meaning: "A Minute",
        type: "whitelist" as const,
      },
      {
        meaning: "For A Minute",
        type: "whitelist" as const,
      },
      {
        meaning: "Some",
        type: "whitelist" as const,
      },
    ],
    parts_of_speech: ["adverb"],
    meaning_mnemonic: "<snip>",
    context_sentences: [
      {
        en: "<snip>",
        ja: "<snip>",
      },
    ],
    pronunciation_audios: [
      {
        url: "https://example.com",
        metadata: {
          gender: "female" as const,
          source_id: 44712,
          pronunciation: "ちょっと",
          voice_actor_id: 1,
          voice_actor_name: "Kyoko",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/webm" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "female" as const,
          source_id: 44712,
          pronunciation: "ちょっと",
          voice_actor_id: 1,
          voice_actor_name: "Kyoko",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/mpeg" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "male" as const,
          source_id: 44771,
          pronunciation: "ちょっと",
          voice_actor_id: 2,
          voice_actor_name: "Kenichi",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/webm" as const,
      },
      {
        url: "https://example.com",
        metadata: {
          gender: "male" as const,
          source_id: 44771,
          pronunciation: "ちょっと",
          voice_actor_id: 2,
          voice_actor_name: "Kenichi",
          voice_description: "Tokyo accent",
        },
        content_type: "audio/mpeg" as const,
      },
    ],
    lesson_position: 59,
    spaced_repetition_system_id: 1,
  },
};

// Voice Actors

const voiceActor = {
  id: 1,
  object: "voice_actor" as const,
  url: "https://api.wanikani.com/v2/voice_actors/1",
  data_updated_at: v.parse(WK.DatableString, "2024-11-25T00:39:22.591103Z"),
  data: {
    created_at: v.parse(WK.DatableString, "2018-09-11T18:30:27.096474Z"),
    name: "Kyoko",
    gender: "female" as const,
    description: "Tokyo accent",
  },
};

export const testFor = test.extend({
  // Base
  apiRevision: "20170710" as const,
  dateTimeUtcString: "2022-10-23T15:17:38.828455Z",
  dateTimeOffsetString: "2022-10-23T15:17:38.828455+09:00",
  dateIsoString: new Date().toISOString(),
  levels: Array<number>(WK.MAX_LEVEL)
    .fill(WK.MIN_LEVEL)
    .map((item, itemIdx) => item + itemIdx),
  emptyParams,
  collectionParamsWithEmptyArrays: {
    ids: [],
  },
  collectionParamsWithManyOptions: {
    ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
  },
  collectionParamsWithDates: {
    updated_after: new Date(),
  },
  collectionParamsWithDatableStrings: {
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },
  apiError: {
    error: "Not found",
    code: 404,
  },

  // Assignments
  assignment,
  assignmentCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/assignments",
    pages: {
      per_page: 500,
      next_url: "https://api.wanikani.com/v2/assignments?page_after_id=87485638",
      previous_url: null,
    },
    total_count: 6055,
    data_updated_at: v.parse(WK.DatableString, "2025-02-15T22:19:50.167435Z"),
    data: [assignment],
  },
  assignmentParamsWithEmptyArrays: {
    ids: [],
    levels: [],
    srs_stages: [],
    subject_ids: [],
  },
  assignmentParamsWithManyOptions: {
    ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
    burned: true,
    hidden: false,
    immediately_available_for_lessons: true,
    immediately_available_for_review: false,
    in_review: true,
    levels: [1, 2, 3],
    srs_stages: [1, 2, 3],
    started: true,
    subject_ids: [1, 2, 3],
    subject_types: v.parse(WK.SubjectTuple, ["kana_vocabulary", "vocabulary"]),
    unlocked: true,
  },
  assignmentParamsWithDates: {
    available_after: new Date(),
    available_before: new Date(),
    updated_after: new Date(),
  },
  assignmentParamsWithDatableStrings: {
    available_after: v.parse(WK.DatableString, new Date().toISOString()),
    available_before: v.parse(WK.DatableString, new Date().toISOString()),
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },
  assignmentPayloadWithNoTime: {
    assignment: {},
  },
  assignmentPayloadWithDate: {
    assignment: {
      started_at: new Date(),
    },
  },
  assignmentPayloadWithDatableString: {
    assignment: {
      started_at: v.parse(WK.DatableString, "2024-12-27T15:32:23.000Z"),
    },
  },

  // Level Progressions
  levelProgression,
  levelProgressionCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/level_progressions",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 50,
    data_updated_at: v.parse(WK.DatableString, "2025-02-20T02:00:33.397409Z"),
    data: [levelProgression],
  },

  // Resets
  reset,
  resetCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/resets",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 4,
    data_updated_at: v.parse(WK.DatableString, "2021-09-06T19:05:52.132672Z"),
    data: [reset],
  },

  // Review Statistics
  reviewStatistic,
  reviewStatisticCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/review_statistics",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 5984,
    data_updated_at: v.parse(WK.DatableString, "2025-01-22T18:06:07.048082Z"),
    data: [reviewStatistic],
  },
  reviewStatisticParamsWithEmptyArrays: {
    ids: [],
    subject_ids: [],
  },
  reviewStatisticParamsWithManyOptions: {
    ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
    hidden: false,
    percentages_greater_than: 90,
    percentages_less_than: 100,
    subject_ids: [1, 2, 3],
    subject_types: v.parse(WK.SubjectTuple, ["kana_vocabulary", "vocabulary"]),
  },
  reviewStatisticParamsWithDates: {
    updated_after: new Date(),
  },
  reviewStatisticParamsWithDatableStrings: {
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },

  // Reviews
  review,
  reviewCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/reviews",
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: 1,
    data_updated_at: v.parse(WK.DatableString, "2017-12-20T01:10:17.578705Z"),
    data: [review],
  },
  reviewParamsWithEmptyArrays: {
    ids: [],
    assignment_ids: [],
    subject_ids: [],
  },
  reviewParamsWithManyOptions: {
    ids: [1, 2, 3],
    assignment_ids: [1, 2, 3],
    subject_ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
  },
  reviewParamsWithDates: {
    updated_after: new Date(),
  },
  reviewParamsWithDatableStrings: {
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },
  reviewPayloadWithAssignmentAndDate: {
    review: {
      assignment_id: 1,
      created_at: new Date(),
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  },
  reviewPayloadWithAssignmentAndDatableStrings: {
    review: {
      assignment_id: 1,
      created_at: v.parse(WK.DatableString, new Date().toISOString()),
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  },
  reviewPayloadWithSubjectAndDate: {
    review: {
      subject_id: 1,
      created_at: new Date(),
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  },
  reviewPayloadWithSubjectAndDatableStrings: {
    review: {
      subject_id: 1,
      created_at: v.parse(WK.DatableString, new Date().toISOString()),
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  },
  createdReview: {
    ...review,
    resources_updated: {
      assignment,
      review_statistic: reviewStatistic,
    },
  },

  // Spaced Repetition Systems
  spacedRepetitionSystemStageNumbers: Array<number>(WK.MAX_SRS_STAGE)
    .fill(WK.MIN_SRS_STAGE)
    .map((stage, stageIdx) => stage + stageIdx),
  spacedRepetitionSystem,
  spacedRepetitionSystemCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/spaced_repetition_systems",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 2,
    data_updated_at: v.parse(WK.DatableString, "2020-06-09T03:38:01.007395Z"),
    data: [spacedRepetitionSystem],
  },

  // Study Materials
  studyMaterial,
  studyMaterialCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/study_materials",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 3,
    data_updated_at: v.parse(WK.DatableString, "2025-01-16T17:05:46.992219Z"),
    data: [studyMaterial],
  },
  studyMaterialParamsWithEmptyArrays: {
    ids: [],
    subject_ids: [],
  },
  studyMaterialParamsWithManyOptions: {
    ids: [1, 2, 3],
    subject_ids: [1, 2, 3],
    subject_types: v.parse(WK.SubjectTuple, ["kana_vocabulary", "vocabulary"]),
    hidden: false,
    page_after_id: 1,
    page_before_id: 1,
  },
  studyMaterialParamsWithDates: {
    updated_after: new Date(),
  },
  studyMaterialParamsWithDatableStrings: {
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },
  emptyStudyMaterialUpdatePayload,
  fullStudyMaterialUpdatePayload: {
    meaning_note: "Meaning note",
    reading_note: "Reading Note",
    meaning_synonyms: ["one", "two"],
  },
  minimalStudyMaterialCreatePayload: {
    subject_id: 1,
  },
  fullStudyMaterialCreatePayload: {
    subject_id: 1,
    meaning_note: "Meaning note",
    reading_note: "Reading Note",
    meaning_synonyms: ["one", "two"],
  },

  // Subjects
  subjectTypes: ["kana_vocabulary" as const, "kanji" as const, "radical" as const, "vocabulary" as const],
  emptySubjectTuple,
  partialSubjectTuple,
  fullSubjectTuple,
  repeatedSubjectTuple: ["kana_vocabulary", "kanji", "radical", "kanji", "vocabulary", "radical"],
  radical,
  kanji,
  vocabulary,
  kanaVocabulary,
  radicalCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/subjects?types=radical",
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: 499,
    data_updated_at: v.parse(WK.DatableString, "2025-02-21T20:51:23.378189Z"),
    data: [radical],
  },
  kanjiCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/subjects?types=kanji",
    pages: {
      per_page: 1000,
      next_url: "https://api.wanikani.com/v2/subjects?page_after_id=1439&types=kanji",
      previous_url: null,
    },
    total_count: 2080,
    data_updated_at: v.parse(WK.DatableString, "2025-02-23T04:24:12.403083Z"),
    data: [kanji],
  },
  vocabularyCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/subjects?types=vocabulary",
    pages: {
      per_page: 1000,
      next_url: "https://api.wanikani.com/v2/subjects?page_after_id=3468&types=vocabulary",
      previous_url: null,
    },
    total_count: 6630,
    data_updated_at: v.parse(WK.DatableString, "2025-02-23T04:24:12.372546Z"),
    data: [vocabulary],
  },
  kanaVocabularyCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/subjects?types=kana_vocabulary",
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: 60,
    data_updated_at: v.parse(WK.DatableString, "2025-01-31T00:42:02.755193Z"),
    data: [kanaVocabulary],
  },
  subjectCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/subjects",
    pages: {
      per_page: 1000,
      next_url: "https://api.wanikani.com/v2/subjects?page_after_id=1000",
      previous_url: null,
    },
    total_count: 9269,
    data_updated_at: v.parse(WK.DatableString, "2025-02-23T04:24:12.403083Z"),
    data: [radical, kanji, vocabulary, kanaVocabulary],
  },
  subjectParamsWithEmptyArrays: {
    ids: [],
    levels: [],
    slugs: [],
  },
  subjectParamsWithManyOptions: {
    ids: [1, 2, 3],
    levels: [1, 2, 3],
    slugs: ["one", "two", "three"],
    types: v.parse(WK.SubjectTuple, ["radical", "kanji"]),
    hidden: false,
    page_after_id: 1,
    page_before_id: 1,
  },
  subjectParamsWithDates: {
    updated_after: new Date(),
  },
  subjectParamsWithDatableStrings: {
    updated_after: v.parse(WK.DatableString, new Date().toISOString()),
  },

  // Summary
  summary: {
    object: "report" as const,
    url: "https://api.wanikani.com/v2/summary",
    data_updated_at: v.parse(WK.DatableString, "2025-02-23T11:00:00.000000Z"),
    data: {
      lessons: [
        {
          available_at: v.parse(WK.DatableString, "2025-02-23T11:00:00.000000Z"),
          subject_ids: [
            1672, 5998, 5999, 5971, 5972, 5973, 6001, 6002, 5970, 5992, 5993, 5994, 9266, 6003, 6004, 6010, 5986, 5987,
            5988, 6027, 5980, 5981, 6005, 6006, 6007, 6008, 7663, 5963, 5964, 5965, 364, 1657, 1664, 6048, 1665, 6047,
            366, 1647, 365, 1670, 6040, 6581, 1645, 1649, 8862, 6034, 6041, 6029, 8556, 6031, 6038, 6042, 6033, 1667,
            6039, 1644, 1653, 1654, 1660, 1662, 1673, 6036, 1659, 1651, 1663, 1648, 1668, 1674, 6032, 6035, 6043, 6045,
            6080, 6049, 6044, 363, 395, 6046, 1655, 1661, 1650, 5966, 5967, 5968, 5969, 5956, 5957, 5958, 6037, 5996,
            5997, 2384, 1669, 1656,
          ],
        },
      ],
      next_reviews_at: v.parse(WK.DatableString, "2025-02-23T12:00:00.000000Z"),
      reviews: [
        {
          available_at: v.parse(WK.DatableString, "2025-02-23T11:00:00.000000Z"),
          subject_ids: [],
        },
        {
          available_at: v.parse(WK.DatableString, "2025-02-23T12:00:00.000000Z"),
          subject_ids: [6026, 5959, 5961, 5989, 5979, 5990, 7609, 5960, 5962, 5991],
        },
      ],
    },
  },

  // User
  lessonBatchSizeNumbers: Array<number>(WK.MAX_LESSON_BATCH_SIZE - 2)
    .fill(WK.MIN_LESSON_BATCH_SIZE)
    .map((batchSize, batchSizeIdx) => batchSize + batchSizeIdx),
  user: {
    object: "user" as const,
    url: "https://api.wanikani.com/v2/user",
    data_updated_at: v.parse(WK.DatableString, "2025-02-20T02:00:33.354445Z"),
    data: {
      id: "d5809441-e17f-4e57-acb0-6a232b714538",
      username: "BachMac",
      level: 37,
      profile_url: "https://www.wanikani.com/users/BachMac",
      started_at: v.parse(WK.DatableString, "2017-10-22T15:41:43.815029Z"),
      subscription: {
        active: true,
        type: "lifetime" as const,
        max_level_granted: 60,
        period_ends_at: null,
      },
      current_vacation_started_at: null,
      preferences: {
        lessons_autoplay_audio: false,
        lessons_batch_size: 10,
        reviews_autoplay_audio: false,
        reviews_display_srs_indicator: true,
        extra_study_autoplay_audio: false,
        reviews_presentation_order: "lower_levels_first" as const,
        lessons_presentation_order: "ascending_level_then_subject" as const,
        default_voice_actor_id: 1,
      },
    },
  },
  userPayloadWithRequiredProperties: {
    user: {
      preferences: {},
    },
  },
  userPayloadWithAllProperties: {
    user: {
      preferences: {
        default_voice_actor_id: 1,
        extra_study_autoplay_audio: false,
        lessons_autoplay_audio: false,
        lessons_batch_size: 10,
        lessons_presentation_order: "ascending_level_then_subject" as const,
        reviews_autoplay_audio: false,
        reviews_display_srs_indicator: true,
        reviews_presentation_order: "shuffled" as const,
      },
    },
  },

  // Voice Actor
  voiceActor,
  voiceActorCollection: {
    object: "collection" as const,
    url: "https://api.wanikani.com/v2/voice_actors",
    pages: {
      per_page: 500,
      next_url: null,
      previous_url: null,
    },
    total_count: 3,
    data_updated_at: v.parse(WK.DatableString, "2024-11-25T00:39:22.591103Z"),
    data: [voiceActor],
  },
});
