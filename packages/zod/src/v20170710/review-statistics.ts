import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { SubjectTuple, SubjectType } from "./subjects.js";

/**
 * Review statistics summarize the activity recorded in reviews. They contain sum the number of correct and incorrect
 * answers for both meaning and reading. They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on the related subject.
 *
 * @category Resources
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
 */
export type ReviewStatistic = Types.ReviewStatistic;
export const ReviewStatistic = z.toZod<Types.ReviewStatistic>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      created_at: DatableString,
      hidden: z.boolean(),
      meaning_correct: SafeInteger,
      meaning_current_streak: SafeInteger,
      meaning_incorrect: SafeInteger,
      meaning_max_streak: SafeInteger,
      percentage_correct: z.number(),
      reading_correct: SafeInteger,
      reading_current_streak: SafeInteger,
      reading_incorrect: SafeInteger,
      reading_max_streak: SafeInteger,
      subject_id: SafeInteger,
      subject_type: SubjectType,
    }),
    id: SafeInteger,
    object: z.literal("review_statistic"),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Review Statistics
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isReviewStatistic(value: unknown): value is ReviewStatistic {
  return z.validate(ReviewStatistic, value);
}

/**
 * A collection of review statistics returned from the WaniKani API.
 *
 * @category Collections
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 */
export type ReviewStatisticCollection = Types.ReviewStatisticCollection;
export const ReviewStatisticCollection = z.toZod<Types.ReviewStatisticCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(ReviewStatistic),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Review Statistics
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isReviewStatisticCollection(value: unknown): value is ReviewStatisticCollection {
  return z.validate(ReviewStatisticCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Statistic Collection.
 *
 * @category Parameters
 * @category Review Statistics
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type ReviewStatisticParameters = Types.ReviewStatisticParameters;
export const ReviewStatisticParameters = z.toZod<Types.ReviewStatisticParameters>()(
  z.object({
    ...CollectionParameters.shape,
    hidden: z.exactOptional(z.boolean()),
    percentages_greater_than: z.exactOptional(z.number()),
    percentages_less_than: z.exactOptional(z.number()),
    subject_ids: z.exactOptional(z.array(SafeInteger)),
    subject_types: z.exactOptional(SubjectTuple),
  }),
);
