import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      subjectTypes.forEach((subject) => {
        assertType<WK.SubjectType>(subject);
      });
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
});

describe("SubjectTuple", () => {
  // These tests are kinda redundant, but we'll leave them here for completeness' sake
  testFor("Partial SubjectTuple is Valid", ({ partialSubjectTuple }) => {
    assertType<WK.SubjectTuple>(partialSubjectTuple);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    assertType<WK.SubjectTuple>(fullSubjectTuple);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    assertType<WK.Subject>(radical);
  });
  testFor("Real Kanji", ({ kanji }) => {
    assertType<WK.Subject>(kanji);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    assertType<WK.Subject>(vocabulary);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    assertType<WK.Subject>(kanaVocabulary);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    assertType<WK.SubjectCollection>(radicalCollection);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    assertType<WK.SubjectCollection>(kanjiCollection);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    assertType<WK.SubjectCollection>(vocabularyCollection);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    assertType<WK.SubjectCollection>(kanaVocabularyCollection);
  });
  testFor("Collection of Mixed Subjects", ({ subjectCollection }) => {
    assertType<WK.SubjectCollection>(subjectCollection);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    assertType<WK.SubjectParameters>(emptyParams);
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    assertType<WK.SubjectParameters>(subjectParamsWithEmptyArrays);
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    assertType<WK.SubjectParameters>(subjectParamsWithManyOptions);
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    assertType<WK.SubjectParameters>(subjectParamsWithDates);
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    assertType<WK.SubjectParameters>(subjectParamsWithDatableStrings);
  });
});
