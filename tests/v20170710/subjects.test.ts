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

describe("SUBJECT_MARKUP_MATCHER", () => {
  testFor("Matches Japanese text highlighting in <ja> tags", ({ subjectMarkupWithJaTag }) => {
    const matchedText = [...subjectMarkupWithJaTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<ja>か</ja>");
    expect(matchedText[0]?.groups?.tag).toBe("ja");
    expect(matchedText[0]?.groups?.innerText).toBe("か");
    expect(matchedText[1]?.[0]).toBe("<ja>せつ</ja>");
    expect(matchedText[1]?.groups?.tag).toBe("ja");
    expect(matchedText[1]?.groups?.innerText).toBe("せつ");
  });

  testFor("Matches Kanji highlighting in <kanji> tags", ({ subjectMarkupWithKanjiTag }) => {
    const matchedText = [...subjectMarkupWithKanjiTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<kanji>山</kanji>");
    expect(matchedText[0]?.groups?.tag).toBe("kanji");
    expect(matchedText[0]?.groups?.innerText).toBe("山");
    expect(matchedText[1]?.[0]).toBe("<kanji>人</kanji>");
    expect(matchedText[1]?.groups?.tag).toBe("kanji");
    expect(matchedText[1]?.groups?.innerText).toBe("人");
  });

  testFor("Matches Meaning highlighting in <meaning> tags", ({ subjectMarkupWithMeaningTag }) => {
    const matchedText = [...subjectMarkupWithMeaningTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<meaning>one</meaning>");
    expect(matchedText[0]?.groups?.tag).toBe("meaning");
    expect(matchedText[0]?.groups?.innerText).toBe("one");
    expect(matchedText[1]?.[0]).toBe("<meaning>two</meaning>");
    expect(matchedText[1]?.groups?.tag).toBe("meaning");
    expect(matchedText[1]?.groups?.innerText).toBe("two");
  });

  testFor("Matches Radical highlighting in <radical> tags", ({ subjectMarkupWithRadicalTag }) => {
    const matchedText = [...subjectMarkupWithRadicalTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<radical>ground</radical>");
    expect(matchedText[0]?.groups?.tag).toBe("radical");
    expect(matchedText[0]?.groups?.innerText).toBe("ground");
    expect(matchedText[1]?.[0]).toBe("<radical>coat rack</radical>");
    expect(matchedText[1]?.groups?.tag).toBe("radical");
    expect(matchedText[1]?.groups?.innerText).toBe("coat rack");
  });

  testFor("Matches Reading highlighting in <reading> tags", ({ subjectMarkupWithReadingTag }) => {
    const matchedText = [...subjectMarkupWithReadingTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<reading>ha</reading>");
    expect(matchedText[0]?.groups?.tag).toBe("reading");
    expect(matchedText[0]?.groups?.innerText).toBe("ha");
    expect(matchedText[1]?.[0]).toBe("<reading>wa</reading>");
    expect(matchedText[1]?.groups?.tag).toBe("reading");
    expect(matchedText[1]?.groups?.innerText).toBe("wa");
  });

  testFor("Matches Vocabulary highlighting in <vocabulary> tags", ({ subjectMarkupWithVocabularyTag }) => {
    const matchedText = [...subjectMarkupWithVocabularyTag.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<vocabulary>one thing</vocabulary>");
    expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
    expect(matchedText[0]?.groups?.innerText).toBe("one thing");
    expect(matchedText[1]?.[0]).toBe("<vocabulary>first floor</vocabulary>");
    expect(matchedText[1]?.groups?.tag).toBe("vocabulary");
    expect(matchedText[1]?.groups?.innerText).toBe("first floor");
  });

  testFor(
    "Matches <radical> and <kanji> highlighting, like in a kanji meaning mnemonic",
    ({ subjectMarkupWithRadicalAndKanjiTags }) => {
      const matchedText = [...subjectMarkupWithRadicalAndKanjiTags.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<kanji>three</kanji>");
      expect(matchedText[0]?.groups?.tag).toBe("kanji");
      expect(matchedText[0]?.groups?.innerText).toBe("three");
      expect(matchedText[1]?.[0]).toBe("<radical>one</radical>");
      expect(matchedText[1]?.groups?.tag).toBe("radical");
      expect(matchedText[1]?.groups?.innerText).toBe("one");
      expect(matchedText[2]?.[0]).toBe("<radical>two</radical>");
      expect(matchedText[2]?.groups?.tag).toBe("radical");
      expect(matchedText[2]?.groups?.innerText).toBe("two");
    },
  );

  testFor(
    "Matches <kanji>, <reading>, and <ja> highlighting, like in a kanji reading mnemonic",
    ({ subjectMarkupWithKanjiJaAndReadingTags }) => {
      const matchedText = [...subjectMarkupWithKanjiJaAndReadingTags.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<kanji>mud</kanji>");
      expect(matchedText[0]?.groups?.tag).toBe("kanji");
      expect(matchedText[0]?.groups?.innerText).toBe("mud");
      expect(matchedText[1]?.[0]).toBe("<reading>doro</reading>");
      expect(matchedText[1]?.groups?.tag).toBe("reading");
      expect(matchedText[1]?.groups?.innerText).toBe("doro");
      expect(matchedText[2]?.[0]).toBe("<ja>どろ</ja>");
      expect(matchedText[2]?.groups?.tag).toBe("ja");
      expect(matchedText[2]?.groups?.innerText).toBe("どろ");
    },
  );

  testFor(
    "Matches <kanji> and <vocabulary> highlighting, like in a vocabulary meaning mnemonic",
    ({ subjectMarkupWithKanjiAndVocabularyTags }) => {
      const matchedText = [...subjectMarkupWithKanjiAndVocabularyTags.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<vocabulary>oil painting</vocabulary>");
      expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
      expect(matchedText[0]?.groups?.innerText).toBe("oil painting");
      expect(matchedText[1]?.[0]).toBe("<kanji>oil</kanji>");
      expect(matchedText[1]?.groups?.tag).toBe("kanji");
      expect(matchedText[1]?.groups?.innerText).toBe("oil");
      expect(matchedText[2]?.[0]).toBe("<kanji>drawing</kanji>");
      expect(matchedText[2]?.groups?.tag).toBe("kanji");
      expect(matchedText[2]?.groups?.innerText).toBe("drawing");
    },
  );

  testFor(
    "Matches <vocabulary>, <meaning>, <reading>, and <ja> tags, like in a vocabulary reading mnemonic",
    ({ subjectMarkupWithVocabularyJaReadingAndMeaningTags }) => {
      const matchedText = [...subjectMarkupWithVocabularyJaReadingAndMeaningTags.matchAll(WK.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(4);
      expect(matchedText[0]?.[0]).toBe("<vocabulary>girl</vocabulary>");
      expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
      expect(matchedText[0]?.groups?.innerText).toBe("girl");
      expect(matchedText[1]?.[0]).toBe("<meaning>maiden</meaning>");
      expect(matchedText[1]?.groups?.tag).toBe("meaning");
      expect(matchedText[1]?.groups?.innerText).toBe("maiden");
      expect(matchedText[2]?.[0]).toBe("<reading>shoujo</reading>");
      expect(matchedText[2]?.groups?.tag).toBe("reading");
      expect(matchedText[2]?.groups?.innerText).toBe("shoujo");
      expect(matchedText[3]?.[0]).toBe("<ja>しょうじょ</ja>");
      expect(matchedText[3]?.groups?.tag).toBe("ja");
      expect(matchedText[3]?.groups?.innerText).toBe("しょうじょ");
    },
  );
});

describe("parseSubjectMarkup", () => {
  testFor("Parses an empty string", () => {
    expect(WK.parseSubjectMarkup("")).toStrictEqual([]);
  });

  testFor("Parses Japanese text highlighting in <ja> tags", ({ subjectMarkupWithJaTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: `The romaji "ka" can be written as `,
      },
      {
        tag: "ja",
        children: [{ text: "か" }],
      },
      {
        text: ` in hiragana. The romaji "setsu" can be written as `,
      },
      {
        tag: "ja",
        children: [{ text: "せつ" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithJaTag)).toStrictEqual(parsed);
  });

  testFor("Parses Kanji highlighting in <kanji> tags", ({ subjectMarkupWithKanjiTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "Two of WaniKani's Level 1 Kanji are ",
      },
      {
        tag: "kanji",
        children: [{ text: "山" }],
      },
      {
        text: " and ",
      },
      {
        tag: "kanji",
        children: [{ text: "人" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithKanjiTag)).toStrictEqual(parsed);
  });

  testFor("Parses Meaning highlighting in <meaning> tags", ({ subjectMarkupWithMeaningTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "The kanji 一 means ",
      },
      {
        tag: "meaning",
        children: [{ text: "one" }],
      },
      {
        text: ". The kanji 二 means ",
      },
      {
        tag: "meaning",
        children: [{ text: "two" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithMeaningTag)).toStrictEqual(parsed);
  });

  testFor("Parses Radical highlighting in <radical> tags", ({ subjectMarkupWithRadicalTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "One of the first radicals is the ",
      },
      {
        tag: "radical",
        children: [{ text: "ground" }],
      },
      {
        text: " radical. A more complex one is ",
      },
      {
        tag: "radical",
        children: [{ text: "coat rack" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithRadicalTag)).toStrictEqual(parsed);
  });

  testFor("Parses Reading highlighting in <reading> tags", ({ subjectMarkupWithReadingTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "The partical は can sound like ",
      },
      {
        tag: "reading",
        children: [{ text: "ha" }],
      },
      {
        text: ", but is also read like ",
      },
      {
        tag: "reading",
        children: [{ text: "wa" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithReadingTag)).toStrictEqual(parsed);
  });

  testFor("Parses Vocabulary highlighting in <vocabulary> tags", ({ subjectMarkupWithVocabularyTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "The kanji 一 is used in the vocabulary ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "one thing" }],
      },
      {
        text: " and ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "first floor" }],
      },
      {
        text: ".",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithVocabularyTag)).toStrictEqual(parsed);
  });

  testFor(
    "Parses <radical> and <kanji> highlighting, like in a kanji meaning mnemonic",
    ({ subjectMarkupWithRadicalAndKanjiTags }) => {
      const parsed: WK.ParsedSubjectMarkup[] = [
        {
          text: "The kanji ",
        },
        {
          tag: "kanji",
          children: [{ text: "three" }],
        },
        {
          text: " is made up of the ",
        },
        {
          tag: "radical",
          children: [{ text: "one" }],
        },
        {
          text: " and ",
        },
        {
          tag: "radical",
          children: [{ text: "two" }],
        },
        {
          text: " radicals.",
        },
      ];
      expect(WK.parseSubjectMarkup(subjectMarkupWithRadicalAndKanjiTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <kanji>, <reading>, and <ja> highlighting, like in a kanji reading mnemonic",
    ({ subjectMarkupWithKanjiJaAndReadingTags }) => {
      const parsed: WK.ParsedSubjectMarkup[] = [
        {
          text: "The ",
        },
        {
          tag: "kanji",
          children: [{ text: "mud" }],
        },
        {
          text: " kanji is read like ",
        },
        {
          tag: "reading",
          children: [{ text: "doro" }],
        },
        {
          text: " (",
        },
        {
          tag: "ja",
          children: [{ text: "どろ" }],
        },
        {
          text: ").",
        },
      ];
      expect(WK.parseSubjectMarkup(subjectMarkupWithKanjiJaAndReadingTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <kanji> and <vocabulary> highlighting, like in a vocabulary meaning mnemonic",
    ({ subjectMarkupWithKanjiAndVocabularyTags }) => {
      const parsed: WK.ParsedSubjectMarkup[] = [
        {
          text: "The vocabulary ",
        },
        {
          tag: "vocabulary",
          children: [{ text: "oil painting" }],
        },
        {
          text: " uses the ",
        },
        {
          tag: "kanji",
          children: [{ text: "oil" }],
        },
        {
          text: " and ",
        },
        {
          tag: "kanji",
          children: [{ text: "drawing" }],
        },
        {
          text: " kanji.",
        },
      ];
      expect(WK.parseSubjectMarkup(subjectMarkupWithKanjiAndVocabularyTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <vocabulary>, <meaning>, <reading>, and <ja> tags, like in a vocabulary reading mnemonic",
    ({ subjectMarkupWithVocabularyJaReadingAndMeaningTags }) => {
      const parsed: WK.ParsedSubjectMarkup[] = [
        {
          text: "The vocabulary ",
        },
        {
          tag: "vocabulary",
          children: [{ text: "girl" }],
        },
        {
          text: " can mean ",
        },
        {
          tag: "meaning",
          children: [{ text: "maiden" }],
        },
        {
          text: " as well, and is read ",
        },
        {
          tag: "reading",
          children: [{ text: "shoujo" }],
        },
        {
          text: " (",
        },
        {
          tag: "ja",
          children: [{ text: "しょうじょ" }],
        },
        {
          text: ").",
        },
      ];
      expect(WK.parseSubjectMarkup(subjectMarkupWithVocabularyJaReadingAndMeaningTags)).toStrictEqual(parsed);
    },
  );

  testFor("Parses subject markup with nested tags", ({ subjectMarkupWithNestedTags }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "The vocabulary ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "to go up" }],
      },
      {
        text: " has a nested ",
      },
      {
        tag: "ja",
        children: [{ tag: "reading", children: [{ text: "word" }] }],
      },
      {
        text: " in it. It's not ",
      },
      {
        tag: "ja",
        children: [{ text: "very " }, { tag: "reading", children: [{ text: "common" }] }, { text: " to" }],
      },
      {
        text: " see this, but we should test for it.",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithNestedTags)).toStrictEqual(parsed);
  });

  testFor("Parses subject markup with empty tags (i.e. no child text/tags)", ({ subjectMarkupWithEmptyTag }) => {
    const parsed: WK.ParsedSubjectMarkup[] = [
      {
        text: "Oops, this ",
      },
      {
        tag: "ja",
        children: [],
      },
      {
        text: " tag has no text in it.",
      },
    ];
    expect(WK.parseSubjectMarkup(subjectMarkupWithEmptyTag)).toStrictEqual(parsed);
  });
});
