import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import type * as z from "zod/v4/core";
import { describe, expectTypeOf } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

/*
 * These tests keep each schema in sync with its type definition from the types package; the type must be assignable
 * to the schema's output, and vice versa.
 */

describe("Base", () => {
  testFor("ApiRevision", () => {
    expectTypeOf<Types.ApiRevision>().toExtend<z.output<typeof WaniKani.ApiRevision>>();
    expectTypeOf<z.output<typeof WaniKani.ApiRevision>>().toExtend<Types.ApiRevision>();
  });
  testFor("SafeInteger", () => {
    expectTypeOf<Types.SafeInteger>().toExtend<z.output<typeof WaniKani.SafeInteger>>();
    expectTypeOf<z.output<typeof WaniKani.SafeInteger>>().toExtend<Types.SafeInteger>();
  });
  testFor("DatableString", () => {
    expectTypeOf<Types.DatableString>().toExtend<z.output<typeof WaniKani.DatableString>>();
    expectTypeOf<z.output<typeof WaniKani.DatableString>>().toExtend<Types.DatableString>();
  });
  testFor("Level", () => {
    expectTypeOf<Types.Level>().toExtend<z.output<typeof WaniKani.Level>>();
    expectTypeOf<z.output<typeof WaniKani.Level>>().toExtend<Types.Level>();
  });
  testFor("BaseResource", () => {
    expectTypeOf<Types.BaseResource>().toExtend<z.output<typeof WaniKani.BaseResource>>();
    expectTypeOf<z.output<typeof WaniKani.BaseResource>>().toExtend<Types.BaseResource>();
  });
  testFor("BaseCollection", () => {
    expectTypeOf<Types.BaseCollection>().toExtend<z.output<typeof WaniKani.BaseCollection>>();
    expectTypeOf<z.output<typeof WaniKani.BaseCollection>>().toExtend<Types.BaseCollection>();
  });
  testFor("CollectionParameters", () => {
    expectTypeOf<Types.CollectionParameters>().toExtend<z.output<typeof WaniKani.CollectionParameters>>();
    expectTypeOf<z.output<typeof WaniKani.CollectionParameters>>().toExtend<Types.CollectionParameters>();
  });
  testFor("BaseReport", () => {
    expectTypeOf<Types.BaseReport>().toExtend<z.output<typeof WaniKani.BaseReport>>();
    expectTypeOf<z.output<typeof WaniKani.BaseReport>>().toExtend<Types.BaseReport>();
  });
  testFor("ApiError", () => {
    expectTypeOf<Types.ApiError>().toExtend<z.output<typeof WaniKani.ApiError>>();
    expectTypeOf<z.output<typeof WaniKani.ApiError>>().toExtend<Types.ApiError>();
  });
});

describe("Assignments", () => {
  testFor("Assignment", () => {
    expectTypeOf<Types.Assignment>().toExtend<z.output<typeof WaniKani.Assignment>>();
    expectTypeOf<z.output<typeof WaniKani.Assignment>>().toExtend<Types.Assignment>();
  });
  testFor("AssignmentCollection", () => {
    expectTypeOf<Types.AssignmentCollection>().toExtend<z.output<typeof WaniKani.AssignmentCollection>>();
    expectTypeOf<z.output<typeof WaniKani.AssignmentCollection>>().toExtend<Types.AssignmentCollection>();
  });
  testFor("AssignmentParameters", () => {
    expectTypeOf<Types.AssignmentParameters>().toExtend<z.output<typeof WaniKani.AssignmentParameters>>();
    expectTypeOf<z.output<typeof WaniKani.AssignmentParameters>>().toExtend<Types.AssignmentParameters>();
  });
  testFor("AssignmentPayload", () => {
    expectTypeOf<Types.AssignmentPayload>().toExtend<z.output<typeof WaniKani.AssignmentPayload>>();
    expectTypeOf<z.output<typeof WaniKani.AssignmentPayload>>().toExtend<Types.AssignmentPayload>();
  });
});

describe("Level Progressions", () => {
  testFor("LevelProgression", () => {
    expectTypeOf<Types.LevelProgression>().toExtend<z.output<typeof WaniKani.LevelProgression>>();
    expectTypeOf<z.output<typeof WaniKani.LevelProgression>>().toExtend<Types.LevelProgression>();
  });
  testFor("LevelProgressionCollection", () => {
    expectTypeOf<Types.LevelProgressionCollection>().toExtend<z.output<typeof WaniKani.LevelProgressionCollection>>();
    expectTypeOf<z.output<typeof WaniKani.LevelProgressionCollection>>().toExtend<Types.LevelProgressionCollection>();
  });
});

describe("Resets", () => {
  testFor("Reset", () => {
    expectTypeOf<Types.Reset>().toExtend<z.output<typeof WaniKani.Reset>>();
    expectTypeOf<z.output<typeof WaniKani.Reset>>().toExtend<Types.Reset>();
  });
  testFor("ResetCollection", () => {
    expectTypeOf<Types.ResetCollection>().toExtend<z.output<typeof WaniKani.ResetCollection>>();
    expectTypeOf<z.output<typeof WaniKani.ResetCollection>>().toExtend<Types.ResetCollection>();
  });
});

describe("Review Statistics", () => {
  testFor("ReviewStatistic", () => {
    expectTypeOf<Types.ReviewStatistic>().toExtend<z.output<typeof WaniKani.ReviewStatistic>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewStatistic>>().toExtend<Types.ReviewStatistic>();
  });
  testFor("ReviewStatisticCollection", () => {
    expectTypeOf<Types.ReviewStatisticCollection>().toExtend<z.output<typeof WaniKani.ReviewStatisticCollection>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewStatisticCollection>>().toExtend<Types.ReviewStatisticCollection>();
  });
  testFor("ReviewStatisticParameters", () => {
    expectTypeOf<Types.ReviewStatisticParameters>().toExtend<z.output<typeof WaniKani.ReviewStatisticParameters>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewStatisticParameters>>().toExtend<Types.ReviewStatisticParameters>();
  });
});

describe("Reviews", () => {
  testFor("Review", () => {
    expectTypeOf<Types.Review>().toExtend<z.output<typeof WaniKani.Review>>();
    expectTypeOf<z.output<typeof WaniKani.Review>>().toExtend<Types.Review>();
  });
  testFor("ReviewCollection", () => {
    expectTypeOf<Types.ReviewCollection>().toExtend<z.output<typeof WaniKani.ReviewCollection>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewCollection>>().toExtend<Types.ReviewCollection>();
  });
  testFor("ReviewParameters", () => {
    expectTypeOf<Types.ReviewParameters>().toExtend<z.output<typeof WaniKani.ReviewParameters>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewParameters>>().toExtend<Types.ReviewParameters>();
  });
  testFor("ReviewPayload", () => {
    expectTypeOf<Types.ReviewPayload>().toExtend<z.output<typeof WaniKani.ReviewPayload>>();
    expectTypeOf<z.output<typeof WaniKani.ReviewPayload>>().toExtend<Types.ReviewPayload>();
  });
  testFor("CreatedReview", () => {
    expectTypeOf<Types.CreatedReview>().toExtend<z.output<typeof WaniKani.CreatedReview>>();
    expectTypeOf<z.output<typeof WaniKani.CreatedReview>>().toExtend<Types.CreatedReview>();
  });
});

describe("Spaced Repetition Systems", () => {
  testFor("SpacedRepetitionSystemStageNumber", () => {
    expectTypeOf<Types.SpacedRepetitionSystemStageNumber>().toExtend<
      z.output<typeof WaniKani.SpacedRepetitionSystemStageNumber>
    >();
    expectTypeOf<
      z.output<typeof WaniKani.SpacedRepetitionSystemStageNumber>
    >().toExtend<Types.SpacedRepetitionSystemStageNumber>();
  });
  testFor("SpacedRepetitionSystemStage", () => {
    expectTypeOf<Types.SpacedRepetitionSystemStage>().toExtend<z.output<typeof WaniKani.SpacedRepetitionSystemStage>>();
    expectTypeOf<z.output<typeof WaniKani.SpacedRepetitionSystemStage>>().toExtend<Types.SpacedRepetitionSystemStage>();
  });
  testFor("SpacedRepetitionSystem", () => {
    expectTypeOf<Types.SpacedRepetitionSystem>().toExtend<z.output<typeof WaniKani.SpacedRepetitionSystem>>();
    expectTypeOf<z.output<typeof WaniKani.SpacedRepetitionSystem>>().toExtend<Types.SpacedRepetitionSystem>();
  });
  testFor("SpacedRepetitionSystemCollection", () => {
    expectTypeOf<Types.SpacedRepetitionSystemCollection>().toExtend<
      z.output<typeof WaniKani.SpacedRepetitionSystemCollection>
    >();
    expectTypeOf<
      z.output<typeof WaniKani.SpacedRepetitionSystemCollection>
    >().toExtend<Types.SpacedRepetitionSystemCollection>();
  });
});

describe("Study Materials", () => {
  testFor("StudyMaterialBaseData", () => {
    expectTypeOf<Types.StudyMaterialBaseData>().toExtend<z.output<typeof WaniKani.StudyMaterialBaseData>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterialBaseData>>().toExtend<Types.StudyMaterialBaseData>();
  });
  testFor("StudyMaterial", () => {
    expectTypeOf<Types.StudyMaterial>().toExtend<z.output<typeof WaniKani.StudyMaterial>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterial>>().toExtend<Types.StudyMaterial>();
  });
  testFor("StudyMaterialCollection", () => {
    expectTypeOf<Types.StudyMaterialCollection>().toExtend<z.output<typeof WaniKani.StudyMaterialCollection>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterialCollection>>().toExtend<Types.StudyMaterialCollection>();
  });
  testFor("StudyMaterialParameters", () => {
    expectTypeOf<Types.StudyMaterialParameters>().toExtend<z.output<typeof WaniKani.StudyMaterialParameters>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterialParameters>>().toExtend<Types.StudyMaterialParameters>();
  });
  testFor("StudyMaterialUpdatePayload", () => {
    expectTypeOf<Types.StudyMaterialUpdatePayload>().toExtend<z.output<typeof WaniKani.StudyMaterialUpdatePayload>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterialUpdatePayload>>().toExtend<Types.StudyMaterialUpdatePayload>();
  });
  testFor("StudyMaterialCreatePayload", () => {
    expectTypeOf<Types.StudyMaterialCreatePayload>().toExtend<z.output<typeof WaniKani.StudyMaterialCreatePayload>>();
    expectTypeOf<z.output<typeof WaniKani.StudyMaterialCreatePayload>>().toExtend<Types.StudyMaterialCreatePayload>();
  });
});

describe("Subjects", () => {
  testFor("SubjectType", () => {
    expectTypeOf<Types.SubjectType>().toExtend<z.output<typeof WaniKani.SubjectType>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectType>>().toExtend<Types.SubjectType>();
  });
  testFor("SubjectTuple", () => {
    expectTypeOf<Types.SubjectTuple>().toExtend<z.output<typeof WaniKani.SubjectTuple>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectTuple>>().toExtend<Types.SubjectTuple>();
  });
  testFor("SubjectAuxiliaryMeaning", () => {
    expectTypeOf<Types.SubjectAuxiliaryMeaning>().toExtend<z.output<typeof WaniKani.SubjectAuxiliaryMeaning>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectAuxiliaryMeaning>>().toExtend<Types.SubjectAuxiliaryMeaning>();
  });
  testFor("SubjectMeaning", () => {
    expectTypeOf<Types.SubjectMeaning>().toExtend<z.output<typeof WaniKani.SubjectMeaning>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectMeaning>>().toExtend<Types.SubjectMeaning>();
  });
  testFor("SubjectBaseData", () => {
    expectTypeOf<Types.SubjectBaseData>().toExtend<z.output<typeof WaniKani.SubjectBaseData>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectBaseData>>().toExtend<Types.SubjectBaseData>();
  });
  testFor("RadicalCharacterImage", () => {
    expectTypeOf<Types.RadicalCharacterImage>().toExtend<z.output<typeof WaniKani.RadicalCharacterImage>>();
    expectTypeOf<z.output<typeof WaniKani.RadicalCharacterImage>>().toExtend<Types.RadicalCharacterImage>();
  });
  testFor("RadicalData", () => {
    expectTypeOf<Types.RadicalData>().toExtend<z.output<typeof WaniKani.RadicalData>>();
    expectTypeOf<z.output<typeof WaniKani.RadicalData>>().toExtend<Types.RadicalData>();
  });
  testFor("KanjiReading", () => {
    expectTypeOf<Types.KanjiReading>().toExtend<z.output<typeof WaniKani.KanjiReading>>();
    expectTypeOf<z.output<typeof WaniKani.KanjiReading>>().toExtend<Types.KanjiReading>();
  });
  testFor("KanjiData", () => {
    expectTypeOf<Types.KanjiData>().toExtend<z.output<typeof WaniKani.KanjiData>>();
    expectTypeOf<z.output<typeof WaniKani.KanjiData>>().toExtend<Types.KanjiData>();
  });
  testFor("VocabularyContextSentence", () => {
    expectTypeOf<Types.VocabularyContextSentence>().toExtend<z.output<typeof WaniKani.VocabularyContextSentence>>();
    expectTypeOf<z.output<typeof WaniKani.VocabularyContextSentence>>().toExtend<Types.VocabularyContextSentence>();
  });
  testFor("VocabularyPronunciationAudio", () => {
    expectTypeOf<Types.VocabularyPronunciationAudio>().toExtend<
      z.output<typeof WaniKani.VocabularyPronunciationAudio>
    >();
    expectTypeOf<
      z.output<typeof WaniKani.VocabularyPronunciationAudio>
    >().toExtend<Types.VocabularyPronunciationAudio>();
  });
  testFor("VocabularyReading", () => {
    expectTypeOf<Types.VocabularyReading>().toExtend<z.output<typeof WaniKani.VocabularyReading>>();
    expectTypeOf<z.output<typeof WaniKani.VocabularyReading>>().toExtend<Types.VocabularyReading>();
  });
  testFor("VocabularyData", () => {
    expectTypeOf<Types.VocabularyData>().toExtend<z.output<typeof WaniKani.VocabularyData>>();
    expectTypeOf<z.output<typeof WaniKani.VocabularyData>>().toExtend<Types.VocabularyData>();
  });
  testFor("KanaVocabularyData", () => {
    expectTypeOf<Types.KanaVocabularyData>().toExtend<z.output<typeof WaniKani.KanaVocabularyData>>();
    expectTypeOf<z.output<typeof WaniKani.KanaVocabularyData>>().toExtend<Types.KanaVocabularyData>();
  });
  testFor("Subject", () => {
    expectTypeOf<Types.Subject>().toExtend<z.output<typeof WaniKani.Subject>>();
    expectTypeOf<z.output<typeof WaniKani.Subject>>().toExtend<Types.Subject>();
  });
  testFor("SubjectCollection", () => {
    expectTypeOf<Types.SubjectCollection>().toExtend<z.output<typeof WaniKani.SubjectCollection>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectCollection>>().toExtend<Types.SubjectCollection>();
  });
  testFor("SubjectParameters", () => {
    expectTypeOf<Types.SubjectParameters>().toExtend<z.output<typeof WaniKani.SubjectParameters>>();
    expectTypeOf<z.output<typeof WaniKani.SubjectParameters>>().toExtend<Types.SubjectParameters>();
  });
});

describe("Summary", () => {
  testFor("SummaryInterval", () => {
    expectTypeOf<Types.SummaryInterval>().toExtend<z.output<typeof WaniKani.SummaryInterval>>();
    expectTypeOf<z.output<typeof WaniKani.SummaryInterval>>().toExtend<Types.SummaryInterval>();
  });
  testFor("Summary", () => {
    expectTypeOf<Types.Summary>().toExtend<z.output<typeof WaniKani.Summary>>();
    expectTypeOf<z.output<typeof WaniKani.Summary>>().toExtend<Types.Summary>();
  });
});

describe("User", () => {
  testFor("LessonBatchSizeNumber", () => {
    expectTypeOf<Types.LessonBatchSizeNumber>().toExtend<z.output<typeof WaniKani.LessonBatchSizeNumber>>();
    expectTypeOf<z.output<typeof WaniKani.LessonBatchSizeNumber>>().toExtend<Types.LessonBatchSizeNumber>();
  });
  testFor("UserPreferences", () => {
    expectTypeOf<Types.UserPreferences>().toExtend<z.output<typeof WaniKani.UserPreferences>>();
    expectTypeOf<z.output<typeof WaniKani.UserPreferences>>().toExtend<Types.UserPreferences>();
  });
  testFor("User", () => {
    expectTypeOf<Types.User>().toExtend<z.output<typeof WaniKani.User>>();
    expectTypeOf<z.output<typeof WaniKani.User>>().toExtend<Types.User>();
  });
  testFor("UserPreferencesPayload", () => {
    expectTypeOf<Types.UserPreferencesPayload>().toExtend<z.output<typeof WaniKani.UserPreferencesPayload>>();
    expectTypeOf<z.output<typeof WaniKani.UserPreferencesPayload>>().toExtend<Types.UserPreferencesPayload>();
  });
});

describe("Voice Actors", () => {
  testFor("VoiceActor", () => {
    expectTypeOf<Types.VoiceActor>().toExtend<z.output<typeof WaniKani.VoiceActor>>();
    expectTypeOf<z.output<typeof WaniKani.VoiceActor>>().toExtend<Types.VoiceActor>();
  });
  testFor("VoiceActorCollection", () => {
    expectTypeOf<Types.VoiceActorCollection>().toExtend<z.output<typeof WaniKani.VoiceActorCollection>>();
    expectTypeOf<z.output<typeof WaniKani.VoiceActorCollection>>().toExtend<Types.VoiceActorCollection>();
  });
});
