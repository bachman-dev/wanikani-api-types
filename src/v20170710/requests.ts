import * as v from "valibot";
import { ApiRevision, SafeInteger, stringifyParameters } from "./base.js";
import { AssignmentParameters, AssignmentPayload } from "./assignments.js";
import { ReviewParameters, ReviewPayload } from "./reviews.js";
import { StudyMaterialCreatePayload, StudyMaterialParameters, StudyMaterialUpdatePayload } from "./study-materials.js";
import { LevelProgressionParameters } from "./level-progressions.js";
import { ResetParameters } from "./resets.js";
import { ReviewStatisticParameters } from "./review-statistics.js";
import { SpacedRepetitionSystemParameters } from "./spaced-repetition-systems.js";
import { SubjectParameters } from "./subjects.js";
import { UserPreferencesPayload } from "./user.js";
import { VoiceActorParameters } from "./voice-actors.js";

/**
 * An object containing all information needed to make a request to the WaniKani API using any HTTP API/Library.
 *
 * @see {@link ApiRequestFactory}
 * @category Requests
 */
export interface ApiRequest {
  /** The request body, either `null` for GET requests, or a `string` for POST and PUT requests. */
  body: string | null;
  /** The request headers, including both standard and user-set headers. */
  headers: ApiRequestHeaders;
  /** The request's HTTP method. */
  method: "GET" | "POST" | "PUT";
  /** The full URL where the request will be sent to. */
  url: string;
}

/**
 * A factory for preparing requests to the WaniKani API, with methods that return an {@link ApiRequest} that can be used
 * in any HTTP library/package to make the request.
 *
 * @category Requests
 */
export class ApiRequestFactory {
  /**
   * Types of Assignment Requests available in the WaniKani API.
   */
  public readonly assignments = {
    /**
     * Get an Assignment or Assignment Collection from the WaniKani API.
     * @param idOrParams The Assignment ID for individual Assignments, or parameters for Assignment Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Assignment(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: AssignmentParameters | SafeInteger, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/assignments`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(AssignmentParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },

    /**
     * Start an Assignment (i.e. move from Lessons to Reviews) via the WaniKani API.
     * @param assignmentId The Assignment ID to start.
     * @param payload The payload to send when starting the Assignment.
     * @param options Options for making PUT requests to the API.
     * @returns A Start Assignment Request usable in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or payload is invalid.
     */
    start: (assignmentId: SafeInteger, payload: AssignmentPayload, options?: ApiRequestOptions): ApiRequest => {
      v.assert(SafeInteger, assignmentId);
      v.assert(AssignmentPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(payload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/assignments/${assignmentId}/start`,
      };
      return request;
    },
  };

  /** The base URL of the WaniKani API */
  public readonly baseUrl = "https://api.wanikani.com/v2";

  /**
   * Types of Level Progression Requests available in the WaniKani API.
   */
  public readonly levelProgressions = {
    /**
     * Get a Level Progression or Level Progression Collection from the WaniKani API.
     * @param idOrParams The Level Progression ID for individual Level Progressions, or parameters for Level
     * Progression Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Level Progression(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: LevelProgressionParameters | SafeInteger, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/level_progressions`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(LevelProgressionParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * Types of Reset Requests available in the WaniKani API.
   */
  public readonly resets = {
    /**
     * Get a Reset or Reset Collection from the WaniKani API.
     * @param idOrParams The Reset ID for individual Resets, or parameters for Reset Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Reset(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: ResetParameters | SafeInteger, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/resets`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(ResetParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * Types of Review Statistic Requests available in the WaniKani API.
   */
  public readonly reviewStatistics = {
    /**
     * Get a Review Statistic or Review Statistic Collection from the WaniKani API.
     * @param idOrParams The Review Statistic ID for individual Review Statistics, or parameters for Review Statistic
     * Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Review Statistic(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: ReviewStatisticParameters | SafeInteger, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/review_statistics`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(ReviewStatisticParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * Types of Review Requests available in the WaniKani API.
   */
  public readonly reviews = {
    /**
     * Create a new Review via the WaniKani API.
     * @param payload The payload to send when creating the Review.
     * @param options Options for making POST requests to the API.
     * @returns A Create Review Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if payload is invalid.
     */
    create: (payload: ReviewPayload, options?: ApiRequestOptions): ApiRequest => {
      v.assert(ReviewPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(payload),
        headers,
        method: "POST",
        url: `${this.baseUrl}/reviews`,
      };
      return request;
    },

    /**
     * Get a Review or Review Collection from the WaniKani API.
     * @param idOrParams The Review ID for individual Reviews, or parameters for Review Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Review(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: ReviewParameters | SafeInteger, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/reviews`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(ReviewParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * Types of Spaced Repetition System (SRS) Requests available in the WaniKani API.
   */
  public readonly spacedRepetitionSystems = {
    /**
     * Get a Spaced Repetition System (SRS) or Spaced Repetition System (SRS) Collection from the WaniKani API.
     * @param idOrParams The Spaced Repetition System (SRS) ID for individual Spaced Repetition Systems (SRS), or
     * parameters for Spaced Repetition System (SRS) Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Spaced Repetition System(s) (SRS) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: SafeInteger | SpacedRepetitionSystemParameters, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/spaced_repetition_systems`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(SpacedRepetitionSystemParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * An alias for Spaced Repetition System requests.
   */
  public readonly srs = this.spacedRepetitionSystems;

  /**
   * Types of Study Material Requests available in the WaniKani API.
   */
  public readonly studyMaterials = {
    /**
     * Get a Study Material or Study Material Collection from the WaniKani API.
     * @param idOrParams The Study Material ID for individual Study Materials, or parameters for Study Material
     * Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Study Material(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: SafeInteger | StudyMaterialParameters, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/study_materials`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(StudyMaterialParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },

    /**
     * Create a new Study Material for a given Subject via the WaniKani API.
     * @param payload The payload to send when creating the new Study Material.
     * @param options Options for making POST requests to the API.
     * @returns A Create Study Material Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if payload is invalid.
     */
    create: (payload: StudyMaterialCreatePayload, options?: ApiRequestOptions): ApiRequest => {
      v.assert(StudyMaterialCreatePayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(payload),
        headers,
        method: "POST",
        url: `${this.baseUrl}/study_materials`,
      };
      return request;
    },

    /**
     * Update a Study Material for a given Subject.
     * @param studyMaterialId The Study Material ID to update.
     * @param payload The payload to send when updating the Study Material.
     * @param options Options for making PUT requests to the API.
     * @returns An Update Study Material Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or payload is invalid.
     */
    update: (
      studyMaterialId: SafeInteger,
      payload: StudyMaterialUpdatePayload,
      options?: ApiRequestOptions,
    ): ApiRequest => {
      v.assert(SafeInteger, studyMaterialId);
      v.assert(StudyMaterialUpdatePayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(payload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/study_materials/${studyMaterialId}`,
      };
      return request;
    },
  };

  /**
   * Types of Subject Requests available in the WaniKani API.
   */
  public readonly subjects = {
    /**
     * Get a Subject or Subject Collection from the WaniKani API.
     * @param idOrParams The Subject ID for individual Subjects, or parameters for Subject Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Subject(s) Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: SafeInteger | SubjectParameters, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/subjects`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(SubjectParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * Types of Summary Requests available in the WaniKani API.
   */
  public readonly summary = {
    /**
     * Get a summary of a user's available and upcoming lessons/reviews from the WaniKani API.
     *
     * @param options Options for making GET requests to the API.
     * @returns A Get Summary Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     */
    get: (options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/summary`,
      };
      return request;
    },
  };

  /**
   * Types of User Requests available in the WaniKani API.
   */
  public readonly user = {
    /**
     * Get a user's information from the WaniKani API.
     *
     * @param options Options for making GET requests to the API.
     * @returns A Get User Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     */
    get: (options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/user`,
      };
      return request;
    },

    /**
     * Update a User's Preferences via the WaniKani API.
     *
     * @param payload The payload containing changed Preferences to send for the update.
     * @param options Options for making PUT requests to the API.
     * @returns An Update User Preferences Request usabile in any HTTP API/Library.
     * @throws A `TypeError` if trying to set type-checked request headers.
     * @throws A {@link valibot!ValiError} if payload is invalid.
     */
    updatePreferences: (payload: UserPreferencesPayload, options?: ApiRequestOptions): ApiRequest => {
      v.assert(UserPreferencesPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(payload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/user`,
      };
      return request;
    },
  };

  /**
   * Types of Voice Actor Requests available in the WaniKani API.
   */
  public readonly voiceActors = {
    /**
     * Get a Voice Actor or Voice Actor Collection from the WaniKani API.
     * @param idOrParams The Voice Actor ID for individual Voice Actors, or parameters for Voice Actor Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Voice Actor(s) Request usabile in any HTTP API/Library.
     * @throws A {@link valibot!ValiError} if ID or parameters are invalid.
     */
    get: (idOrParams?: SafeInteger | VoiceActorParameters, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/voice_actors`,
      };
      if (typeof idOrParams === "number") {
        v.assert(SafeInteger, idOrParams);
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        v.assert(VoiceActorParameters, idOrParams);
        request.url += stringifyParameters(idOrParams);
      }
      return request;
    },
  };

  /**
   * The headers set on factory initialization, excluding anything in the `customHeaders` property in
   * {@link ApiRequestFactoryInit}.
   */
  private readonly _initHeaders: ApiRequestHeaders;

  /**
   * The headers that will be added to any GET requests returned by the factory.
   */
  private _getHeaders: ApiRequestHeaders;

  /**
   * The headers that will be added to any POST and PUT requests returned by the factory.
   */
  private _postPutHeaders: ApiRequestHeaders;

  /**
   * Initialize the Request Factory.
   * @param init Initialization options for the factory.
   * @throws A `TypeError` if trying to set type-checked request headers.
   */
  public constructor(init: ApiRequestFactoryInit) {
    this._initHeaders = {
      authorization: `Bearer ${init.apiToken}`,
      "wanikani-revision": init.revision ?? "20170710",
    };
    this._getHeaders = { ...this._initHeaders };
    this._postPutHeaders = { ...this._initHeaders };
    if (typeof init.customHeaders !== "undefined") {
      for (const [key, value] of Object.entries(init.customHeaders)) {
        ApiRequestFactory._validateHeader(key, value);
        this._getHeaders[key] = value;
        this._postPutHeaders[key] = value;
      }
    }
    this._postPutHeaders["content-type"] = "application/json";
  }

  /**
   * Validates custom-set headers to make sure type checking isn't circumvented.
   * @param key The header key, e.g. `Accpet` or `X-Forwarded-For`
   * @param value The header value, e.g. `application/json` or `192.168.1.1`
   * @throws A `TypeError` if trying to set type-checked request headers.
   * @internal
   */
  private static _validateHeader(key: string, value: string): void {
    if (key.toLowerCase() === "authorization") {
      throw new TypeError("WaniKani API Token should be set via setApiToken() method.");
    } else if (key.toLowerCase() === "wanikani-revision") {
      throw new TypeError("WaniKani API Revision should be set via setApiRevision() method.");
    } else if (
      (key.toLowerCase() === "accept" || key.toLowerCase() === "content-type") &&
      value !== "application/json"
    ) {
      throw new TypeError(`The "${key}" header must be set to "application/json" .`);
    }
  }

  /**
   * Add additional custom headers to be used in all requests generated by the factory.
   * @param headers An object containing HTTP headers and their values.
   * @returns The factory, with the added custom headers.
   * @throws A `TypeError` if trying to set type-checked request headers.
   */
  public addCustomHeaders(headers: Record<string, string>): this {
    for (const [key, value] of Object.entries(headers)) {
      ApiRequestFactory._validateHeader(key, value);
      this._getHeaders[key] = value;
      this._postPutHeaders[key] = value;
    }
    return this;
  }

  /**
   * Sets a new WaniKani API Revision to use in requests returned by the factory.
   * @param revision The WaniKani API Revision to use.
   * @returns The factory, with the newly set WaniKani API Revision.
   * @throws A {@link valibot!ValiError} if the WaniKani API Revision is invalid.
   */
  public setApiRevision(revision: ApiRevision): this {
    const validRevision = v.parse(ApiRevision, revision);
    this._initHeaders["wanikani-revision"] = validRevision;
    this._getHeaders["wanikani-revision"] = validRevision;
    this._postPutHeaders["wanikani-revision"] = validRevision;
    return this;
  }

  /**
   * Sets a new WaniKani API Token to use in requests returned by the factory.
   * @param token The new WaniKani API Token to use.
   * @returns The factory, with the newly set WaniKani API Token.
   */
  public setApiToken(token: string): this {
    this._initHeaders.authorization = `Bearer ${token}`;
    this._getHeaders.authorization = `Bearer ${token}`;
    this._postPutHeaders.authorization = `Bearer ${token}`;
    return this;
  }

  /**
   * Sets the custom headers for all requests gerated by the factory to those passed to this function, removing any
   * previously set custom headers, and keeping API Revision and Token settings.
   * @param headers An object containing HTTP headers and their values.
   * @returns The factory, with the only custom headers being those passed to this function.
   * @throws A `TypeError` if trying to set type-checked request headers.
   */
  public setCustomHeaders(headers: Record<string, string>): this {
    this._getHeaders = { ...this._initHeaders };
    this._postPutHeaders = { ...this._initHeaders };
    for (const [key, value] of Object.entries(headers)) {
      ApiRequestFactory._validateHeader(key, value);
      this._getHeaders[key] = value;
      this._postPutHeaders[key] = value;
    }
    this._postPutHeaders["content-type"] = "application/json";
    return this;
  }
}

/**
 * Initialization options for a {@link ApiRequestFactory}.
 *
 * @category Requests
 */
export interface ApiRequestFactoryInit {
  /** The WaniKani API Token to use in the requests. */
  apiToken: string;
  /** Any additional headers to be added to all requests. */
  customHeaders?: Record<string, string>;
  /**
   * The WaniKani API Revision to use in the requests; if not set, the factory will default to the current API Revision.
   */
  revision?: ApiRevision;
}

/**
 * Options for making GET Requests to the WaniKani API.
 *
 * @category Requests
 */
export interface ApiRequestOptions {
  /** Custom headers to add to this request only. */
  customHeaders?: Record<string, string>;
}

/**
 * Generally expected HTTP headers when making requests to the WaniKani API.
 *
 * @category Requests
 */
export interface ApiRequestHeaders {
  /** HTTP Authorization header, using a Bearer Token. */
  authorization: `Bearer ${string}`;
  /** The WaniKani API Revision. */
  "wanikani-revision": ApiRevision;
  [customHeaders: string]: string | undefined;
  /** The client should accept JSON as that is how the WaniKani API's response bodies are formatted. */
  accept?: "application/json";
  /** When making a POST or PUT request, the client should indicate they are sending a JSON request body. */
  "content-type"?: "application/json";
  /** An HTTP Date can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "if-modified-since"?: string;
  /** An HTTP ETag can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "if-none-match"?: string;
  /** A User Agent to better identify who is making the request to the WaniKani API. */
  "user-agent"?: string;
}
