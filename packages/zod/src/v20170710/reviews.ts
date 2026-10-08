import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as z from "zod/mini";

import * as m from "./lang/index.js";
import { Assignment } from "./assignments.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";
import { ReviewStatistic } from "./review-statistics.js";
import { SpacedRepetitionSystemStageNumber } from "./spaced-repetition-systems.js";

/**
 * Reviews log all the correct and incorrect answers provided through the 'Reviews' section of WaniKani. Review records
 * are created when a user answers all the parts of a subject correctly once; some subjects have both meaning or reading
 * parts, and some only have one or the other. Note that reviews are not created for the quizzes in lessons.
 *
 * @category Resources
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
 */
export type Review = Types.Review;
export const Review = z.toZod<Types.Review>()(
  z.object({
    ...BaseResource.shape,
    data: z.object({
      assignment_id: SafeInteger,
      created_at: DatableString,
      ending_srs_stage: SpacedRepetitionSystemStageNumber,
      incorrect_meaning_answers: SafeInteger,
      incorrect_reading_answers: SafeInteger,
      spaced_repetition_system_id: SafeInteger,
      starting_srs_stage: SpacedRepetitionSystemStageNumber,
      subject_id: SafeInteger,
    }),
    id: SafeInteger,
    object: z.literal("review"),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isReview(value: unknown): value is Review {
  return z.validate(Review, value);
}

/**
 * A collection of reviews returned from the WaniKani API.
 *
 * @category Collections
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 */
export type ReviewCollection = Types.ReviewCollection;
export const ReviewCollection = z.toZod<Types.ReviewCollection>()(
  z.object({
    ...BaseCollection.shape,
    data: z.array(Review),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isReviewCollection(value: unknown): value is ReviewCollection {
  return z.validate(ReviewCollection, value);
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Collection.
 *
 * @category Parameters
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @see {@link @bachman-dev/wanikani-api-requests!v20170710.stringifyParameters}
 */
export type ReviewParameters = Types.ReviewParameters;
export const ReviewParameters = z.toZod<Types.ReviewParameters>()(
  z.object({
    ...CollectionParameters.shape,
    assignment_ids: z.exactOptional(z.array(SafeInteger)),
    subject_ids: z.exactOptional(z.array(SafeInteger)),
  }),
);

/**
 * The payload used in the request to create a new review via the WaniKani API.
 *
 * @category Payloads
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export type ReviewPayload = Types.ReviewPayload;
export const ReviewPayload = z.toZod<Types.ReviewPayload>()(
  z.object({
    review: z.intersection(
      z.object({
        incorrect_meaning_answers: SafeInteger,
        incorrect_reading_answers: SafeInteger,
        created_at: z.exactOptional(z.union([DatableString, z.date()], { error: m.dateUnion })),
      }),
      z.union(
        [
          z.object({
            assignment_id: SafeInteger,
            subject_id: z.exactOptional(z.never()),
          }),
          z.object({
            assignment_id: z.exactOptional(z.never()),
            subject_id: SafeInteger,
          }),
        ],
        { error: m.reviewPayloadUnion },
      ),
    ),
  }),
);

/**
 * A created review returned from the WaniKani API.
 *
 * @category Resources
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export type CreatedReview = Types.CreatedReview;
export const CreatedReview = z.toZod<Types.CreatedReview>()(
  z.object({
    ...Review.shape,
    resources_updated: z.object({
      assignment: Assignment,
      review_statistic: ReviewStatistic,
    }),
  }),
);

/**
 * A type guard that checks if the given value matches the type predicate.
 *
 * @category Reviews
 * @category Type Guards
 * @param value An unknown value
 * @returns A type predicate
 */
// @__NO_SIDE_EFFECTS__
export function isCreatedReview(value: unknown): value is CreatedReview {
  return z.validate(CreatedReview, value);
}
