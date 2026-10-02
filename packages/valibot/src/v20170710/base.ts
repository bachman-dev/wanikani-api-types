import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";
import { MAX_LEVEL, MIN_LEVEL } from "@bachman-dev/wanikani-api-types/v20170710";

import * as m from "./lang/index.js";

export { API_REVISION, MIN_LEVEL, MAX_LEVEL } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.
 *
 * @category Base
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 */
export type ApiRevision = Types.ApiRevision;
export const ApiRevision = v.literal("20170710");

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Base
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isApiRevision(value: unknown): value is ApiRevision {
  return v.is(ApiRevision, value);
}

/**
 * Items with this type will have their number validated as a safe integer >= 0.
 *
 * @category Base
 */
export type SafeInteger = Types.SafeInteger;
export const SafeInteger = v.pipe(v.number(), v.safeInteger(), v.minValue(0));

/**
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.
 *
 * @category Base
 */
export type DatableString = Types.DatableString;
export const DatableString = v.pipe(
  v.string(),
  v.trim(),
  v.isoTimestamp(),
  // oxlint-disable-next-line typescript/consistent-type-assertions, typescript/no-unsafe-type-assertion -- Validated above
  v.transform((input) => input as DatableString),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Base
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isDatableString(value: unknown): value is DatableString {
  return v.is(DatableString, value);
}

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type Level = Types.Level;
export const Level = v.pipe(SafeInteger, v.minValue(MIN_LEVEL), v.maxValue(MAX_LEVEL));

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Base
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isLevel(value: unknown): value is Level {
  return v.is(Level, value);
}

/**
 * The common properties across all Resources from the WaniKani API.
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export type BaseResource = Types.BaseResource;
export const BaseResource = v.object({
  data_updated_at: DatableString,
  url: v.string(),
});

/**
 * The common properties across all Collection items from the WaniKani API.
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Collections
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export type BaseCollection = Types.BaseCollection;
export const BaseCollection = v.object({
  data_updated_at: v.union([DatableString, v.null()]),
  object: v.literal("collection"),
  pages: v.object({
    next_url: v.union([v.string(), v.null()]),
    per_page: v.number(),
    previous_url: v.union([v.string(), v.null()]),
  }),
  total_count: v.number(),
  url: v.string(),
});

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @category Base
 * @category Parameters
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type CollectionParameters = Types.CollectionParameters;
export const CollectionParameters = v.object({
  ids: v.exactOptional(v.array(SafeInteger)),
  page_after_id: v.exactOptional(SafeInteger),
  page_before_id: v.exactOptional(SafeInteger),
  updated_after: v.exactOptional(v.union([DatableString, v.date()], m.dateUnion)),
});

/**
 * The common properties across all Reports from the WaniKani API
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Reports
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export type BaseReport = Types.BaseReport;
export const BaseReport = v.object({
  data_updated_at: DatableString,
  object: v.literal("report"),
  url: v.string(),
});

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export type ApiError = Types.ApiError;
export const ApiError = v.object({
  code: v.number(),
  error: v.string(),
});

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Base
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isApiError(value: unknown): value is ApiError {
  return v.is(ApiError, value);
}
