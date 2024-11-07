import { FoyerApiClientSearchRequest } from "../http-client";

export type SpaceViewModelOrderById = 'name' | 'created_at';

export type SpacesSearchRequest = { member_filters?: SpacesSearchRequestMemberFilter[] } & FoyerApiClientSearchRequest<SpaceViewModelOrderById>;

/**
 * For searching for Spaces with particular members (whether it be a user or group).
 */
export type SpacesSearchRequestMemberFilter = { user_id: string } | { group_id: string };

/**
 * A View Model of a Space.
 * 
 * Spaces are secure places for file sharing and messaging with clients and staff.
 * You can choose which users and groups a Space is shared with via the `members` field.
 */
export class SpaceViewModel {
    id: string;
    /**
     * The name of the Space (if left empty, a default name is generated based off the `members`).
     */
    name?: string;
    members?: {
        /**
         * The `id`s of every user in this space.
         */
        users?: string[],
        /**
         * The `id`s of every group in this space.
         */
        groups?: string[],
    };
    created_at: Date;
    updated_at: Date;
};

export class CreateSpaceViewModel {
    /**
     * The name of the Space (if left empty, a default name is generated based off the `members`).
     */
    name?: string;
    members?: {
        /**
         * The `id`s of every user in this space.
         */
        users?: string[],
        /**
         * The `id`s of every group in this space.
         */
        groups?: string[],
    };
};

export class UpdateSpaceViewModel {
    /**
     * The name of the Space (if left empty, a default name is generated based off the `members`).
     */
    name?: string;
    members?: {
        /**
         * The `id`s of every user in this space.
         */
        users?: string[],
        /**
         * The `id`s of every group in this space.
         */
        groups?: string[],
    };
};

/**
 * The response given when calling the endpoint to retrieve
 * a SAS token for a `Space`.
 */
export class GetSasResponse {
    url: string;
    token: string;
}