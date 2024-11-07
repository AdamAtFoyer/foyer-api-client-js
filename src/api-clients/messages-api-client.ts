import { FoyerApiClientSearchRequest, HttpClient } from "../http-client";
import { FoyerApiOKResponse, FoyerApiSearchResponse } from "../response";
import { CreateMessageViewModel, MessageViewModel, MessageViewModelOrderById } from "../view-models/message-view-models";
import { BaseApiClient } from "./base-api-client";

export class MessagesApiClient
    extends BaseApiClient<MessageViewModel, MessageViewModelOrderById> {

    private spaceId: string;

    constructor(httpClient: HttpClient, spaceId: string) {
        super(httpClient);
        this.spaceId = spaceId;
    }

    async create(
        vm: CreateMessageViewModel)
        : Promise<MessageViewModel> {
        return this.restClient.post(vm);
    }

    async get(id: string)
        : Promise<MessageViewModel> {
        return this.restClient.get(id);
    }

    async search(
        search: FoyerApiClientSearchRequest<MessageViewModelOrderById> = {})
        : Promise<FoyerApiSearchResponse<MessageViewModel>> {
        return this.restClient.search(search);
    }

    async delete(id: string): Promise<FoyerApiOKResponse> {
        return this.restClient.delete(id);
    }

    getEndpoint(): string {
        return `spaces/${this.spaceId}/messages`;
    }
}