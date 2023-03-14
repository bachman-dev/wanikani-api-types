import type {
	WKApiRevision,
	WKAssignmentParameters,
	WKAssignmentPayload,
	WKLevelProgressionParameters,
	WKResetParameters,
	WKReviewParameters,
	WKReviewPayload,
	WKReviewStatisticParameters,
	WKSpacedRepetitionSystemParameters,
	WKStudyMaterialCreatePayload,
	WKStudyMaterialParameters,
	WKStudyMaterialUpdatePayload,
	WKSubjectParameters,
	WKUserPreferencesPayload,
	WKVoiceActorParameters,
} from "../v20170710.js";
import { stringifyParameters, validateParameters, validatePayload } from "../v20170710.js";

const baseUrl = "https://api.wanikani.com/v2";

/**
 * An object containing all information needed to make a request to the WaniKani API using any HTTP API/library.
 *
 * @see {@link WKRequestFactory}
 * @category Requests
 */
export interface WKRequest {
	/** The base URL of the WaniKani API. */
	baseUrl: string;
	/** The request body, either a string for POST and PUT requests, or `null` for GET requests. */
	body: string | null;
	/** The request headers, including both standard and user-set headers. */
	headers: WKRequestHeaders;
	/** The request's HTTP method. */
	method: "GET" | "POST" | "PUT";
	/** The full URL where the request will be sent to. */
	url: string;
}

/**
 * A factory for preparing requests to the WaniKani API, where the returned {@link WKRequest} can be used in any HTTP
 * API/library to make the request.
 *
 * @category Requests
 */
export class WKRequestFactory {
	/**
	 * Types of Assignment Requests available in the Wanikani API.
	 */
	#assignments: WKAssignmentRequests = {
		/**
		 * Get an Assignment or Assignment Collection from the WaniKani API.
		 * @param idOrParams The Assignment ID for individual Assignments, or parameters for Assignment Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns An Assignment Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/assignments`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Assignment", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},

		/**
		 * Start an Assignment (i.e. move from Lessons to Reviews) via the WaniKani API.
		 * @param id The Assignment ID to start.
		 * @param payload The payload to send when starting the Assignment.
		 * @returns A request to start an Assignment in WaniKani, usable in any HTTP API/library.
		 */
		start: (id: number, payload: WKAssignmentPayload): WKRequest => {
			validatePayload("PUT /assignments/<id>/start", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/assignments/${id}/start`,
			};
			return request;
		},
	};

	/**
	 * The headers that will be added to any GET requests returned by the factory.
	 */
	#getHeaders: WKRequestHeaders;

	/**
	 * Types of Level Progression Requests available in the Wanikani API.
	 */
	#levelProgressions: WKLevelProgressionRequests = {
		/**
		 * Get a Level Progression or Level Progression Collection from the WaniKani API.
		 * @param idOrParams The Level Progression ID for individual Level Progressions, or parameters for Level
		 * Progression  Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Level Progression Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/level_progressions`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Level Progression", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	/**
	 * The headers that will be added to any POST and PUT requests returned by the factory.
	 */
	#postPutHeaders: WKRequestHeaders;

	/**
	 * Types of Reset Requests available in the Wanikani API.
	 */
	#resets: WKResetRequests = {
		/**
		 * Get a Reset or Reset Collection from the WaniKani API.
		 * @param idOrParams The Reset ID for individual Resets, or parameters for Reset Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Reset Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/resets`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Reset", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	/**
	 * Types of Review Requests available in the Wanikani API.
	 */
	#reviews: WKReviewRequests = {
		/**
		 * Get a Review or Review Collection from the WaniKani API.
		 * @param idOrParams The Review ID for individual Review, or parameters for Review Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Review Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/reviews`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Review", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},

		/**
		 * Create a new Review via the WaniKani API.
		 * @param payload The payload to send when creating the Review.
		 * @returns A Create Review Request usabile in any HTTP API/library.
		 */
		create: (payload: WKReviewPayload): WKRequest => {
			validatePayload("POST /reviews", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "POST",
				url: `${baseUrl}/reviews`,
			};
			return request;
		},
	};

	/**
	 * Types of Review Statistic Requests available in the Wanikani API.
	 */
	#reviewStatistics: WKReviewStatisticRequests = {
		/**
		 * Get a Review Statistic or Review Statistic Collection from the WaniKani API.
		 * @param idOrParams The Review Statistic ID for individual Review Statistics , or parameters for Review Statistic
		 * Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Review Statistic Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/review_statistics`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Review Statistic", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	/**
	 * Types of Spaced Repetition System (SRS) Requests available in the Wanikani API.
	 */
	#spacedRepetitionSystems: WKSpacedRepetitionSystemRequests = {
		/**
		 * Get a Spaced Repetition System (SRS) or Spaced Repetition System (SRS) Collection from the WaniKani API.
		 * @param idOrParams The Spaced Repetition System (SRS) ID for individual Spaced Repetition System (SRS), or
		 * parameters for Spaced Repetition System (SRS) Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Spaced Repetition System (SRS) Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/spaced_repetition_systems`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Spaced Repetition System", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	/**
	 * Types of Study Material Requests available in the Wanikani API.
	 */
	#studyMaterials: WKStudyMaterialRequests = {
		/**
		 * Get a Study Material or Study Material Collection from the WaniKani API.
		 * @param idOrParams The Study Material ID for individual Study Materials, or parameters for Study Material
		 * Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Study Material Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/study_materials`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Study Material", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},

		/**
		 * Create a new Study Material for a given Subject via the WaniKani API.
		 * @param payload The payload to send when creating the new Study Material.
		 * @returns A Create Study Material Request usabile in any HTTP API/library.
		 */
		create: (payload: WKStudyMaterialCreatePayload): WKRequest => {
			validatePayload("POST /study_materials", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "POST",
				url: `${baseUrl}/study_materials`,
			};
			return request;
		},

		/**
		 * Update a Study Material for a given Subject.
		 * @param id The Study Material ID to update.
		 * @param payload The payload to send when updating the Study Material.
		 * @returns An Update Study Material Request usabile in any HTTP API/library.
		 */
		update: (id: number, payload: WKStudyMaterialUpdatePayload): WKRequest => {
			validatePayload("PUT /study_materials/<id>", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/study_materials/${id}`,
			};
			return request;
		},
	};

	/**
	 * Types of Subject Requests available in the Wanikani API.
	 */
	#subjects: WKSubjectRequests = {
		/**
		 * Get a Subject or Subject Collection from the WaniKani API.
		 * @param idOrParams The Subject ID for individual Subjects, or parameters for Subject Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Subject Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/subjects`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Subject", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	/**
	 * Types of Summary Requests available in the Wanikani API.
	 */
	#summary: WKSummaryRequests = {
		/**
		 * Get a summary of available and upcoming lessons/reviews from the WaniKani API.
		 *
		 * @param options Options for making GET requests to the API.
		 * @returns A Summary Request usabile in any HTTP API/library.
		 */
		get: (options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/summary`,
			};
			return request;
		},
	};

	/**
	 * Types of User Requests available in the Wanikani API.
	 */
	#user: WKUserRequests = {
		/**
		 * Get a user's information from the WaniKani API.
		 *
		 * @param options Options for making GET requests to the API.
		 * @returns A User Request usabile in any HTTP API/library.
		 */
		get: (options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/user`,
			};
			return request;
		},

		/**
		 * Update a User's Preferences via the WaniKani API.
		 *
		 * @param payload The payload containing changed Preferences to send for the update.
		 * @returns An Update User Preferences Request usabile in any HTTP API/library.
		 */
		updatePreferences: (payload: WKUserPreferencesPayload): WKRequest => {
			validatePayload("PUT /user", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/user`,
			};
			return request;
		},
	};

	/**
	 * Types of Voice Actor Requests available in the Wanikani API.
	 */
	#voiceActors: WKVoiceActorRequests = {
		/**
		 * Get a Voice Actor or Voice Actor Collection from the WaniKani API.
		 * @param idOrParams The Voice Actor ID for individual Voice Actors, or parameters for Voice Actor Collections.
		 * @param options Options for making GET requests to the API.
		 * @returns A Voice Actor Request usabile in any HTTP API/library.
		 */
		get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (typeof options.ifModifiedSince !== "undefined") {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (typeof options.ifNoneMatch !== "undefined") {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/voice_actors`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Voice Actor", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	public constructor(init: WKRequestFactoryInit) {
		this.#getHeaders = {
			Authorization: `Bearer ${init.apiToken}`,
			"Wanikani-Revision": init.revision ?? "20170710",
		};
		if (typeof init.revision !== "undefined") {
			this.#getHeaders["Wanikani-Revision"] = init.revision;
		}
		if (typeof init.userAgent !== "undefined") {
			this.#getHeaders["User-Agent"] = init.userAgent;
		}
		if (typeof init.customHeaders !== "undefined") {
			for (const [key, value] of Object.entries(init.customHeaders)) {
				this.#getHeaders[key] = value;
			}
		}
		this.#postPutHeaders = { ...this.#getHeaders };
		this.#postPutHeaders["Content-Type"] = "application/json";
	}

	/**
	 * Returns a collection of requests pertaining to Assignments on the WaniKani API.
	 */
	public get assignments(): WKAssignmentRequests {
		return this.#assignments;
	}

	/**
	 * Returns a collection of requests pertaining to Level Progressions on the WaniKani API.
	 */
	public get levelProgressions(): WKLevelProgressionRequests {
		return this.#levelProgressions;
	}

	/**
	 * Returns a collection of requests pertaining to Resets on the WaniKani API.
	 */
	public get resets(): WKResetRequests {
		return this.#resets;
	}

	/**
	 * Returns a collection of requests pertaining to Reviews on the WaniKani API.
	 */
	public get reviews(): WKReviewRequests {
		return this.#reviews;
	}

	/**
	 * Returns a collection of requests pertaining to Review Statistics on the WaniKani API.
	 */
	public get reviewStatistics(): WKReviewStatisticRequests {
		return this.#reviewStatistics;
	}

	/**
	 * Returns a collection of requests pertaining to Spaced Repetition Systems (SRS) on the WaniKani API.
	 */
	public get spacedRepetitionSystems(): WKSpacedRepetitionSystemRequests {
		return this.#spacedRepetitionSystems;
	}

	/**
	 * Returns a collection of requests pertaining to Spaced Repetition Systems (SRS) on the WaniKani API.
	 */
	public get srs(): WKSpacedRepetitionSystemRequests {
		return this.#spacedRepetitionSystems;
	}

	/**
	 * Returns a collection of requests pertaining to Study Materials on the WaniKani API.
	 */
	public get studyMaterials(): WKStudyMaterialRequests {
		return this.#studyMaterials;
	}

	/**
	 * Returns a collection of requests pertaining to Subjects on the WaniKani API.
	 */
	public get subjects(): WKSubjectRequests {
		return this.#subjects;
	}

	/**
	 * Returns a collection of requests pertaining to Summaries on the WaniKani API.
	 */
	public get summary(): WKSummaryRequests {
		return this.#summary;
	}

	/**
	 * Returns a collection of requests pertaining to Users on the WaniKani API.
	 */
	public get user(): WKUserRequests {
		return this.#user;
	}

	/**
	 * Returns a collection of requests pertaining to Voice Actors on the WaniKani API.
	 */
	public get voiceActors(): WKVoiceActorRequests {
		return this.#voiceActors;
	}
}

/**
 * Initialization options for a {@link WKRequestFactory}.
 */
export interface WKRequestFactoryInit {
	/** The WaniKani API Token to use in the requests. */
	apiToken: string;
	/** The WaniKani API Revision to use in the requests. */
	revision?: WKApiRevision;
	/** A custom User Agent header to use in the requests. */
	userAgent?: string;
	/** Any additional headers to be added to all requests. */
	customHeaders?: Record<string, string>;
}

/**
 * Options for making GET Requests to the WaniKani API.
 */
export interface WKRequestGetOptions {
	/** Adds an `If-Modified-Since` header to the request. */
	ifModifiedSince?: string;
	/** Adds an `If-None-Match` header to the request. */
	ifNoneMatch?: string;
	/** Custom headers to add to this request only. */
	customHeaders?: Record<string, string>;
}

/**
 * Generally expected HTTP headers when making requests to the WaniKani API.
 */
export interface WKRequestHeaders {
	/** HTTP Authorization header, using a Bearer Token. */
	Authorization: `Bearer ${string}`;
	/** The WaniKani API Revision */
	"Wanikani-Revision": WKApiRevision;
	/** The client should accept JSON as that is how the WaniKani API's response bodies are formatted. */
	Accept?: "application/json";
	/** When making a POST or PUT request, the client should indicate they are sending a JSON request body. */
	"Content-Type"?: "application/json";
	/** An HTTP Date can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
	"If-Modified-Since"?: string;
	/** An HTTP ETag can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
	"If-None-Match"?: string;
	/** A User Agent to better identify who is making the request to the WaniKani API. */
	"User-Agent"?: string;
	[customHeaders: string]: string;
}

/**
 * Types of Assignment Requests available in the Wanikani API.
 *
 * @category Assignments
 * @category Requests
 */
export interface WKAssignmentRequests {
	/**
	 * Get an Assignment or Assignment Collection from the WaniKani API.
	 * @param idOrParams The Assignment ID for individual Assignments, or parameters for Assignment Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns An Assignment Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions) => WKRequest;

	/**
	 * Start an Assignment (i.e. move from Lessons to Reviews) via the WaniKani API.
	 * @param id The Assignment ID to start.
	 * @param payload The payload to send when starting the Assignment.
	 * @returns A request to start an Assignment in WaniKani, usable in any HTTP API/library.
	 */
	start: (id: number, payload: WKAssignmentPayload) => WKRequest;
}

/**
 * Types of Level Progression Requests available in the Wanikani API.
 *
 * @category Level Progressions
 * @category Requests
 */
export interface WKLevelProgressionRequests {
	/**
	 * Get a Level Progression or Level Progression Collection from the WaniKani API.
	 * @param idOrParams The Level Progression ID for individual Level Progressions, or parameters for Level
	 * Progression  Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Level Progression Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Reset Requests available in the Wanikani API.
 *
 * @category Resets
 * @category Requests
 */
export interface WKResetRequests {
	/**
	 * Get a Reset or Reset Collection from the WaniKani API.
	 * @param idOrParams The Reset ID for individual Resets, or parameters for Reset Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Reset Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Review Requests available in the Wanikani API.
 *
 * @category Reviews
 * @category Requests
 */
export interface WKReviewRequests {
	/**
	 * Get a Review or Review Collection from the WaniKani API.
	 * @param idOrParams The Review ID for individual Review, or parameters for Review Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Review Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions) => WKRequest;

	/**
	 * Create a new Review via the WaniKani API.
	 * @param payload The payload to send when creating the Review.
	 * @returns A Create Review Request usabile in any HTTP API/library.
	 */
	create: (payload: WKReviewPayload) => WKRequest;
}

/**
 * Types of Review Statistic Requests available in the Wanikani API.
 *
 * @category Review Statistics
 * @category Requests
 */
export interface WKReviewStatisticRequests {
	/**
	 * Get a Review Statistic or Review Statistic Collection from the WaniKani API.
	 * @param idOrParams The Review Statistic ID for individual Review Statistics , or parameters for Review Statistic
	 * Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Review Statistic Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Spaced Repetition System (SRS) Requests available in the Wanikani API.
 */
export interface WKSpacedRepetitionSystemRequests {
	/**
	 * Get a Spaced Repetition System (SRS) or Spaced Repetition System (SRS) Collection from the WaniKani API.
	 * @param idOrParams The Spaced Repetition System (SRS) ID for individual Spaced Repetition System (SRS), or
	 * parameters for Spaced Repetition System (SRS) Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Spaced Repetition System (SRS) Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Study Material Requests available in the Wanikani API.
 */
export interface WKStudyMaterialRequests {
	/**
	 * Get a Study Material or Study Material Collection from the WaniKani API.
	 * @param idOrParams The Study Material ID for individual Study Materials, or parameters for Study Material
	 * Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Study Material Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions) => WKRequest;

	/**
	 * Create a new Study Material for a given Subject via the WaniKani API.
	 * @param payload The payload to send when creating the new Study Material.
	 * @returns A Create Study Material Request usabile in any HTTP API/library.
	 */
	create: (payload: WKStudyMaterialCreatePayload) => WKRequest;

	/**
	 * Update a Study Material for a given Subject.
	 * @param id The Study Material ID to update.
	 * @param payload The payload to send when updating the Study Material.
	 * @returns An Update Study Material Request usabile in any HTTP API/library.
	 */
	update: (id: number, payload: WKStudyMaterialUpdatePayload) => WKRequest;
}

/**
 * Types of Subject Requests available in the Wanikani API.
 */
export interface WKSubjectRequests {
	/**
	 * Get a Subject or Subject Collection from the WaniKani API.
	 * @param idOrParams The Subject ID for individual Subjects, or parameters for Subject Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Subject Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Summary Requests available in the Wanikani API.
 */
export interface WKSummaryRequests {
	/**
	 * Get a summary of available and upcoming lessons/reviews from the WaniKani API.
	 *
	 * @param options Options for making GET requests to the API.
	 * @returns A Summary Request usabile in any HTTP API/library.
	 */
	get: (options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of User Requests available in the Wanikani API.
 */
export interface WKUserRequests {
	/**
	 * Get a user's information from the WaniKani API.
	 *
	 * @param options Options for making GET requests to the API.
	 * @returns A User Request usabile in any HTTP API/library.
	 */
	get: (options?: WKRequestGetOptions) => WKRequest;

	/**
	 * Update a User's Preferences via the WaniKani API.
	 *
	 * @param payload The payload containing changed Preferences to send for the update.
	 * @returns An Update User Preferences Request usabile in any HTTP API/library.
	 */
	updatePreferences: (payload: WKUserPreferencesPayload) => WKRequest;
}

/**
 * Types of Voice Actor Requests available in the Wanikani API.
 */
export interface WKVoiceActorRequests {
	/**
	 * Get a Voice Actor or Voice Actor Collection from the WaniKani API.
	 * @param idOrParams The Voice Actor ID for individual Voice Actors, or parameters for Voice Actor Collections.
	 * @param options Options for making GET requests to the API.
	 * @returns A Voice Actor Request usabile in any HTTP API/library.
	 */
	get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions) => WKRequest;
}
