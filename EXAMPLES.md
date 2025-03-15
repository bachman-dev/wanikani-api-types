# Examples

Below are some code examples to illustrate the various types, constants, and functions available in the library.

Keep in mind these are very simple examples, and you might want to make additional considerations such as rate limiting logic, more robust error handling, etc.

## Set Your WaniKani API Key in The Environment

These examples all assume you've set an environment variable, `WANIKANI_API_TOKEN`, for API authorization. Add the following code before using these examples pertaining to your JavaScript runtime.

```typescript
/* NodeJS: */

// npm install dotenv
import * as dotenv from "dotenv";
dotenv.config();
const WANIKANI_API_TOKEN = process.env("WANIKANI_API_TOKEN");

/* Deno:
   See here for which version to use on the import for your version of Deno:
   https://raw.githubusercontent.com/denoland/dotland/main/versions.json
*/
import { load } from "https://deno.land/std@0.180.0/dotenv/mod.ts";
const env = await load();
const WANIKANI_API_TOKEN = env["WANIKANI_API_TOKEN"];
```

## Get a 24-Hour Review Forecast

Maybe you want a bar/line graph of your review workload for the day...

```typescript
import type { WKError, WKSummary } from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { WKRequestFactory, WK_API_REVISION } from "@bachman-dev/wanikani-api-types/dist/v20170710";

interface WaniKaniReviewForecast {
  date: Date;
  reviews: number;
}

async function reviewForecast(): Promise<WaniKaniReviewForecast[]> {
  const request = new WKRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).summary.get();
  const { method, url, headers } = request;
  const init = { method, headers };
  const response = await fetch(url, init);
  if (response.ok) {
    const summary = (await response.json()) as WKSummary;
    const initialForecast: WaniKaniReviewForecast[] = [];
    summary.data.reviews.forEach((review) => {
      initialForecast.push({
        date: new Date(review.available_at),
        reviews: review.subject_ids.length,
      });
    });
    const forecast = initialForecast.filter((item) => {
      return item.reviews > 0;
    });
    return forecast;
    /*
      Or if you wanna include zeroes...
      return initialForecast;
    */
  } else {
    const error = (await response.json()) as WKError;
    throw new Error(error.error);
  }
}
```

## Get Subjects by Optional Level

A very wide collection of subjects, but can be limited by level.

```typescript
import type {
  WKError,
  WKSubjectCollection,
  WKSubjectData,
  WKSubjectParameters,
} from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { WKRequestFactory, WK_API_REVISION, isWKLevel } from "@bachman-dev/wanikani-api-types/dist/v20170710";

async function getSubjects(level?: number): Promise<WKSubjectData[]> {
  if (typeof level !== "undefined" && !isWKLevel(level)) {
    throw new TypeError("Invalid WaniKani Level! It must be a whole number between 1 and 60");
  }
  const params: WKSubjectParameters = {
    hidden: false,
  };
  if (typeof level !== "undefined") {
    params.levels = [level];
  }
  const request = new WKRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).subjects.get(
    params,
  );
  const { headers, method } = request;
  let { url } = request;
  const init = { headers, method };
  let response = await fetch(url, init);
  let subjects = (await response.json()) as WKSubjectCollection | WKError;
  const subjectData: WKSubjectData[] = [];
  let moreSubjects = true;
  while (moreSubjects) {
    if (typeof subjects.data === "undefined" || typeof subjects.pages === "undefined") {
      throw new Error(subjects.error);
    }
    subjects.data.forEach((subject) => {
      subjectData.push(subject.data);
    });
    if (typeof subjects.pages !== "undefined" && subjects.pages.next_url !== null) {
      url = subjects.pages.next_url;
      response = await fetch(url, init);
      subjects = (await response.json()) as WKSubjectCollection | WKError;
    } else {
      moreSubjects = false;
    }
  }
  return subjectData;
}
```

## Get Lessons

Fetches all the info you need to display the lessons, hear pronunciation audio, and which assignments to start after the quiz. It also respects the user's lesson presentation and batch size preferences.

```typescript
import type {
  WKAssignmentCollection,
  WKAssignmentData,
  WKAssignmentParameters,
  WKError,
  WKLevel,
  WKSubjectCollection,
  WKSubjectData,
  WKSubjectParameters,
  WKUser,
} from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { WKRequestFactory, WK_API_REVISION } from "@bachman-dev/wanikani-api-types/dist/v20170710";

interface WaniKaniLesson {
  subject: WKSubjectData;
  assignment: WKAssignmentData;
}

type WaniKaniLessonLevels = Partial<Record<WKLevel, WaniKaniLesson[]>>;

async function getLessons(): Promise<WaniKaniLesson[]> {
  const wk = new WKRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION });
  const userRequest = wk.user.get();
  const { method, headers } = userRequest;
  let { url } = userRequest;
  const init = { headers };
  let response = await fetch(url, init);
  const user = (await response.json()) as WKError | WKUser;
  if (typeof user.data === "undefined") {
    throw new Error(user.error);
  }
  const batchSize = user.data.preferences.lessons_batch_size;
  const ordering = user.data.preferences.lessons_presentation_order;

  const assignmentParams: WKAssignmentParameters = {
    immediately_available_for_lessons: true,
  };

  const assignmentRequest = wk.assignments.get(assignmentParams);

  url = assignmentRequest.url;
  response = await fetch(url, init);
  let assignments = (await response.json()) as WKAssignmentCollection | WKError;
  if (typeof assignments.data === "undefined" || typeof assignments.pages === "undefined") {
    throw new Error(assignments.error);
  }
  const lessonData: WaniKaniLesson[] = [];
  let moreAssignments = true;
  while (moreAssignments) {
    const ids: number[] = [];
    assignments.data.forEach((assignment) => {
      ids.push(assignment.data.subject_id);
    });
    const subjectParams: WKSubjectParameters = {
      ids,
    };
    url = wk.subjects.get(subjectParams);
    response = await fetch(url, init);
    const subjects = (await response.json()) as WKSubjectCollection | WKError;
    if (typeof subjects.data === "undefined") {
      throw new Error(subjects.error);
    } else {
      if (ordering === "shuffled") {
        // Durstenfeld shuffle
        for (let i = assignments.data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [assignments.data[i], assignments.data[j]] = [assignments.data[j], assignments.data[i]];
        }
        assignments.data.forEach((assignment) => {
          const subject = subjects.data.find((subject) => {
            return subject.id === assignment.data.subject_id;
          });
          if (typeof subject === "undefined") {
            throw new Error("Unexpected missing subject from collection!");
          }
          lessonData.push({
            assignment: assignment.data,
            subject: subject.data,
          });
        });
      } else {
        const levels: WaniKaniLessonLevels = {};
        assignments.data.forEach((assignment) => {
          const subject = subjects.data.find((subject) => {
            return subject.id === assignment.data.subject_id;
          });
          if (typeof subject === "undefined") {
            throw new Error("Unexpected missing subject from collection!");
          }
          if (typeof levels[subject.data.level] === "undefined") {
            levels[subject.data.level] = [];
          }
          levels[subject.data.level]?.push({
            assignment: assignment.data,
            subject: subject.data,
          });
        });
        for (const [_key, value] of Object.entries(levels)) {
          if (ordering === "ascending_level_then_shuffled") {
            for (let i = value.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [value[i], value[j]] = [value[j], value[i]];
            }
          } else if (ordering === "ascending_level_then_subject") {
            value.sort((lessonA, lessonB) => {
              return lessonA.subject.lesson_position - lessonB.subject.lesson_position;
            });
          }
          value.forEach((lesson) => {
            lessonData.push(lesson);
          });
        }
      }
    }
    if (typeof assignments.pages !== "undefined" && assignments.pages.next_url !== null) {
      url = assignments.pages.next_url;
      response = await fetch(url, init);
      assignments = (await response.json()) as WKAssignmentCollection | WKError;
      if (typeof assignments.data === "undefined") {
        throw new Error(assignments.error);
      }
    } else {
      moreAssignments = false;
    }
  }
  return lessonData.slice(0, batchSize);
}
```

## Start an Assignment

For instance, the aforementioned assignments you quizzed after getting the lessons above...

```typescript
import type {
  WKAssignment,
  WKAssignmentPayload,
  WKDatableString,
  WKError,
} from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { WKRequestFactory, WK_API_REVISION, isWKDatableString } from "@bachman-dev/wanikani-api-types/dist/v20170710";

async function startAssignment(id: number, started_at?: WKDatableString | Date): Promise<WKAssignment> {
  let payload: WKAssignmentPayload = {};
  if (typeof started_at !== "undefined" && (isWKDatableString(started_at) || started_at instanceof Date)) {
    payload = {
      assignment: {
        started_at,
      },
    };
  }
  const request = new WKRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).assignments.start(
    id,
    payload,
  );
  const { method, url, headers, body } = request;
  const init: RequestInit = {
    method,
    headers,
    body,
  };
  const response = await fetch(url, init);
  if (response.ok) {
    const assignment = (await response.json()) as WKAssignment;
    return assignment;
  } else {
    const error = (await response.json()) as WKError;
    throw new Error(error.error);
  }
}
```

## Create a Review

Later that day, when a review is available, create it against the started assignment(s)...

```typescript
import type {
  WKCreatedReview,
  WKDatableString,
  WKError,
  WKReviewPayload,
} from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { WKRequestFactory, WK_API_REVISION, isWKDatableString } from "@bachman-dev/wanikani-api-types/dist/v20170710";

async function createReview(
  id: number,
  incorrect_meaning_answers = 0,
  incorrect_reading_answers = 0,
  idType: "assignment" | "subject" = "assignment",
  created_at?: WKDatableString | Date,
): Promise<WKCreatedReview> {
  // HTTP Status Code 201 - Accepted
  const accepted = 201;

  let payload: WKReviewPayload = {
    review: {
      assignment_id: id,
      incorrect_meaning_answers,
      incorrect_reading_answers,
    },
  };
  if (idType === "subject") {
    payload = {
      review: {
        subject_id: id,
        incorrect_meaning_answers,
        incorrect_reading_answers,
      },
    };
  }
  if (typeof created_at !== "undefined" && (isWKDatableString(created_at) || created_at instanceof Date)) {
    payload.review.created_at = created_at;
  }

  const request = new WKRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).reviews.create(
    payload,
  );

  const { method, url, headers, body } = request;
  const init: RequestInit = {
    method,
    headers,
    body,
  };
  const response = await fetch(url, init);
  if (response.status === accepted) {
    const createdReview = (await response.json()) as WKCreatedReview;
    return createdReview;
  } else {
    const error = (await response.json()) as WKError;
    throw new Error(error.error);
  }
}
```
