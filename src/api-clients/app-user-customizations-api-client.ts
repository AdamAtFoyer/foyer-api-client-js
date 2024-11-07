import { HttpClient } from "../http-client";
import { FoyerApiOKResponse } from "../response";
import { AppUserCustomizationViewModel, SetAppUserCustomizationViewModel } from "../view-models/app-user-customization-view-models";
import { BaseApiClient } from "./base-api-client";

export class AppUserCustomizationsApiClient
    extends BaseApiClient<AppUserCustomizationViewModel, unknown> {

    private appId: string;
    private userId: string;

    constructor(httpClient: HttpClient, appId: string, userId: string) {
        super(httpClient);
        this.appId = appId;
        this.userId = userId;
    }

    async get(): Promise<AppUserCustomizationViewModel> {
        return this.restClient.get();
    }

    async set(vm: SetAppUserCustomizationViewModel): Promise<AppUserCustomizationViewModel> {
        return this.httpClient.request({
            endpoint: this.getEndpoint(),
            method: 'PUT',
            json: vm,
        });

    }

    async delete(): Promise<FoyerApiOKResponse> {
        return this.restClient.delete();
    }

    getEndpoint(): string {
        return `apps/${this.appId}/users/${this.userId}`;
    }
}