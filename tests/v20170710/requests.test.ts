import * as WK from "../../src/v20170710/index.js";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("ApiRequestFactory", () => {
  const getOptions: WK.ApiRequestOptions = {
    customHeaders: {
      "x-forwarded-for": "192.168.1.1",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    },
  };

  const putPostOptions: WK.ApiRequestOptions = {
    customHeaders: {
      "x-forwarded-for": "192.168.1.1",
    },
  };

  testFor("Returns GET request for an Assignment Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/assignments";
    const expectedUrl2 = "https://api.wanikani.com/v2/assignments?unlocked=true&hidden=false";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.AssignmentParameters = {
      unlocked: true,
      hidden: false,
    };

    const request1 = requestFactory.assignments.get({}, getOptions);
    const request2 = requestFactory.assignments.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for an Assignment", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/assignments/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.assignments.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns PUT request for starting an Assignment", ({ requestFactory }) => {
    const expectedMethod = "PUT";
    const expectedUrl = "https://api.wanikani.com/v2/assignments/123/start";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = `{"assignment":{"started_at":"2023-02-04T15:30:00.000Z"}}`;

    const payload: WK.AssignmentPayload = {
      assignment: {
        started_at: new Date("2023-02-04T15:30:00.000Z"),
      },
    };

    const request = requestFactory.assignments.start(123, payload, putPostOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Level Progression Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/level_progressions";
    const expectedUrl2 =
      "https://api.wanikani.com/v2/level_progressions?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.LevelProgressionParameters = {
      ids: [1, 2, 3],
      updated_after: new Date("2023-03-01T12:00:00.000Z"),
    };

    const request1 = requestFactory.levelProgressions.get({}, getOptions);
    const request2 = requestFactory.levelProgressions.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Level Progression", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/level_progressions/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.levelProgressions.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Reset Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/resets";
    const expectedUrl2 = "https://api.wanikani.com/v2/resets?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.ResetParameters = {
      ids: [1, 2, 3],
      updated_after: new Date("2023-03-01T12:00:00.000Z"),
    };

    const request1 = requestFactory.resets.get({}, getOptions);
    const request2 = requestFactory.resets.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Reset", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/resets/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.resets.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Review Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/reviews";
    const expectedUrl2 = "https://api.wanikani.com/v2/reviews?assignment_ids=1,2,3&subject_ids=4,5,6";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.ReviewParameters = {
      assignment_ids: [1, 2, 3],
      subject_ids: [4, 5, 6],
    };

    const request1 = requestFactory.reviews.get({}, getOptions);
    const request2 = requestFactory.reviews.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Review", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/reviews/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.reviews.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns POST request for creating a Review", ({ requestFactory }) => {
    const expectedMethod = "POST";
    const expectedUrl = "https://api.wanikani.com/v2/reviews";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = `{"review":{"subject_id":123,"incorrect_meaning_answers":0,"incorrect_reading_answers":0}}`;

    const payload: WK.ReviewPayload = {
      review: {
        subject_id: 123,
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };

    const request = requestFactory.reviews.create(payload, putPostOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Review Statistic Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/review_statistics";
    const expectedUrl2 = "https://api.wanikani.com/v2/review_statistics?subject_ids=1,2,3&percentages_greater_than=90";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.ReviewStatisticParameters = {
      subject_ids: [1, 2, 3],
      percentages_greater_than: 90,
    };

    const request1 = requestFactory.reviewStatistics.get({}, getOptions);
    const request2 = requestFactory.reviewStatistics.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Review Statistic", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/review_statistics/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.reviewStatistics.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Spaced Repetition System Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/spaced_repetition_systems";
    const expectedUrl2 =
      "https://api.wanikani.com/v2/spaced_repetition_systems?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.SpacedRepetitionSystemParameters = {
      ids: [1, 2, 3],
      updated_after: new Date("2023-03-01T12:00:00.000Z"),
    };

    const request1 = requestFactory.spacedRepetitionSystems.get({}, getOptions);
    const request2 = requestFactory.spacedRepetitionSystems.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Spaced Repetition System", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/spaced_repetition_systems/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request1 = requestFactory.spacedRepetitionSystems.get(123);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl);
    expect(request1.headers).toStrictEqual(expectedHeaders);
    expect(request1.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Study Material Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/study_materials";
    const expectedUrl2 = "https://api.wanikani.com/v2/study_materials?subject_ids=1,2,3&subject_types=kanji";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.StudyMaterialParameters = {
      subject_ids: [1, 2, 3],
      subject_types: ["kanji"],
    };

    const request1 = requestFactory.studyMaterials.get({}, getOptions);
    const request2 = requestFactory.studyMaterials.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Study Material", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/study_materials/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.studyMaterials.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns POST request for creating a Study Material", ({ requestFactory }) => {
    const expectedMethod = "POST";
    const expectedUrl = "https://api.wanikani.com/v2/study_materials";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = `{"subject_id":123,"meaning_note":"A note","reading_note":"B note","meaning_synonyms":["one","two","three"]}`;

    const payload: WK.StudyMaterialCreatePayload = {
      subject_id: 123,
      meaning_note: "A note",
      reading_note: "B note",
      meaning_synonyms: ["one", "two", "three"],
    };

    const request = requestFactory.studyMaterials.create(payload, putPostOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns PUT request for updating a Study Material", ({ requestFactory }) => {
    const expectedMethod = "PUT";
    const expectedUrl = "https://api.wanikani.com/v2/study_materials/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = `{"meaning_note":"A note","reading_note":"B note","meaning_synonyms":["one","two","three"]}`;

    const payload: WK.StudyMaterialUpdatePayload = {
      meaning_note: "A note",
      reading_note: "B note",
      meaning_synonyms: ["one", "two", "three"],
    };

    const request = requestFactory.studyMaterials.update(123, payload, putPostOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Subject Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/subjects";
    const expectedUrl2 = "https://api.wanikani.com/v2/subjects?types=radical,kanji&levels=1,2,3";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.SubjectParameters = {
      types: ["radical", "kanji"],
      levels: [1, 2, 3],
    };

    const request1 = requestFactory.subjects.get({}, getOptions);
    const request2 = requestFactory.subjects.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Subject", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/subjects/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.subjects.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Summary", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/summary";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = null;

    const request = requestFactory.summary.get(getOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a User", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/user";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = null;

    const request = requestFactory.user.get(getOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns PUT request for updating a User", ({ requestFactory }) => {
    const expectedMethod = "PUT";
    const expectedUrl = "https://api.wanikani.com/v2/user";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "content-type": "application/json",
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedBody = `{"user":{"preferences":{"default_voice_actor_id":1,"lessons_autoplay_audio":true,"lessons_batch_size":10}}}`;

    const payload: WK.UserPreferencesPayload = {
      user: {
        preferences: {
          default_voice_actor_id: 1,
          lessons_autoplay_audio: true,
          lessons_batch_size: 10,
        },
      },
    };

    const request = requestFactory.user.updatePreferences(payload, putPostOptions);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Voice Actor Collection", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl1 = "https://api.wanikani.com/v2/voice_actors";
    const expectedUrl2 = "https://api.wanikani.com/v2/voice_actors?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
    const expectedHeaders1 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
      "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
      "x-forwarded-for": "192.168.1.1",
    };
    const expectedHeaders2 = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const params: WK.VoiceActorParameters = {
      ids: [1, 2, 3],
      updated_after: new Date("2023-03-01T12:00:00.000Z"),
    };

    const request1 = requestFactory.voiceActors.get({}, getOptions);
    const request2 = requestFactory.voiceActors.get(params);

    expect(request1.method).toBe(expectedMethod);
    expect(request1.url).toBe(expectedUrl1);
    expect(request1.headers).toStrictEqual(expectedHeaders1);
    expect(request1.body).toBe(expectedBody);

    expect(request2.method).toBe(expectedMethod);
    expect(request2.url).toBe(expectedUrl2);
    expect(request2.headers).toStrictEqual(expectedHeaders2);
    expect(request2.body).toBe(expectedBody);
  });

  testFor("Returns GET request for a Voice Actor", ({ requestFactory }) => {
    const expectedMethod = "GET";
    const expectedUrl = "https://api.wanikani.com/v2/voice_actors/123";
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
    };
    const expectedBody = null;

    const request = requestFactory.voiceActors.get(123);

    expect(request.method).toBe(expectedMethod);
    expect(request.url).toBe(expectedUrl);
    expect(request.headers).toStrictEqual(expectedHeaders);
    expect(request.body).toBe(expectedBody);
  });

  testFor("Changes API Token using setApiToken()", () => {
    const expectedHeaders = {
      authorization: "Bearer def",
      "wanikani-revision": "20170710",
    };

    const factory = new WK.ApiRequestFactory({ apiToken: "abc" });
    const request = factory.setApiToken("def").assignments.get(123);
    expect(request.headers).toStrictEqual(expectedHeaders);
  });

  testFor("Changes API Revision with setApiRevision()", () => {
    const factory = new WK.ApiRequestFactory({ apiToken: "abc" });
    expect(() => factory.setApiRevision("20170710")).not.toThrow();
  });

  testFor("Throws when trying to set invalid API Revision", () => {
    const factory = new WK.ApiRequestFactory({ apiToken: "abc" });
    // @ts-expect-error -- Setting an invalid API Revision
    expect(() => factory.setApiRevision("20990909")).toThrow();
  });

  testFor("Adds any new headers to requests using addCustomHeaders()", () => {
    const customHeaders1 = {
      "x-forwarded-for": "192.168.1.1",
    };
    const customHeaders2 = {
      "X-Proxy-Token": "def",
    };
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "x-forwarded-for": "192.168.1.1",
      "X-Proxy-Token": "def",
    };
    const factory = new WK.ApiRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
    const request = factory.addCustomHeaders(customHeaders2).assignments.get(123);
    expect(request.headers).toStrictEqual(expectedHeaders);
  });

  testFor("Replaces custom headers only wtesth setCustomHeaders()", () => {
    const customHeaders1 = {
      "x-forwarded-for": "192.168.1.1",
    };
    const customHeaders2 = {
      "X-Proxy-Token": "def",
    };
    const expectedHeaders = {
      authorization: "Bearer abc",
      "wanikani-revision": "20170710",
      "X-Proxy-Token": "def",
    };
    const factory = new WK.ApiRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
    const request = factory.setCustomHeaders(customHeaders2).assignments.get(123);
    expect(request.headers).toStrictEqual(expectedHeaders);
  });

  testFor("Throws when trying to set type-checked headers", () => {
    const factory = new WK.ApiRequestFactory({ apiToken: "abc" });
    expect(() => factory.addCustomHeaders({ authorization: "Cheese" })).toThrow(
      "WaniKani API Token should be set via setApiToken() method.",
    );
    expect(() => factory.addCustomHeaders({ "wanikani-revision": "Cheese" })).toThrow(
      "WaniKani API Revision should be set via setApiRevision() method.",
    );
    expect(() => factory.addCustomHeaders({ Accept: "Cheese" })).toThrow(
      `The "Accept" header must be set to "application/json`,
    );
    expect(() => factory.addCustomHeaders({ "content-type": "Cheese" })).toThrow(
      `The "content-type" header must be set to "application/json`,
    );
  });
});
