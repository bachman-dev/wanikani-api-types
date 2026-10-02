import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import type * as v from "valibot";
import { describe, expectTypeOf } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

/*
 * These tests keep each schema in sync with its type definition from the types package; the type must be assignable
 * to the schema's output, and vice versa.
 */

describe("Base", () => {
  testFor("ApiRevision", () => {
    expectTypeOf<Types.ApiRevision>().toExtend<v.InferOutput<typeof WaniKani.ApiRevision>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ApiRevision>>().toExtend<Types.ApiRevision>();
  });
  testFor("SafeInteger", () => {
    expectTypeOf<Types.SafeInteger>().toExtend<v.InferOutput<typeof WaniKani.SafeInteger>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SafeInteger>>().toExtend<Types.SafeInteger>();
  });
  testFor("DatableString", () => {
    expectTypeOf<Types.DatableString>().toExtend<v.InferOutput<typeof WaniKani.DatableString>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.DatableString>>().toExtend<Types.DatableString>();
  });
  testFor("Level", () => {
    expectTypeOf<Types.Level>().toExtend<v.InferOutput<typeof WaniKani.Level>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Level>>().toExtend<Types.Level>();
  });
  testFor("BaseResource", () => {
    expectTypeOf<Types.BaseResource>().toExtend<v.InferOutput<typeof WaniKani.BaseResource>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.BaseResource>>().toExtend<Types.BaseResource>();
  });
  testFor("BaseCollection", () => {
    expectTypeOf<Types.BaseCollection>().toExtend<v.InferOutput<typeof WaniKani.BaseCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.BaseCollection>>().toExtend<Types.BaseCollection>();
  });
  testFor("CollectionParameters", () => {
    expectTypeOf<Types.CollectionParameters>().toExtend<v.InferOutput<typeof WaniKani.CollectionParameters>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.CollectionParameters>>().toExtend<Types.CollectionParameters>();
  });
  testFor("BaseReport", () => {
    expectTypeOf<Types.BaseReport>().toExtend<v.InferOutput<typeof WaniKani.BaseReport>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.BaseReport>>().toExtend<Types.BaseReport>();
  });
  testFor("ApiError", () => {
    expectTypeOf<Types.ApiError>().toExtend<v.InferOutput<typeof WaniKani.ApiError>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ApiError>>().toExtend<Types.ApiError>();
  });
});

describe("Assignments", () => {
  testFor("Assignment", () => {
    expectTypeOf<Types.Assignment>().toExtend<v.InferOutput<typeof WaniKani.Assignment>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Assignment>>().toExtend<Types.Assignment>();
  });
  testFor("AssignmentCollection", () => {
    expectTypeOf<Types.AssignmentCollection>().toExtend<v.InferOutput<typeof WaniKani.AssignmentCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.AssignmentCollection>>().toExtend<Types.AssignmentCollection>();
  });
  testFor("AssignmentParameters", () => {
    expectTypeOf<Types.AssignmentParameters>().toExtend<v.InferOutput<typeof WaniKani.AssignmentParameters>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.AssignmentParameters>>().toExtend<Types.AssignmentParameters>();
  });
  testFor("AssignmentPayload", () => {
    expectTypeOf<Types.AssignmentPayload>().toExtend<v.InferOutput<typeof WaniKani.AssignmentPayload>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.AssignmentPayload>>().toExtend<Types.AssignmentPayload>();
  });
});

describe("Level Progressions", () => {
  testFor("LevelProgression", () => {
    expectTypeOf<Types.LevelProgression>().toExtend<v.InferOutput<typeof WaniKani.LevelProgression>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.LevelProgression>>().toExtend<Types.LevelProgression>();
  });
  testFor("LevelProgressionCollection", () => {
    expectTypeOf<Types.LevelProgressionCollection>().toExtend<
      v.InferOutput<typeof WaniKani.LevelProgressionCollection>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.LevelProgressionCollection>
    >().toExtend<Types.LevelProgressionCollection>();
  });
});

describe("Resets", () => {
  testFor("Reset", () => {
    expectTypeOf<Types.Reset>().toExtend<v.InferOutput<typeof WaniKani.Reset>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Reset>>().toExtend<Types.Reset>();
  });
  testFor("ResetCollection", () => {
    expectTypeOf<Types.ResetCollection>().toExtend<v.InferOutput<typeof WaniKani.ResetCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ResetCollection>>().toExtend<Types.ResetCollection>();
  });
});

describe("Review Statistics", () => {
  testFor("ReviewStatistic", () => {
    expectTypeOf<Types.ReviewStatistic>().toExtend<v.InferOutput<typeof WaniKani.ReviewStatistic>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ReviewStatistic>>().toExtend<Types.ReviewStatistic>();
  });
  testFor("ReviewStatisticCollection", () => {
    expectTypeOf<Types.ReviewStatisticCollection>().toExtend<
      v.InferOutput<typeof WaniKani.ReviewStatisticCollection>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.ReviewStatisticCollection>
    >().toExtend<Types.ReviewStatisticCollection>();
  });
  testFor("ReviewStatisticParameters", () => {
    expectTypeOf<Types.ReviewStatisticParameters>().toExtend<
      v.InferOutput<typeof WaniKani.ReviewStatisticParameters>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.ReviewStatisticParameters>
    >().toExtend<Types.ReviewStatisticParameters>();
  });
});

describe("Reviews", () => {
  testFor("Review", () => {
    expectTypeOf<Types.Review>().toExtend<v.InferOutput<typeof WaniKani.Review>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Review>>().toExtend<Types.Review>();
  });
  testFor("ReviewCollection", () => {
    expectTypeOf<Types.ReviewCollection>().toExtend<v.InferOutput<typeof WaniKani.ReviewCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ReviewCollection>>().toExtend<Types.ReviewCollection>();
  });
  testFor("ReviewParameters", () => {
    expectTypeOf<Types.ReviewParameters>().toExtend<v.InferOutput<typeof WaniKani.ReviewParameters>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ReviewParameters>>().toExtend<Types.ReviewParameters>();
  });
  testFor("ReviewPayload", () => {
    expectTypeOf<Types.ReviewPayload>().toExtend<v.InferOutput<typeof WaniKani.ReviewPayload>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.ReviewPayload>>().toExtend<Types.ReviewPayload>();
  });
  testFor("CreatedReview", () => {
    expectTypeOf<Types.CreatedReview>().toExtend<v.InferOutput<typeof WaniKani.CreatedReview>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.CreatedReview>>().toExtend<Types.CreatedReview>();
  });
});

describe("Spaced Repetition Systems", () => {
  testFor("SpacedRepetitionSystemStageNumber", () => {
    expectTypeOf<Types.SpacedRepetitionSystemStageNumber>().toExtend<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemStageNumber>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemStageNumber>
    >().toExtend<Types.SpacedRepetitionSystemStageNumber>();
  });
  testFor("SpacedRepetitionSystemStage", () => {
    expectTypeOf<Types.SpacedRepetitionSystemStage>().toExtend<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemStage>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemStage>
    >().toExtend<Types.SpacedRepetitionSystemStage>();
  });
  testFor("SpacedRepetitionSystem", () => {
    expectTypeOf<Types.SpacedRepetitionSystem>().toExtend<v.InferOutput<typeof WaniKani.SpacedRepetitionSystem>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SpacedRepetitionSystem>>().toExtend<Types.SpacedRepetitionSystem>();
  });
  testFor("SpacedRepetitionSystemCollection", () => {
    expectTypeOf<Types.SpacedRepetitionSystemCollection>().toExtend<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemCollection>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.SpacedRepetitionSystemCollection>
    >().toExtend<Types.SpacedRepetitionSystemCollection>();
  });
});

describe("Study Materials", () => {
  testFor("StudyMaterialBaseData", () => {
    expectTypeOf<Types.StudyMaterialBaseData>().toExtend<v.InferOutput<typeof WaniKani.StudyMaterialBaseData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.StudyMaterialBaseData>>().toExtend<Types.StudyMaterialBaseData>();
  });
  testFor("StudyMaterial", () => {
    expectTypeOf<Types.StudyMaterial>().toExtend<v.InferOutput<typeof WaniKani.StudyMaterial>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.StudyMaterial>>().toExtend<Types.StudyMaterial>();
  });
  testFor("StudyMaterialCollection", () => {
    expectTypeOf<Types.StudyMaterialCollection>().toExtend<v.InferOutput<typeof WaniKani.StudyMaterialCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.StudyMaterialCollection>>().toExtend<Types.StudyMaterialCollection>();
  });
  testFor("StudyMaterialParameters", () => {
    expectTypeOf<Types.StudyMaterialParameters>().toExtend<v.InferOutput<typeof WaniKani.StudyMaterialParameters>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.StudyMaterialParameters>>().toExtend<Types.StudyMaterialParameters>();
  });
  testFor("StudyMaterialUpdatePayload", () => {
    expectTypeOf<Types.StudyMaterialUpdatePayload>().toExtend<
      v.InferOutput<typeof WaniKani.StudyMaterialUpdatePayload>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.StudyMaterialUpdatePayload>
    >().toExtend<Types.StudyMaterialUpdatePayload>();
  });
  testFor("StudyMaterialCreatePayload", () => {
    expectTypeOf<Types.StudyMaterialCreatePayload>().toExtend<
      v.InferOutput<typeof WaniKani.StudyMaterialCreatePayload>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.StudyMaterialCreatePayload>
    >().toExtend<Types.StudyMaterialCreatePayload>();
  });
});

describe("Subjects", () => {
  testFor("SubjectType", () => {
    expectTypeOf<Types.SubjectType>().toExtend<v.InferOutput<typeof WaniKani.SubjectType>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectType>>().toExtend<Types.SubjectType>();
  });
  testFor("SubjectTuple", () => {
    expectTypeOf<Types.SubjectTuple>().toExtend<v.InferOutput<typeof WaniKani.SubjectTuple>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectTuple>>().toExtend<Types.SubjectTuple>();
  });
  testFor("SubjectAuxiliaryMeaning", () => {
    expectTypeOf<Types.SubjectAuxiliaryMeaning>().toExtend<v.InferOutput<typeof WaniKani.SubjectAuxiliaryMeaning>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectAuxiliaryMeaning>>().toExtend<Types.SubjectAuxiliaryMeaning>();
  });
  testFor("SubjectMeaning", () => {
    expectTypeOf<Types.SubjectMeaning>().toExtend<v.InferOutput<typeof WaniKani.SubjectMeaning>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectMeaning>>().toExtend<Types.SubjectMeaning>();
  });
  testFor("SubjectBaseData", () => {
    expectTypeOf<Types.SubjectBaseData>().toExtend<v.InferOutput<typeof WaniKani.SubjectBaseData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectBaseData>>().toExtend<Types.SubjectBaseData>();
  });
  testFor("RadicalCharacterImage", () => {
    expectTypeOf<Types.RadicalCharacterImage>().toExtend<v.InferOutput<typeof WaniKani.RadicalCharacterImage>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.RadicalCharacterImage>>().toExtend<Types.RadicalCharacterImage>();
  });
  testFor("RadicalData", () => {
    expectTypeOf<Types.RadicalData>().toExtend<v.InferOutput<typeof WaniKani.RadicalData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.RadicalData>>().toExtend<Types.RadicalData>();
  });
  testFor("KanjiReading", () => {
    expectTypeOf<Types.KanjiReading>().toExtend<v.InferOutput<typeof WaniKani.KanjiReading>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.KanjiReading>>().toExtend<Types.KanjiReading>();
  });
  testFor("KanjiData", () => {
    expectTypeOf<Types.KanjiData>().toExtend<v.InferOutput<typeof WaniKani.KanjiData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.KanjiData>>().toExtend<Types.KanjiData>();
  });
  testFor("VocabularyContextSentence", () => {
    expectTypeOf<Types.VocabularyContextSentence>().toExtend<
      v.InferOutput<typeof WaniKani.VocabularyContextSentence>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.VocabularyContextSentence>
    >().toExtend<Types.VocabularyContextSentence>();
  });
  testFor("VocabularyPronunciationAudio", () => {
    expectTypeOf<Types.VocabularyPronunciationAudio>().toExtend<
      v.InferOutput<typeof WaniKani.VocabularyPronunciationAudio>
    >();
    expectTypeOf<
      v.InferOutput<typeof WaniKani.VocabularyPronunciationAudio>
    >().toExtend<Types.VocabularyPronunciationAudio>();
  });
  testFor("VocabularyReading", () => {
    expectTypeOf<Types.VocabularyReading>().toExtend<v.InferOutput<typeof WaniKani.VocabularyReading>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.VocabularyReading>>().toExtend<Types.VocabularyReading>();
  });
  testFor("VocabularyData", () => {
    expectTypeOf<Types.VocabularyData>().toExtend<v.InferOutput<typeof WaniKani.VocabularyData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.VocabularyData>>().toExtend<Types.VocabularyData>();
  });
  testFor("KanaVocabularyData", () => {
    expectTypeOf<Types.KanaVocabularyData>().toExtend<v.InferOutput<typeof WaniKani.KanaVocabularyData>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.KanaVocabularyData>>().toExtend<Types.KanaVocabularyData>();
  });
  testFor("Subject", () => {
    expectTypeOf<Types.Subject>().toExtend<v.InferOutput<typeof WaniKani.Subject>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Subject>>().toExtend<Types.Subject>();
  });
  testFor("SubjectCollection", () => {
    expectTypeOf<Types.SubjectCollection>().toExtend<v.InferOutput<typeof WaniKani.SubjectCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectCollection>>().toExtend<Types.SubjectCollection>();
  });
  testFor("SubjectParameters", () => {
    expectTypeOf<Types.SubjectParameters>().toExtend<v.InferOutput<typeof WaniKani.SubjectParameters>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SubjectParameters>>().toExtend<Types.SubjectParameters>();
  });
});

describe("Summary", () => {
  testFor("SummaryInterval", () => {
    expectTypeOf<Types.SummaryInterval>().toExtend<v.InferOutput<typeof WaniKani.SummaryInterval>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.SummaryInterval>>().toExtend<Types.SummaryInterval>();
  });
  testFor("Summary", () => {
    expectTypeOf<Types.Summary>().toExtend<v.InferOutput<typeof WaniKani.Summary>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.Summary>>().toExtend<Types.Summary>();
  });
});

describe("User", () => {
  testFor("LessonBatchSizeNumber", () => {
    expectTypeOf<Types.LessonBatchSizeNumber>().toExtend<v.InferOutput<typeof WaniKani.LessonBatchSizeNumber>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.LessonBatchSizeNumber>>().toExtend<Types.LessonBatchSizeNumber>();
  });
  testFor("UserPreferences", () => {
    expectTypeOf<Types.UserPreferences>().toExtend<v.InferOutput<typeof WaniKani.UserPreferences>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.UserPreferences>>().toExtend<Types.UserPreferences>();
  });
  testFor("User", () => {
    expectTypeOf<Types.User>().toExtend<v.InferOutput<typeof WaniKani.User>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.User>>().toExtend<Types.User>();
  });
  testFor("UserPreferencesPayload", () => {
    expectTypeOf<Types.UserPreferencesPayload>().toExtend<v.InferOutput<typeof WaniKani.UserPreferencesPayload>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.UserPreferencesPayload>>().toExtend<Types.UserPreferencesPayload>();
  });
});

describe("Voice Actors", () => {
  testFor("VoiceActor", () => {
    expectTypeOf<Types.VoiceActor>().toExtend<v.InferOutput<typeof WaniKani.VoiceActor>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.VoiceActor>>().toExtend<Types.VoiceActor>();
  });
  testFor("VoiceActorCollection", () => {
    expectTypeOf<Types.VoiceActorCollection>().toExtend<v.InferOutput<typeof WaniKani.VoiceActorCollection>>();
    expectTypeOf<v.InferOutput<typeof WaniKani.VoiceActorCollection>>().toExtend<Types.VoiceActorCollection>();
  });
});
