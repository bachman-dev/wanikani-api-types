import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      for (const subject of subjectTypes) {
        expect(() => v.assert(WaniKani.SubjectType, subject)).not.toThrow();
        expect(WaniKani.isSubjectType(subject)).toBe(true);
      }
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
  testFor("Invalid Subject Type", () => {
    expect(() => v.assert(WaniKani.SubjectType, "not real")).toThrow(
      `Invalid type: Expected ("kana_vocabulary" | "kanji" | "radical" | "vocabulary") but received "not real"`,
    );
    expect(WaniKani.isSubjectType("not real")).toBe(false);
  });
});

describe("SubjectTuple", () => {
  testFor("Empty SubjectTuple throws error", ({ emptySubjectTuple }) => {
    expect(() => v.assert(WaniKani.SubjectTuple, emptySubjectTuple)).toThrow(
      `Invalid type: Expected ("kana_vocabulary" | "kanji" | "radical" | "vocabulary") but received undefined`,
    );
    expect(WaniKani.isSubjectTuple(emptySubjectTuple)).toBe(false);
  });
  testFor("Partial SubjectTuple is valid", ({ partialSubjectTuple }) => {
    expect(() => v.assert(WaniKani.SubjectTuple, partialSubjectTuple)).not.toThrow();
    expect(WaniKani.isSubjectTuple(partialSubjectTuple)).toBe(true);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    expect(() => v.assert(WaniKani.SubjectTuple, fullSubjectTuple)).not.toThrow();
    expect(WaniKani.isSubjectTuple(fullSubjectTuple)).toBe(true);
  });
  testFor("SubjectTuple with repeated items throws error", ({ repeatedSubjectTuple }) => {
    expect(() => v.assert(WaniKani.SubjectTuple, repeatedSubjectTuple)).toThrow(
      "Duplicate Subject Type detected in Subject Tuple",
    );
    expect(WaniKani.isSubjectTuple(repeatedSubjectTuple)).toBe(false);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    expect(() => v.assert(WaniKani.Subject, radical)).not.toThrow();
    expect(WaniKani.isSubject(radical)).toBe(true);
  });
  testFor("Real Kanji", ({ kanji }) => {
    expect(() => v.assert(WaniKani.Subject, kanji)).not.toThrow();
    expect(WaniKani.isSubject(kanji)).toBe(true);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    expect(() => v.assert(WaniKani.Subject, vocabulary)).not.toThrow();
    expect(WaniKani.isSubject(vocabulary)).toBe(true);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    expect(() => v.assert(WaniKani.Subject, kanaVocabulary)).not.toThrow();
    expect(WaniKani.isSubject(kanaVocabulary)).toBe(true);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    expect(() => v.assert(WaniKani.SubjectCollection, radicalCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(radicalCollection)).toBe(true);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    expect(() => v.assert(WaniKani.SubjectCollection, kanjiCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(kanjiCollection)).toBe(true);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    expect(() => v.assert(WaniKani.SubjectCollection, vocabularyCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(vocabularyCollection)).toBe(true);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    expect(() => v.assert(WaniKani.SubjectCollection, kanaVocabularyCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(kanaVocabularyCollection)).toBe(true);
  });
  testFor("Real SubjectCollection", ({ subjectCollection }) => {
    expect(() => v.assert(WaniKani.SubjectCollection, subjectCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(subjectCollection)).toBe(true);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.SubjectParameters, emptyParams)).not.toThrow();
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.SubjectParameters, subjectParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.SubjectParameters, subjectParamsWithManyOptions)).not.toThrow();
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    expect(() => v.assert(WaniKani.SubjectParameters, subjectParamsWithDates)).not.toThrow();
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.SubjectParameters, subjectParamsWithDatableStrings)).not.toThrow();
  });
});
