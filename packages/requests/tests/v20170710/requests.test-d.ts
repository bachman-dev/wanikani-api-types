import * as Requests from "../../src/v20170710/index.js";
import { describe, expectTypeOf } from "vitest";
import { testFor } from "./fixtures.js";

describe("ApiRequestFactory", () => {
  testFor("Return Type for Get Assignment Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.assignments.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Assignment", ({ requestFactory }) => {
    expectTypeOf(requestFactory.assignments.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Start Assignment", ({ requestFactory }) => {
    expectTypeOf(requestFactory.assignments.start(1, { assignment: {} })).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Level Progression Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.levelProgressions.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Level Progression", ({ requestFactory }) => {
    expectTypeOf(requestFactory.levelProgressions.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Reset Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.resets.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Reset", ({ requestFactory }) => {
    expectTypeOf(requestFactory.resets.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Review Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.reviews.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Review", ({ requestFactory }) => {
    expectTypeOf(requestFactory.reviews.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Create Review", ({ requestFactory }) => {
    expectTypeOf(
      requestFactory.reviews.create({
        review: {
          subject_id: 1,
          incorrect_meaning_answers: 0,
          incorrect_reading_answers: 0,
        },
      }),
    ).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Review Statistic Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.reviewStatistics.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Review Statistic", ({ requestFactory }) => {
    expectTypeOf(requestFactory.reviewStatistics.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Spaced Repetition System Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.spacedRepetitionSystems.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Spaced Repetition System", ({ requestFactory }) => {
    expectTypeOf(requestFactory.spacedRepetitionSystems.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Study Material Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.studyMaterials.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Study Material", ({ requestFactory }) => {
    expectTypeOf(requestFactory.studyMaterials.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Create Study Material", ({ requestFactory }) => {
    expectTypeOf(
      requestFactory.studyMaterials.create({
        subject_id: 123,
        meaning_note: "A note",
        reading_note: "B note",
        meaning_synonyms: ["one", "two", "three"],
      }),
    ).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Update Study Material", ({ requestFactory }) => {
    expectTypeOf(
      requestFactory.studyMaterials.update(1, {
        meaning_note: "A note",
        reading_note: "B note",
        meaning_synonyms: ["one", "two", "three"],
      }),
    ).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Subject Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.subjects.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Subject", ({ requestFactory }) => {
    expectTypeOf(requestFactory.subjects.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Summary", ({ requestFactory }) => {
    expectTypeOf(requestFactory.summary.get()).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get User", ({ requestFactory }) => {
    expectTypeOf(requestFactory.user.get()).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Update User", ({ requestFactory }) => {
    expectTypeOf(
      requestFactory.user.updatePreferences({
        user: {
          preferences: {
            default_voice_actor_id: 1,
            lessons_autoplay_audio: true,
            lessons_batch_size: 10,
          },
        },
      }),
    ).toEqualTypeOf<Requests.ApiRequest>();
  });

  testFor("Return Type for Get Voice Actor Collection", ({ requestFactory }) => {
    expectTypeOf(requestFactory.voiceActors.get({ ids: [1] })).toEqualTypeOf<Requests.ApiRequest>();
  });
  testFor("Return Type for Get Voice Actor", ({ requestFactory }) => {
    expectTypeOf(requestFactory.voiceActors.get(1)).toEqualTypeOf<Requests.ApiRequest>();
  });
});
