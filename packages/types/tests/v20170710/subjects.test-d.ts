import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      for (const subject of subjectTypes) {
        assertType<WaniKani.SubjectType>(subject);
      }
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
});

describe("SubjectTuple", () => {
  // These tests are kinda redundant, but we'll leave them here for completeness' sake
  testFor("Partial SubjectTuple is Valid", ({ partialSubjectTuple }) => {
    assertType<WaniKani.SubjectTuple>(partialSubjectTuple);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    assertType<WaniKani.SubjectTuple>(fullSubjectTuple);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    assertType<WaniKani.Subject>(radical);
  });
  testFor("Real Kanji", ({ kanji }) => {
    assertType<WaniKani.Subject>(kanji);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    assertType<WaniKani.Subject>(vocabulary);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    assertType<WaniKani.Subject>(kanaVocabulary);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    assertType<WaniKani.SubjectCollection>(radicalCollection);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    assertType<WaniKani.SubjectCollection>(kanjiCollection);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    assertType<WaniKani.SubjectCollection>(vocabularyCollection);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    assertType<WaniKani.SubjectCollection>(kanaVocabularyCollection);
  });
  testFor("Collection of Mixed Subjects", ({ subjectCollection }) => {
    assertType<WaniKani.SubjectCollection>(subjectCollection);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    assertType<WaniKani.SubjectParameters>(emptyParams);
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    assertType<WaniKani.SubjectParameters>(subjectParamsWithEmptyArrays);
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    assertType<WaniKani.SubjectParameters>(subjectParamsWithManyOptions);
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    assertType<WaniKani.SubjectParameters>(subjectParamsWithDates);
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    assertType<WaniKani.SubjectParameters>(subjectParamsWithDatableStrings);
  });
});
