import type * as Types from "@bachman-dev/wanikani-api-types/v20170710";
import * as v from "valibot";

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
export const Review = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
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
      object: v.literal("review"),
    }),
  ]),
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
  return v.is(Review, value);
}

/**
 * A collection of reviews returned from the WaniKani API.
 *
 * @category Collections
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 */
export type ReviewCollection = Types.ReviewCollection;
export const ReviewCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Review),
    }),
  ]),
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
  return v.is(ReviewCollection, value);
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
export const ReviewParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      assignment_ids: v.exactOptional(v.array(SafeInteger)),
      subject_ids: v.exactOptional(v.array(SafeInteger)),
    }),
  ]),
);

/**
 * The payload used in the request to create a new review via the WaniKani API.
 *
 * @category Payloads
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export type ReviewPayload = Types.ReviewPayload;
export const ReviewPayload = v.object({
  review: v.intersect(
    [
      v.object({
        incorrect_meaning_answers: SafeInteger,
        incorrect_reading_answers: SafeInteger,
        created_at: v.exactOptional(v.union([DatableString, v.date()], m.dateUnion)),
      }),
      v.union(
        [
          v.object({
            assignment_id: SafeInteger,
            subject_id: v.exactOptional(v.never()),
          }),
          v.object({
            subject_id: SafeInteger,
            assignment_id: v.exactOptional(v.never()),
          }),
        ],
        m.reviewPayloadUnion,
      ),
    ],
    m.reviewPayloadIntersect,
  ),
});

/**
 * A created review returned from the WaniKani API.
 *
 * @category Resources
 * @category Reviews
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 */
export type CreatedReview = Types.CreatedReview;
export const CreatedReview = v.object(
  v.entriesFromObjects([
    Review,
    v.object({
      resources_updated: v.object({
        assignment: Assignment,
        review_statistic: ReviewStatistic,
      }),
    }),
  ]),
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
  return v.is(CreatedReview, value);
}
