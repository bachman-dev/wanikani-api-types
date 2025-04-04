---
title: Examples
category: Guides
---

# Examples

Below are some code examples to illustrate the various types, constants, and functions available in the library.

Keep in mind these are very simple examples, and you might want to make additional considerations such as rate limiting logic, more robust error handling, etc.

## Set Your WaniKani API Key in The Environment

These examples all assume you've set an environment variable, `WANIKANI_API_TOKEN`, for API authorization. Add the following code before using these examples pertaining to your JavaScript runtime.

```typescript
// NodeJS / Deno: Run with --env-file option
// Bun: Reads .env automatically, else use --env-file option
const WANIKANI_API_TOKEN = process.env("WANIKANI_API_TOKEN");
```

## Get a 24-Hour Review Forecast

Maybe you want a bar/line graph of your review workload for the day...

```typescript
import * as WK from "@bachman-dev/wanikani-api-types/v20170710";

interface WaniKaniReviewForecast {
  date: Date;
  reviews: number;
}

async function reviewForecast(): Promise<WaniKaniReviewForecast[]> {
  const request = new ApiRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).summary.get();
  const { method, url, headers } = request;
  const init = { method, headers };
  const response = await fetch(url, init);
  if (response.ok) {
    const summary = await response.json();
    if (WK.isSummary(summary)) {
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
      throw new Error("Unexpected returned data from WaniKani API");
    }
  } else {
    const error = await response.json();
    if (WK.isApiError(error)) {
      throw new Error(error.error);
    } else {
      throw new Error("Unknown WaniKani API Error");
    }
  }
}
```

## Get Subjects by Optional Level

A very wide collection of subjects, but can be limited by level.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types/v20170710";

async function getSubjects(level?: WK.Level): Promise<WK.Subject[]> {
  const params: WK.SubjectParameters = {
    hidden: false,
  };
  if (typeof level === "number") {
    params.levels = [level];
  }
  const request = new ApiRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).subjects.get(
    params,
  );
  const { headers, method } = request;
  let { url } = request;
  const init = { headers, method };
  let response = await fetch(url, init);
  let json = await response.json();
  const subjects: WK.Subject[] = [];
  let moreSubjects = true;
  while (moreSubjects) {
    if (WK.isSubjectCollection(json)) {
      json.data.forEach((subject) => {
        subjects.push(subject);
      });
      if (json.pages.next_url !== null) {
        url = json.pages.next_url;
        response = await fetch(url, init);
        json = await response.json();
      } else {
        moreSubjects = false;
      }
    } else if (WK.isApiError(json)) {
      throw new Error(json.error);
    } else {
      throw new Error("Unknown WaniKani API Error");
    }
  }
  return subjects;
}
```

## Get Lessons

Fetches all the info you need to display the lessons, hear pronunciation audio, and which assignments to start after the quiz. It also respects the user's lesson batch size preferences.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types/v20170710";

interface WaniKaniLesson {
  subject: WK.Subject;
  assignment: WK.Assignment;
}

type WaniKaniLessonLevels = Partial<Record<WK.Level, WaniKaniLesson[]>>;

async function getLessons(): Promise<WaniKaniLesson[]> {
  const factory = new WK.ApiRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION });
  const userRequest = factory.user.get();
  const { method, headers } = userRequest;
  let { url } = userRequest;
  const init = { headers };
  let response = await fetch(url, init);
  const user = await response.json();
  if (WK.isUser(user)) {
    const lessonData: WaniKaniLesson[] = [];
    const batchSize = user.data.preferences.lessons_batch_size;
    const assignmentParams: WK.AssignmentParameters = {
      immediately_available_for_lessons: true,
    };
    const assignmentRequest = factory.assignments.get(assignmentParams);
    url = assignmentRequest.url;
    response = await fetch(url, init);
    let assignments = await response.json();
    let moreAssignments = true;
    while (moreAssignments) {
      if (WK.isAssignmentCollection(assignments)) {
        const ids: number[] = [];
        assignments.data.forEach((assignment) => {
          ids.push(assignment.data.subject_id);
        });
        const subjectParams: WK.SubjectParameters = {
          ids,
        };
        url = factory.subjects.get(subjectParams);
        response = await fetch(url, init);
        const subjects = await response.json();
        if (WK.isSubjectCollection(subjects)) {
          const levels: WaniKaniLessonLevels = {};
          assignments.data.forEach((assignment) => {
            const subject = subjects.data.find((subject) => subject.id === assignment.data.subject_id);
            if (typeof subject === "undefined") {
              throw new Error("Unexpected missing subject from collection!");
            }
            if (typeof levels[subject.data.level] === "undefined") {
              levels[subject.data.level] = [];
            }
            levels[subject.data.level]?.push({
              assignment,
              subject,
            });
          });
          for (const [_key, value] of Object.entries(levels)) {
            value
              .sort((lessonA, lessonB) => {
                return lessonA.subject.lesson_position - lessonB.subject.lesson_position;
              })
              .forEach((lesson) => {
                lessonData.push(lesson);
              });
          }
        } else if (WK.isApiError(subjects)) {
          throw new Error(subjects.error);
        } else {
          throw new Error("Unknown WaniKani API Error when Getting Subjects");
        }
        if (typeof assignments.pages !== "undefined" && assignments.pages.next_url !== null) {
          url = assignments.pages.next_url;
          response = await fetch(url, init);
          assignments = await response.json();
        } else {
          moreAssignments = false;
        }
      } else if (WK.isApiError(assignments)) {
        throw new Error(assignments.error);
      } else {
        throw new Error("Unknown WaniKani API Error when Getting Assignments");
      }
    }
    return lessonData.slice(0, batchSize);
  } else if (WK.isApiError(user)) {
    throw new Error(user.error);
  } else {
    throw new Error("Unknown WaniKani API Error when Getting User");
  }
}
```

## Start an Assignment

For instance, the aforementioned assignments you quizzed after getting the lessons above...

```typescript
import {
  type WKAssignment,
  type WKAssignmentPayload,
  type WKDatableString,
  type ApiError,
  ApiRequestFactory,
  WK_API_REVISION,
  isWKDatableString,
} from "@bachman-dev/wanikani-api-types/v20170710";

async function startAssignment(id: number, started_at?: WKDatableString | Date): Promise<WKAssignment> {
  let payload: WKAssignmentPayload = {};
  if (typeof started_at !== "undefined" && (isWKDatableString(started_at) || started_at instanceof Date)) {
    payload = {
      assignment: {
        started_at,
      },
    };
  }
  const request = new ApiRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).assignments.start(
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
    const error = (await response.json()) as ApiError;
    throw new Error(error.error);
  }
}
```

## Create a Review

Later that day, when a review is available, create it against the started assignment(s)...

```typescript
import {
  type WKCreatedReview,
  type WKDatableString,
  type ApiError,
  ApiRequestFactory,
  type WKReviewPayload,
  WK_API_REVISION,
  isWKDatableString,
} from "@bachman-dev/wanikani-api-types/v20170710";

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

  const request = new ApiRequestFactory({ apiToken: WANIKANI_API_TOKEN, revision: WK_API_REVISION }).reviews.create(
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
    const error = (await response.json()) as ApiError;
    throw new Error(error.error);
  }
}
```
