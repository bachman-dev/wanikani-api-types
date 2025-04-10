import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    expect(() => v.assert(WK.VoiceActor, voiceActor)).not.toThrow();
    expect(WK.isVoiceActor(voiceActor)).toBe(true);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    expect(() => v.assert(WK.VoiceActorCollection, voiceActorCollection)).not.toThrow();
    expect(WK.isVoiceActorCollection(voiceActorCollection)).toBe(true);
  });
});
