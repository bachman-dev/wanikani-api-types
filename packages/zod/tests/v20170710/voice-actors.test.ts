import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    expect(() => WaniKani.VoiceActor.parse(voiceActor)).not.toThrow();
    expect(WaniKani.isVoiceActor(voiceActor)).toBe(true);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    expect(() => WaniKani.VoiceActorCollection.parse(voiceActorCollection)).not.toThrow();
    expect(WaniKani.isVoiceActorCollection(voiceActorCollection)).toBe(true);
  });
});
