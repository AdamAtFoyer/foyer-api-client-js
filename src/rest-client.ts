import { FoyerApiClientSearchRequest, HttpClient } from "./http-client";
import { FoyerApiOKResponse, FoyerApiSearchResponse } from "./response";
import { urlJoin, } from "./util";

/**
 * A client for sending API requests to the Foyer Client Portal REST API that 
 * uses typed view models instead of untyped JSON.
 * 
 * Not all methods are supported for all view models (e.g. you cannot search by 
 * App Customization, but there will be a method for it if you use App Customization as the View Model).
 * 
 * For this reason, this class is intended for internal use only, and only for use behind another API client. 
 */
export class RestClient<ViewModel, OrderById> {
    private readonly httpClient: HttpClient;

    /**
     * The root endpoint for this view model (e.g., for `UserViewModel` this is `/users`)
     * 
     * A function so we can delay looking it up (as it may rely on it's properties which are set later)
     */
    private readonly getEndpoint: () => string;

    constructor(httpClient: HttpClient, getEndpoint: () => string) {
        this.httpClient = httpClient;
        this.getEndpoint = getEndpoint;
    }

    async get(id?: string)
        : Promise<ViewModel> {
        return this.httpClient.request({
            endpoint: id ? urlJoin(this.getEndpoint(), id) : this.getEndpoint(),
            method: 'GET',
        });
    }

    async post<PostViewModel>(vm: PostViewModel)
        : Promise<ViewModel> {
        return this.httpClient.request({
            endpoint: this.getEndpoint(),
            method: 'POST',
            json: vm as object,
        });
    }

    async put<PutViewModel>(id: string, vm: PutViewModel)
        : Promise<ViewModel> {
        return this.httpClient.request({
            endpoint: urlJoin(this.getEndpoint(), id),
            method: 'PUT',
            json: vm as object,
        });
    }

    async patch<PatchViewModel>(id: string, vm: PatchViewModel)
        : Promise<ViewModel> {
        return this.httpClient.request({
            endpoint: urlJoin(this.getEndpoint(), id),
            method: 'PATCH',
            json: vm as object,
        });
    }

    async delete(id?: string)
        : Promise<FoyerApiOKResponse> {
        return this.httpClient.request({
            endpoint: id ? urlJoin(this.getEndpoint(), id) : this.getEndpoint(),
            method: 'DELETE'
        });
    }

    async search(
        search: FoyerApiClientSearchRequest<OrderById> = {})
        : Promise<FoyerApiSearchResponse<ViewModel>> {
        return await this.httpClient.request<FoyerApiSearchResponse<ViewModel>>({
            endpoint: urlJoin(this.getEndpoint(), '/search'),
            method: 'POST',
            json: search,
        });
    }
}