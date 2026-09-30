import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    expect(() => v.assert(WaniKani.VoiceActor, voiceActor)).not.toThrow();
    expect(WaniKani.isVoiceActor(voiceActor)).toBe(true);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    expect(() => v.assert(WaniKani.VoiceActorCollection, voiceActorCollection)).not.toThrow();
    expect(WaniKani.isVoiceActorCollection(voiceActorCollection)).toBe(true);
  });
});
