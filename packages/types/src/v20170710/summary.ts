import type { BaseReport, DatableString, SafeInteger } from "./base.js";

/**
 * Details about subjects listed as available for lessons in the Summary report.
 *
 * @category Summary
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 */
export interface SummaryInterval {
  /**
   * When the paired `subject_ids` are available for lessons. Always beginning of the current hour when the API endpoint
   * is accessed.
   */
  available_at: DatableString;

  /** Collection of unique identifiers for subjects. */
  subject_ids: SafeInteger[];
}

/**
 * The summary report contains currently available lessons and reviews and the reviews that will become available in the
 * next 24 hours, grouped by the hour.
 *
 * @category Reports
 * @category Summary
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 */
export interface Summary extends BaseReport {
  /** Data for the Summary report. */
  data: {
    /** Details about subjects available for lessons. */
    lessons: SummaryInterval[];

    /** Earliest date when the reviews are available. Is `null` when the user has no reviews scheduled. */
    next_reviews_at: DatableString | null;

    /** Details about subjects available for reviews now and in the next 24 hours by the hour (total of 25 objects). */
    reviews: SummaryInterval[];
  };
}
