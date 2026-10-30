import {
  array,
  constant,
  date,
  define,
  defineModule,
  literal,
  nullable,
  number,
  object,
  optionalProperty,
  property,
  string,
  union,
} from "../core/index.js";

export const ApiRevision = define(
  "ApiRevision",
  literal("20170710"),
  {
    description: "All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.",
    see: ["https://docs.api.wanikani.com/20170710/#revisions-aka-versioning"],
  },
  { typeGuard: true },
);

export const API_REVISION = constant(
  "API_REVISION",
  "20170710",
  {
    description:
      "A constant representing the WaniKani API revision. This will match the revision module being imported from, or the latest revision when importing from the root module.",
    see: ["https://docs.api.wanikani.com/20170710/#revisions-aka-versioning"],
  },
  { type: ApiRevision },
);

export const SafeInteger = define(
  "SafeInteger",
  number({ integer: true, min: 0 }),
  "Items with this type will have their number validated as a safe integer >= 0.",
);

export const DatableString = define(
  "DatableString",
  string({ brand: true, format: "iso-timestamp", trim: true }),
  {
    description:
      "A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.",
    remarks:
      "This is a branded type. A `string` can be narrowed to it by validating it with one of the schema library packages (e.g. `@bachman-dev/wanikani-api-valibot`), or by using a type assertion if it's known to be valid.",
  },
  { typeGuard: true },
);

export const MIN_LEVEL = constant(
  "MIN_LEVEL",
  1,
  "The minimum level provided by WaniKani; exported for use in lieu of a Magic Number.",
);

export const MAX_LEVEL = constant(
  "MAX_LEVEL",
  // oxlint-disable-next-line no-magic-numbers -- This names the number
  60,
  "The maximum level provided by WaniKani; exported for use in lieu of a Magic Number.",
);

export const Level = define(
  "Level",
  number({ base: SafeInteger, min: MIN_LEVEL, max: MAX_LEVEL }),
  "A number representing a level in WaniKani, from `1` to `60`.",
  { typeGuard: true },
);

/** A timestamp sent to the WaniKani API, either as a string or a JavaScript `Date`. */
export const DatableInput = union([DatableString, date()], { message: "dateUnion" });

export const BaseResource = define(
  "BaseResource",
  object({
    data_updated_at: property(
      DatableString,
      "For a resource, this is the last time that particular resource was updated.",
    ),
    url: property(string(), "The URL of the requested resource."),
  }),
  {
    description: "The common properties across all Resources from the WaniKani API.",
    remarks: "This is a partial interface; most use cases involve using a reource that extends it.",

    see: ["https://docs.api.wanikani.com/20170710/#response-structure"],
  },
);

export const BaseCollection = define(
  "BaseCollection",
  object({
    data_updated_at: property(
      nullable(DatableString),
      "For collections, this is the timestamp of the most recently updated resource in the specified scope and is not limited by pagination. If no items were returned for the specified scope, then this will be `null`.",
    ),
    object: property(literal("collection"), "The kind of object returned."),
    pages: property(
      object({
        next_url: property(
          nullable(string()),
          "The URL of the next page of results. If there are no more results, the value is `null`.",
        ),
        per_page: property(SafeInteger, "Maximum number of items delivered per page for this collection."),
        previous_url: property(
          nullable(string()),
          "The URL of the previous page of results. If there are no results at all or no previous page to go to, the value is `null`.",
        ),
      }),
      "Pagination Info for the collection.",
    ),
    total_count: property(SafeInteger, "The total number of items in the collection."),
    url: property(
      string(),
      "The URL of the request. For collections, that will contain all the filters and options you've passed to the API.",
    ),
  }),
  {
    description: "The common properties across all Collection items from the WaniKani API.",
    remarks: "This is a partial interface; most use cases involve using a reource that extends it.",

    see: ["https://docs.api.wanikani.com/20170710/#response-structure"],
  },
);

export const CollectionParameters = define(
  "CollectionParameters",
  object({
    ids: optionalProperty(
      array(SafeInteger),
      "Only resources where `data.id` matches one of the array values are returned.",
    ),
    page_after_id: optionalProperty(SafeInteger, [
      "Get a collection's next page containing `pages.per_page` resources after the given ID.",
      "This will take precedence over `page_before_id` if both are specified.",
    ]),
    page_before_id: optionalProperty(SafeInteger, [
      "Get a collection's previous page containing `pages.per_page` resources before the given ID.",
      "The `page_after_id` parameter takes precedence over this if it is specified alongside this parameter.",
    ]),
    updated_after: optionalProperty(DatableInput, "Only resources updated after this time are returned."),
  }),
  {
    description: "Query string parameters that can be sent to any WaniKani API collection endpoint.",
  },
);

export const BaseReport = define(
  "BaseReport",
  object({
    data_updated_at: property(DatableString, "The last time the report was updated."),
    object: property(literal("report"), "The kind of object returned."),
    url: property(string(), "The URL of the requested report."),
  }),
  {
    description: "The common properties across all Reports from the WaniKani API",
    remarks: "This is a partial interface; most use cases involve using a reource that extends it.",

    see: ["https://docs.api.wanikani.com/20170710/#response-structure"],
  },
);

export const ApiError = define(
  "ApiError",
  object({
    code: property(SafeInteger, "An HTTP status code indicating the type of error."),
    error: property(string(), "A message string that describes the error."),
  }),
  "An error response returned by the WaniKani API.",
  { typeGuard: true },
);

export default defineModule("base", [
  ApiRevision,
  API_REVISION,
  SafeInteger,
  DatableString,
  MIN_LEVEL,
  MAX_LEVEL,
  Level,
  BaseResource,
  BaseCollection,
  CollectionParameters,
  BaseReport,
  ApiError,
]);
