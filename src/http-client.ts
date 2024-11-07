import { REGION_TO_API_URL } from "./regions";
import { FoyerApiErrorResponse, FoyerApiResponse } from "./response";
import { urlJoin, } from "./util";

export type FoyerApiClientConfiguration = {
    /**
     * The data residency region your Foyer organization belongs to.
     * Values include: 'us', 'eu', 'au'.
     * 
     * If not supplied, the `url` will be used.
     */
    region?: string,
    /**
     * If no `region` is supplied, this is the API URL where your Foyer organization is hosted.
     */
    url?: string,
    /**
     * Your API key (can be obtained via your organization's "Account" page if you are an admin).
     */
    key: string,
};

type FoyerApiClientRequest = {
    /**
     * The Foyer Client Portal REST API endpoint to use.
     */
    endpoint: string,
    /**
     * The HTTP method to use.
     */
    method?: string,
    /**
     * Additional headers to add to the request.
     */
    headers?: Record<string, string>,
    /**
     * A JSON to send with the request (if POST, PUT, PATCH)
     */
    json?: object,
};

export type FoyerApiClientOrderBySearchRequest<OrderById> = {
    id: OrderById,
    dir: "asc" | "desc",
};

export type FoyerApiClientSearchRequest<OrderById> = {
    query?: string,
    order_by?: FoyerApiClientOrderBySearchRequest<OrderById>[],
    page_size?: number,
    page_number?: number,
};

/**
 * A JSON client for sending API requests to the Foyer Client Portal REST API.
 */
export class HttpClient {
    private readonly url: string;
    private readonly key: string;
    private readonly version: string;
    private readonly verbose: boolean = false;

    constructor(c: FoyerApiClientConfiguration) {
        if (!c.key) {
            throw new FoyerApiClientConfigurationError(`You must pass an API key via the \`key\` parameter.`);
        }

        this.key = c.key;

        // set the API url
        if (c.url) {
            this.url = c.url;
        } else {
            const normalizedRegion = (c.region ?? 'us').toLowerCase();
            this.url = REGION_TO_API_URL[normalizedRegion];
        }

        this.version = 'v1';
    }

    async request<T>(req: FoyerApiClientRequest): Promise<T> {
        const method = (req.method ?? 'GET').toUpperCase();
        const json = req.json;
        const config = {
            method,
            headers: {
                'Authorization': `Basic ${btoa(`${this.key}:`)}`,
                ...(method === 'GET' ? {} : {
                    'Content-Type': 'application/json',
                }),
                ...(req.headers ?? {}),
            },
            ...(method === 'GET' ? {} : {
                body: JSON.stringify(json ?? {}),
            }),
        };
        const url = urlJoin(this.url, this.version, req.endpoint);
        if (this.verbose) {
            console.log('HTTP CLIENT (Request): ', url, config);
        }
        const resp = await fetch(url, config);
        let jo;
        try {
            jo = await resp.json();
        } catch (e) {
            jo = { message: e, }
        }
        const apiResponse = new FoyerApiResponse<T>(resp.status, jo.result);
        if (!apiResponse.isSuccess()) {
            const e = FoyerApiErrorResponse.fromResponse(apiResponse);
            throw new FoyerApiError(`Received HTTP status code ${resp.status}. Error: ${e.message}`, e);
        }
        return apiResponse.value;
    }
}

export class FoyerApiClientConfigurationError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, FoyerApiClientConfigurationError.prototype);
    }
}

export class FoyerApiError extends Error {
    readonly response: FoyerApiErrorResponse;

    constructor(m: string, response: FoyerApiErrorResponse) {
        super(m);
        Object.setPrototypeOf(this, FoyerApiClientConfigurationError.prototype);
        this.response = response
    }
}
