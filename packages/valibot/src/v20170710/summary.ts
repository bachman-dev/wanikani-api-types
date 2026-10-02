import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

import { BaseReport, DatableString } from "./base.js";

/**
 * Details about subjects listed as available for lessons in the Summary report.
 *
 * @category Summary
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 */
export type SummaryInterval = Types.SummaryInterval;
export const SummaryInterval = v.object({
  available_at: DatableString,
  subject_ids: v.array(v.number()),
});

/**
 * The summary report contains currently available lessons and reviews and the reviews that will become available in the
 * next 24 hours, grouped by the hour.
 *
 * @category Reports
 * @category Summary
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 */
export type Summary = Types.Summary;
export const Summary = v.object(
  v.entriesFromObjects([
    BaseReport,
    v.object({
      data: v.object({
        lessons: v.array(SummaryInterval),
        next_reviews_at: v.union([DatableString, v.null()]),
        reviews: v.array(SummaryInterval),
      }),
    }),
  ]),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Summary
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isSummary(value: unknown): value is Summary {
  return v.is(Summary, value);
}
