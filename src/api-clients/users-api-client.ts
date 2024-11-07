import { FoyerApiClientSearchRequest } from "../http-client";
import { FoyerApiOKResponse, FoyerApiSearchResponse } from "../response";
import { CreateUserViewModel, UpdateUserViewModel, UserRoleViewModel, UserViewModel, UserViewModelOrderById } from "../view-models/user-view-models";
import { BaseApiClient } from "./base-api-client";

export class UsersApiClient
    extends BaseApiClient<UserViewModel, UserViewModelOrderById> {

    async get(
        id: string)
        : Promise<UserViewModel> {
        return this.restClient.get(id);
    }

    async getMe()
        : Promise<UserViewModel> {
        return this.httpClient.request({
            endpoint: 'me',
        })
    }

    async update(
        id: string,
        vm: UpdateUserViewModel)
        : Promise<UserViewModel> {
        return this.restClient.patch(id, vm);
    }

    async create(
        vm: CreateUserViewModel)
        : Promise<UserViewModel> {
        return this.restClient.post(vm);
    }

    private async createWithFixedRole(
        vm: Omit<CreateUserViewModel, 'role'>,
        role: UserRoleViewModel)
        : Promise<UserViewModel> {
        const x = vm as CreateUserViewModel;
        x.role = role;
        return this.create(x);
    }

    async createGuest(
        vm: Omit<CreateUserViewModel, 'role'>)
        : Promise<UserViewModel> {
        return this.createWithFixedRole(vm, 'guest');
    }

    async createClient(
        vm: Omit<CreateUserViewModel, 'role'>)
        : Promise<UserViewModel> {
        return this.createWithFixedRole(vm, 'client');
    }

    async createStaff(
        vm: Omit<CreateUserViewModel, 'role'>)
        : Promise<UserViewModel> {
        return this.createWithFixedRole(vm, 'staff');
    }

    async createAdmin(
        vm: Omit<CreateUserViewModel, 'role'>)
        : Promise<UserViewModel> {
        return this.createWithFixedRole(vm, 'admin');
    }

    async search(
        search: FoyerApiClientSearchRequest<UserViewModelOrderById> = {})
        : Promise<FoyerApiSearchResponse<UserViewModel>> {
        return this.restClient.search(search);
    }

    async delete(id: string): Promise<FoyerApiOKResponse> {
        return this.restClient.delete(id);
    }

    getEndpoint(): string {
        return 'users';
    }
}