import { AppUserCustomizationsApiClient } from "./api-clients/app-user-customizations-api-client";
import { AppsApiClient } from "./api-clients/apps-api-client";
import { GroupsApiClient } from "./api-clients/groups-api-client";
import { MessagesApiClient } from "./api-clients/messages-api-client";
import { SpaceFilesApiClient } from "./api-clients/space-files-api-client";
import { SpacesApiClient } from "./api-clients/spaces-api-client";
import { UsersApiClient } from "./api-clients/users-api-client";
import { FoyerApiClientConfiguration, HttpClient } from "./http-client";

export class FoyerApiClient {
    private httpClient: HttpClient;

    constructor(c: FoyerApiClientConfiguration) {
        this.httpClient = new HttpClient(c);
    }

    users = (): UsersApiClient => new UsersApiClient(this.httpClient);
    groups = (): GroupsApiClient => new GroupsApiClient(this.httpClient);
    spaces = (): SpacesApiClient => new SpacesApiClient(this.httpClient);
    files = (spaceId: string): SpaceFilesApiClient => new SpaceFilesApiClient(this.httpClient, spaceId);
    messages = (spaceId: string): MessagesApiClient => new MessagesApiClient(this.httpClient, spaceId);
    apps = (): AppsApiClient => new AppsApiClient(this.httpClient);
    appUserCustomizations =
        (appId: string, userId: string): AppUserCustomizationsApiClient =>
            new AppUserCustomizationsApiClient(this.httpClient, appId, userId);
}