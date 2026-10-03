import * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

import * as m from "./lang/index.js";

export { API_REVISION, MIN_LEVEL, MAX_LEVEL } from "@bachman-dev/wanikani-api-types/v20170710";

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.
 *
 * @category Base
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 */
export type ApiRevision = Types.ApiRevision;
export const ApiRevision = z.literal(Types.API_REVISION);

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
  return z.safeParse(ApiRevision, value).success;
}

/**
 * Items with this type will have their number validated as a safe integer >= 0.
 *
 * @category Base
 */
export type SafeInteger = Types.SafeInteger;
export const SafeInteger = z.number().check(z.int(), z.nonnegative());

/**
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.
 *
 * @category Base
 */
export type DatableString = Types.DatableString;
export const DatableString = z.pipe(
  z.iso.datetime({ offset: true }),
  // oxlint-disable-next-line typescript/consistent-type-assertions, typescript/no-unsafe-type-assertion -- Validated above
  z.transform((value) => value as DatableString),
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
  return z.safeParse(DatableString, value).success;
}

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type Level = Types.Level;
export const Level = SafeInteger.check(z.minimum(Types.MIN_LEVEL), z.maximum(Types.MAX_LEVEL));

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
  return z.safeParse(Level, value).success;
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
export const BaseResource = z.object({
  data_updated_at: DatableString,
  url: z.string(),
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
export const BaseCollection = z.object({
  data_updated_at: z.union([DatableString, z.null()]),
  object: z.literal("collection"),
  pages: z.object({
    next_url: z.union([z.string(), z.null()]),
    per_page: z.number(),
    previous_url: z.union([z.string(), z.null()]),
    total_count: z.number(),
    url: z.string(),
  }),
});

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @category Base
 * @category Parameters
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type CollectionParameters = Types.CollectionParameters;
export const CollectionParameters = z.object({
  ids: z.exactOptional(z.array(SafeInteger)),
  page_after_id: z.exactOptional(SafeInteger),
  page_before_id: z.exactOptional(SafeInteger),
  updated_after: z.exactOptional(z.union([DatableString, z.date()], { error: m.dateUnion })),
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
export const BaseReport = z.object({
  data_updated_at: DatableString,
  object: z.literal("report"),
  url: z.string(),
});

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export type ApiError = Types.ApiError;
export const ApiError = z.object({
  code: z.number(),
  error: z.string(),
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
  return z.safeParse(ApiError, value).success;
}
