/**
 * A response from a Foyer API endpoint.
 */
export class FoyerApiResponse<T> {
    readonly httpCode: number;
    readonly value: T;

    constructor(httpCode: number, value: T) {
        this.httpCode = httpCode;
        this.value = value;
    }

    isSuccess() {
        return this.httpCode === 200;
    }
}

/**
 * The format of the JSON returned from error responses..
 */
type FoyerApiRawErrorResponse = {
    message: string;
};

/**
 * An error response from a Foyer API endpoint.
 */
export class FoyerApiErrorResponse extends FoyerApiResponse<FoyerApiRawErrorResponse> {
    readonly message?: string;

    constructor(httpCode: number, value: FoyerApiRawErrorResponse) {
        super(httpCode, value);
        this.message = value?.message ?? 'An unexpected error occurred.';
    }

    static fromResponse<ViewModel>(response: FoyerApiResponse<ViewModel>) {
        return new FoyerApiErrorResponse(
            response.httpCode,
            response.value as FoyerApiRawErrorResponse);
    }
}

/**
 * The format of the JSON returned from search endpoints.
 */
export type FoyerApiSearchResponse<T> = {
    results: T[],
    count: number,
};

export type FoyerApiOKResponse = {
    message: 'OK'
}