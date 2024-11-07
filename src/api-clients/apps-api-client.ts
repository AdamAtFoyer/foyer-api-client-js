import { FoyerApiOKResponse } from "../response";
import { AppViewModel, CreateAppViewModel, UpdateAppViewModel } from "../view-models/app-view-models";
import { BaseApiClient } from "./base-api-client";

export class AppsApiClient
    extends BaseApiClient<AppViewModel, unknown> {

    async list(): Promise<AppViewModel[]> {
        return this.httpClient.request({
            endpoint: this.getEndpoint(),
            method: 'GET',
        });
    }

    async create(vm: CreateAppViewModel)
        : Promise<AppViewModel> {
        return this.restClient.post(vm);
    }

    async update(
        id: string,
        vm: UpdateAppViewModel)
        : Promise<AppViewModel> {
        return this.restClient.patch(id, vm);
    }

    async get(id: string): Promise<AppViewModel> {
        return this.restClient.get(id);
    }

    async delete(id: string): Promise<FoyerApiOKResponse> {
        return this.restClient.delete(id);
    }

    getEndpoint(): string {
        return `apps`;
    }
}