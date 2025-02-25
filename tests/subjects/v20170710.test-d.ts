import type {
  Subject,
  SubjectCollection,
  SubjectParameters,
  SubjectTuple,
  SubjectType,
} from "../../src/subjects/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      subjectTypes.forEach((subject) => {
        assertType<SubjectType>(subject);
      });
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
});

describe("SubjectTuple", () => {
  // These tests are kinda redundant, but we'll leave them here for completeness' sake
  testFor("Partial SubjectTuple is Valid", ({ partialSubjectTuple }) => {
    assertType<SubjectTuple>(partialSubjectTuple);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    assertType<SubjectTuple>(fullSubjectTuple);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    assertType<Subject>(radical);
  });
  testFor("Real Kanji", ({ kanji }) => {
    assertType<Subject>(kanji);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    assertType<Subject>(vocabulary);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    assertType<Subject>(kanaVocabulary);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    assertType<SubjectCollection>(radicalCollection);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    assertType<SubjectCollection>(kanjiCollection);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    assertType<SubjectCollection>(vocabularyCollection);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    assertType<SubjectCollection>(kanaVocabularyCollection);
  });
  testFor("Collection of Mixed Subjects", ({ subjectCollection }) => {
    assertType<SubjectCollection>(subjectCollection);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    assertType<SubjectParameters>(emptyParams);
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    assertType<SubjectParameters>(subjectParamsWithEmptyArrays);
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    assertType<SubjectParameters>(subjectParamsWithManyOptions);
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    assertType<SubjectParameters>(subjectParamsWithDates);
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    assertType<SubjectParameters>(subjectParamsWithDatableStrings);
  });
});
