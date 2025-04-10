import * as v from "valibot";
import { BaseReport, DatableString } from "./base.js";

/**
 * Details about subjects listed as available for lessons in the Summary report.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Summary
 */
export interface SummaryInterval {
  /**
   * When the paired `subject_ids` are available for lessons. Always beginning of the current hour when the API endpoint
   * is accessed.
   */
  available_at: DatableString;

  /**
   * Collection of unique identifiers for subjects.
   */
  subject_ids: number[];
}
export const SummaryInterval = v.object({
  available_at: DatableString,
  subject_ids: v.array(v.number()),
});

/**
 * The summary report contains currently available lessons and reviews and the reviews that will become available in the
 * next 24 hours, grouped by the hour.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Reports
 * @category Summary
 */
export interface Summary extends BaseReport {
  /**
   * Data for the Summary report.
   */
  data: {
    /**
     * Details about subjects available for lessons.
     */
    lessons: SummaryInterval[];

    /**
     * Earliest date when the reviews are available. Is `null` when the user has no reviews scheduled.
     */
    next_reviews_at: DatableString | null;

    /**
     * Details about subjects available for reviews now and in the next 24 hours by the hour (total of 25 objects).
     */
    reviews: SummaryInterval[];
  };
}
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
 */
// @__NO_SIDE_EFFECTS__
export function isSummary(value: unknown): value is Summary {
  return v.is(Summary, value);
}
