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

export interface WKRequest {
	baseUrl: string;
	body: string | null;
	headers: WKRequestHeaders;
	method: "GET" | "POST" | "PUT";
	url: string;
}

export class WKRequestFactory {
	#assignments: WKAssignmentRequests = {
		get: (idOrParams?: WKAssignmentParameters | number): WKRequest => {
			const headers = { ...this.#getHeaders };
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

	#getHeaders: WKRequestHeaders;

	#levelProgressions: WKLevelProgressionRequests = {
		get: (idOrParams?: WKLevelProgressionParameters | number): WKRequest => {
			const headers = { ...this.#getHeaders };
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
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#postPutHeaders: WKRequestHeaders;

	#baseUrl = "https://api.wanikani.com/v2";

	#body: string | null;

	#method: "GET" | "POST" | "PUT";

	#url: string;

	public constructor(init: WKRequestFactoryInit) {
		this.#getHeaders = {
			Authorization: `Bearer ${init.apiKey}`,
			"Wanikani-Revision": init.revision ?? "20170710",
		};
		this.#body = null;
		if (typeof init.revision !== "undefined") {
			this.#getHeaders["Wanikani-Revision"] = init.revision;
		}
		this.#postPutHeaders = { ...this.#getHeaders };
		this.#postPutHeaders["Content-Type"] = "application/json";
		this.#method = "GET";
		this.#url = this.#baseUrl;
	}

	public get assignments(): WKAssignmentRequests {
		return this.#assignments;
	}

	public get baseUrl(): string {
		return this.#baseUrl;
	}

	public get body(): string | null {
		return this.#body;
	}

	public get headers(): WKRequestHeaders {
		return this.#getHeaders;
	}

	public get levelProgressions(): WKLevelProgressionRequests {
		return this.#levelProgressions;
	}

	public get method(): string {
		return this.#method;
	}

	public get url(): string {
		return this.#url;
	}

	public resets(idOrParams?: WKResetParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/resets`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public reviews(action: "get", idOrParams?: WKReviewParameters | number): this;
	public reviews(action: "create", payload: WKReviewPayload): this;
	public reviews(action: "create" | "get", idOrParamsOrPayload?: WKReviewParameters | WKReviewPayload | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/reviews`;
		this.#body = null;
		if (action === "create") {
			if (typeof idOrParamsOrPayload === "undefined") {
				throw new TypeError("Payload required to create a Review.");
			}
			if (typeof idOrParamsOrPayload === "number") {
				throw new TypeError("Unexpected Review ID when creating a new Review.");
			}
			if (!Object.keys(idOrParamsOrPayload).includes("review")) {
				throw new TypeError("Invalid Review Payload when creating a Review.");
			}
			this.#method = "POST";
			this.#body = JSON.stringify(idOrParamsOrPayload);
		} else if (typeof idOrParamsOrPayload === "number") {
			this.#url += `/${idOrParamsOrPayload}`;
		} else if (typeof idOrParamsOrPayload !== "undefined") {
			this.#url += stringifyParameters(idOrParamsOrPayload as WKReviewParameters);
		}
		this.#toggleRequestContent();
		return this;
	}

	public reviewStatistics(idOrParams?: WKReviewStatisticParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/review_statistics`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public spacedRepetitionSystems(idOrParams?: WKSpacedRepetitionSystemParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/spaced_repetition_systems`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public srs(idOrParams?: WKSpacedRepetitionSystemParameters | number): this {
		return this.spacedRepetitionSystems(idOrParams);
	}

	public studyMaterials(action: "create", payload: WKStudyMaterialCreatePayload): this;
	public studyMaterials(action: "get", idOrParams?: WKStudyMaterialParameters | number): this;
	public studyMaterials(action: "update", id: number, payload: WKStudyMaterialUpdatePayload): this;
	public studyMaterials(
		action: "create" | "get" | "update",
		idOrParamsOrCreatePayload?: WKStudyMaterialCreatePayload | WKStudyMaterialParameters | number,
		updatePayload?: WKStudyMaterialUpdatePayload,
	): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/study_materials`;
		this.#body = null;
		if (action === "create") {
			if (typeof idOrParamsOrCreatePayload === "undefined") {
				throw new TypeError("Study Material Create Payload required to create a Study Material.");
			}
			if (typeof idOrParamsOrCreatePayload === "number") {
				throw new TypeError(
					"Expected Study Material Create Payload, got Study Material ID when creating a Study Material ",
				);
			}
			if (!Object.keys(idOrParamsOrCreatePayload).includes("subject_id")) {
				throw new TypeError("Invalid Study Material Create Payload when creating a Study Material.");
			}
			if (typeof updatePayload !== "undefined") {
				throw new TypeError("Unexpected Study Material Update Payload when creating a Study Material.");
			}
			this.#method = "POST";
			this.#body = JSON.stringify(idOrParamsOrCreatePayload);
		} else if (action === "update") {
			if (typeof idOrParamsOrCreatePayload !== "number") {
				throw new TypeError("Study Material ID required to update a Study Material.");
			}
			if (typeof updatePayload === "undefined") {
				throw new TypeError("Study Material Update Payload required to update a Study Material.");
			}
			this.#method = "PUT";
			this.#url += `/${idOrParamsOrCreatePayload}`;
			this.#body = JSON.stringify(updatePayload);
		} else if (typeof idOrParamsOrCreatePayload === "number") {
			this.#url += `/${idOrParamsOrCreatePayload}`;
		} else if (typeof idOrParamsOrCreatePayload !== "undefined") {
			this.#url += stringifyParameters(idOrParamsOrCreatePayload as WKStudyMaterialParameters);
		}
		this.#toggleRequestContent();
		return this;
	}

	public subjects(idOrParams?: WKSubjectParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/subjects`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public summary(): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/summary`;
		this.#body = null;
		this.#toggleRequestContent();
		return this;
	}

	public user(action: "get"): this;
	public user(action: "update", payload: WKUserPreferencesPayload): this;
	public user(action: "get" | "update", payload?: WKUserPreferencesPayload): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/user`;
		this.#body = null;
		if (action === "update") {
			if (typeof payload === "undefined") {
				throw new TypeError("Payload required to update User.");
			}
			this.#method = "PUT";
			this.#body = JSON.stringify(payload);
		}
		this.#toggleRequestContent();
		return this;
	}

	public voiceActors(idOrParams?: WKVoiceActorParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/voice_actors`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	#toggleRequestContent(): void {
		if (this.#method === "POST" || this.#method === "PUT") {
			this.#getHeaders["Content-Type"] = "application/json";
		} else {
			delete this.#getHeaders["Content-Type"];
			this.#body = null;
		}
	}
}

export interface WKRequestFactoryInit {
	apiKey: string;
	revision?: WKApiRevision;
	userAgent?: string;
}

export interface WKRequestGetOptions {
	ifModifiedSince: string;
	ifNoneMatch: string;
}

export interface WKRequestHeaders {
	Authorization: `Bearer ${string}`;
	"Wanikani-Revision": WKApiRevision;
	Accept?: "application/json";
	"Content-Type"?: "application/json";
	"If-Modified-Since"?: string;
	"If-None-Match"?: string;
	"User-Agent"?: string;
	[customHeaders: string]: string;
}

export interface WKAssignmentRequests {
	get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions) => WKRequest;
	start: (id: number, payload: WKAssignmentPayload) => WKRequest;
}

export interface WKLevelProgressionRequests {
	get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKResetRequests {
	get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKReviewRequests {
	get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions) => WKRequest;
	create: (payload: WKReviewPayload) => WKRequest;
}

export interface WKReviewStatisticRequests {
	get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKSpacedRepetitionSystemRequests {
	get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKStudyMaterialRequests {
	create: (payload: WKStudyMaterialCreatePayload) => WKRequest;
	get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions) => WKRequest;
	update: (id: number, payload: WKStudyMaterialUpdatePayload) => WKRequest;
}

export interface WKSubjectRequests {
	get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKSummaryRequests {
	get: (options?: WKRequestGetOptions) => WKRequest;
}

export interface WKUserRequests {
	get: (options?: WKRequestGetOptions) => WKRequest;
	updatePreferences: (payload: WKUserPreferencesPayload) => WKRequest;
}

export interface WKVoiceActorRequests {
	get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions) => WKRequest;
}
