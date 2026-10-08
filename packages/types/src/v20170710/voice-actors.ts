import type { BaseCollection, BaseResource, DatableString, SafeInteger } from "./base.js";

/**
 * Available voice actors used for vocabulary reading pronunciation audio.
 *
 * @category Resources
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#voice-actors}
 */
export interface VoiceActor extends BaseResource {
  /** Data for the returned voice actor. */
  data: {
    /** Timestamp for when the voice actor was added to WaniKani. */
    created_at: DatableString;

    /** Details about the voice actor. */
    description: string;

    /** The voice actor's gender, either `male` or `female`. */
    gender: "female" | "male";

    /** The voice actor's name. */
    name: string;
  };

  /** A unique number identifying the voice actor. */
  id: SafeInteger;

  /** The kind of object returned. */
  object: "voice_actor";
}

/**
 * A collection of voice actors returned from the WaniKani API.
 *
 * @category Collections
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 */
export interface VoiceActorCollection extends BaseCollection {
  /** An array of returned voice actors. */
  data: VoiceActor[];
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection.
 *
 * @category Parameters
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type { CollectionParameters as VoiceActorParameters } from "./base.js";
