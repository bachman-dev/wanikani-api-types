/** A type-only symbol used to brand {@link DatableString}, so a plain `string` can't be mistaken for one. */
declare const datableStringBrand: unique symbol;

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.
 *
 * @category Base
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 */
export type ApiRevision = "20170710";

/**
 * A constant representing the WaniKani API revision. This will match the revision module being imported from, or the
 * latest revision when importing from the root module.
 *
 * @category Base
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 */
export const API_REVISION: ApiRevision = "20170710";

/**
 * Items with this type will have their number validated as a safe integer >= 0.
 *
 * @category Base
 */
export type SafeInteger = number & {};

/**
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.
 *
 * @remarks
 *   This is a branded type. A `string` can be narrowed to it by validating it with one of the schema library packages
 *   (e.g. `@bachman-dev/wanikani-api-valibot`), or by using a type assertion if it's known to be valid.
 * @category Base
 */
export type DatableString = string & { readonly [datableStringBrand]: "DatableString" };

/**
 * The minimum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MIN_LEVEL = 1;

/**
 * The maximum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MAX_LEVEL = 60;

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type Level = number & {};

/**
 * The common properties across all Resources from the WaniKani API.
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Resources
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export interface BaseResource {
  /** For a resource, this is the last time that particular resource was updated. */
  data_updated_at: DatableString;

  /** The URL of the requested resource. */
  url: string;
}

/**
 * The common properties across all Collection items from the WaniKani API.
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Collections
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export interface BaseCollection {
  /**
   * For collections, this is the timestamp of the most recently updated resource in the specified scope and is not
   * limited by pagination. If no items were returned for the specified scope, then this will be `null`.
   */
  data_updated_at: DatableString | null;

  /** The kind of object returned. */
  object: "collection";

  /** Pagination Info for the collection. */
  pages: {
    /** The URL of the next page of results. If there are no more results, the value is `null`. */
    next_url: string | null;

    /** Maximum number of items delivered per page for this collection. */
    per_page: SafeInteger;

    /**
     * The URL of the previous page of results. If there are no results at all or no previous page to go to, the value
     * is `null`.
     */
    previous_url: string | null;
  };

  /** The total number of items in the collection. */
  total_count: SafeInteger;

  /** The URL of the request. For collections, that will contain all the filters and options you've passed to the API. */
  url: string;
}

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @category Base
 * @category Parameters
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export interface CollectionParameters {
  /** Only resources where `data.id` matches one of the array values are returned. */
  ids?: SafeInteger[];

  /**
   * Get a collection's next page containing `pages.per_page` resources after the given ID.
   *
   * This will take precedence over `page_before_id` if both are specified.
   */
  page_after_id?: SafeInteger;

  /**
   * Get a collection's previous page containing `pages.per_page` resources before the given ID.
   *
   * The `page_after_id` parameter takes precedence over this if it is specified alongside this parameter.
   */
  page_before_id?: SafeInteger;

  /** Only resources updated after this time are returned. */
  updated_after?: DatableString | Date;
}

/**
 * The common properties across all Reports from the WaniKani API
 *
 * @remarks
 *   This is a partial interface; most use cases involve using a reource that extends it.
 * @category Base
 * @category Reports
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 */
export interface BaseReport {
  /** The last time the report was updated. */
  data_updated_at: DatableString;

  /** The kind of object returned. */
  object: "report";

  /** The URL of the requested report. */
  url: string;
}

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export interface ApiError {
  /** An HTTP status code indicating the type of error. */
  code: SafeInteger;

  /** A message string that describes the error. */
  error: string;
}
