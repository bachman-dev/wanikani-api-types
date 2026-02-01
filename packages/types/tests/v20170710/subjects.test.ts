import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      subjectTypes.forEach((subject) => {
        expect(() => v.assert(WK.SubjectType, subject)).not.toThrow();
        expect(WK.isSubjectType(subject)).toBe(true);
      });
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
  testFor("Invalid Subject Type", () => {
    expect(() => v.assert(WK.SubjectType, "not real")).toThrow();
    expect(WK.isSubjectType("not real")).toBe(false);
  });
});

describe("SubjectTuple", () => {
  testFor("Empty SubjectTuple throws error", ({ emptySubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, emptySubjectTuple)).toThrow();
    expect(WK.isSubjectTuple(emptySubjectTuple)).toBe(false);
  });
  testFor("Partial SubjectTuple is valid", ({ partialSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, partialSubjectTuple)).not.toThrow();
    expect(WK.isSubjectTuple(partialSubjectTuple)).toBe(true);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, fullSubjectTuple)).not.toThrow();
    expect(WK.isSubjectTuple(fullSubjectTuple)).toBe(true);
  });
  testFor("SubjectTuple with repeated items throws error", ({ repeatedSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, repeatedSubjectTuple)).toThrow();
    expect(WK.isSubjectTuple(repeatedSubjectTuple)).toBe(false);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    expect(() => v.assert(WK.Subject, radical)).not.toThrow();
    expect(WK.isSubject(radical)).toBe(true);
  });
  testFor("Real Kanji", ({ kanji }) => {
    expect(() => v.assert(WK.Subject, kanji)).not.toThrow();
    expect(WK.isSubject(kanji)).toBe(true);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    expect(() => v.assert(WK.Subject, vocabulary)).not.toThrow();
    expect(WK.isSubject(vocabulary)).toBe(true);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    expect(() => v.assert(WK.Subject, kanaVocabulary)).not.toThrow();
    expect(WK.isSubject(kanaVocabulary)).toBe(true);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, radicalCollection)).not.toThrow();
    expect(WK.isSubjectCollection(radicalCollection)).toBe(true);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, kanjiCollection)).not.toThrow();
    expect(WK.isSubjectCollection(kanjiCollection)).toBe(true);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, vocabularyCollection)).not.toThrow();
    expect(WK.isSubjectCollection(vocabularyCollection)).toBe(true);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, kanaVocabularyCollection)).not.toThrow();
    expect(WK.isSubjectCollection(kanaVocabularyCollection)).toBe(true);
  });
  testFor("Real SubjectCollection", ({ subjectCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, subjectCollection)).not.toThrow();
    expect(WK.isSubjectCollection(subjectCollection)).toBe(true);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.SubjectParameters, emptyParams)).not.toThrow();
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithManyOptions)).not.toThrow();
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithDates)).not.toThrow();
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithDatableStrings)).not.toThrow();
  });
});
