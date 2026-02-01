import type { CollectionParameters } from "@bachman-dev/wanikani-api-types/v20170710";
/**
 * Parses a parameter object, for use with the WaniKani API.
 *
 * @param params -- An object containing the query string parameters to parse.
 * @returns A query string of all the parameters, which can be added to a base URL.
 * @throws A `TypeError` if a non-object is passed to the function.
 */
export function stringifyParameters(params: CollectionParameters): string {
  if (typeof params !== "object") {
    throw new TypeError("Parameters must be passed in as an object.");
  }

  if (Object.keys(params).length === 0) {
    return "";
  }

  let isFirstItem = true;
  let queryString = "";

  /* These boolean parameters are empty, i.e. no true or false, so should only be appended when actually set. */
  const emptyQueryParams = ["immediately_available_for_lessons", "immediately_available_for_review", "in_review"];

  for (const [key, value] of Object.entries(params)) {
    if (emptyQueryParams.includes(key) && typeof value === "boolean") {
      if (value) {
        queryString += isFirstItem ? "?" : "&";
        queryString += key;
      }
    } else {
      queryString += isFirstItem ? "?" : "&";
      if (typeof value === "boolean") {
        queryString += value ? `${key}=true` : `${key}=false`;
      } else if (value instanceof Date && Object.prototype.toString.call(value) === "[object Date]") {
        queryString += `${key}=${value.toISOString()}`;
      } else if (Array.isArray(value) || typeof value === "number" || typeof value === "string") {
        queryString += `${key}=${value.toString()}`;
      }
    }
    isFirstItem = false;
  }
  return queryString;
}
