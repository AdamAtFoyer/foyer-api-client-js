import { FoyerApiClientSearchRequest } from "../http-client";
import { FoyerApiOKResponse, FoyerApiSearchResponse } from "../response";
import { CreateGroupViewModel, GroupViewModel, GroupViewModelOrderById, UpdateGroupViewModel } from "../view-models/group-view-models";
import { BaseApiClient } from "./base-api-client";

export class GroupsApiClient
    extends BaseApiClient<GroupViewModel, GroupViewModelOrderById> {

    async create(
        vm: CreateGroupViewModel)
        : Promise<GroupViewModel> {
        return this.restClient.post(vm);
    }

    async get(id: string)
        : Promise<GroupViewModel> {
        return this.restClient.get(id);
    }

    async getAllClientsGroup()
        : Promise<GroupViewModel> {
        return this.restClient.get('all_clients');
    }

    async getAllStaffGroup()
        : Promise<GroupViewModel> {
        return this.restClient.get('all_staff');
    }

    async getAllAdminsGroup()
        : Promise<GroupViewModel> {
        return this.restClient.get('all_admins');
    }

    async getAllUsersGroup()
        : Promise<GroupViewModel> {
        return this.restClient.get('all_users');
    }

    async update(
        id: string,
        vm: UpdateGroupViewModel)
        : Promise<GroupViewModel> {
        return this.restClient.patch(id, vm);
    }

    async search(
        search: FoyerApiClientSearchRequest<GroupViewModelOrderById> = {})
        : Promise<FoyerApiSearchResponse<GroupViewModel>> {
        return this.restClient.search(search);
    }

    async delete(id: string): Promise<FoyerApiOKResponse> {
        return this.restClient.delete(id);
    }

    getEndpoint(): string {
        return 'groups';
    }
}