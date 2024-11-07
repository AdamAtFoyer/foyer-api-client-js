import { HttpClient, } from "../http-client";
import { RestClient } from "../rest-client";

export abstract class BaseApiClient<ViewModel, ViewModelOrderById> {
    protected readonly httpClient: HttpClient;
    protected readonly restClient: RestClient<ViewModel, ViewModelOrderById>;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.restClient = new RestClient(httpClient, () => this.getEndpoint());
    }

    protected abstract getEndpoint(): string;
}