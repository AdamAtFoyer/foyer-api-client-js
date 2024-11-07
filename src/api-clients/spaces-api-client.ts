import { FoyerApiClientSearchRequest } from "../http-client";
import { FoyerApiOKResponse, FoyerApiSearchResponse } from "../response";
import { CreateSpaceViewModel, GetSasResponse, SpacesSearchRequest, SpaceViewModel, SpaceViewModelOrderById, UpdateSpaceViewModel } from "../view-models/space-view-models";
import { BaseApiClient } from "./base-api-client";

export class SpacesApiClient
    extends BaseApiClient<SpaceViewModel, SpaceViewModelOrderById> {

    async get(
        id: string)
        : Promise<SpaceViewModel> {
        return this.restClient.get(id);
    }

    async getSas(id: string)
        : Promise<GetSasResponse> {
        return this.httpClient.request({
            endpoint: `spaces/${id}/sas`,
        });
    }

    async update(
        id: string,
        vm: UpdateSpaceViewModel)
        : Promise<SpaceViewModel> {
        return this.restClient.patch(id, vm);
    }

    async create(
        vm: CreateSpaceViewModel)
        : Promise<SpaceViewModel> {
        return this.restClient.post(vm);
    }

    async search(
        search: SpacesSearchRequest = {})
        : Promise<FoyerApiSearchResponse<SpaceViewModel>> {
        return this.restClient.search(search);
    }

    async delete(id: string): Promise<FoyerApiOKResponse> {
        return this.restClient.delete(id);
    }

    getEndpoint(): string {
        return 'spaces';
    }
}