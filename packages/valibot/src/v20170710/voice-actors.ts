import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseCollection, BaseResource, DatableString } from "./base.js";

/**
 * Available voice actors used for vocabulary reading pronunciation audio.
 *
 * @category Resources
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#voice-actors}
 */
export type VoiceActor = Types.VoiceActor;
export const VoiceActor = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        created_at: DatableString,
        description: v.string(),
        gender: v.picklist(["female", "male"]),
        name: v.string(),
      }),
      id: v.number(),
      object: v.literal("voice_actor"),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Voice Actors
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isVoiceActor(value: unknown): value is VoiceActor {
  return v.is(VoiceActor, value);
}

/**
 * A collection of voice actors returned from the WaniKani API.
 *
 * @category Collections
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 */
export type VoiceActorCollection = Types.VoiceActorCollection;
export const VoiceActorCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(VoiceActor),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Voice Actors
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isVoiceActorCollection(value: unknown): value is VoiceActorCollection {
  return v.is(VoiceActorCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection.
 *
 * @category Parameters
 * @category Voice Actors
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export { CollectionParameters as VoiceActorParameters } from "./base.js";
