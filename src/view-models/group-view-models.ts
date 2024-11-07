export type GroupViewModelOrderById = 'name' | 'created_at';
/**
 * A View Model of a Group.
 * 
 * Groups are collections of `User`s that can be used throughout Foyer.
 * For example, Groups can be added to Spaces to manage access to files and 
 * messages for multiple users at once.
 */
export class GroupViewModel {
    id: string;
    /**
     * The name of the `Group`.
     */
    name: string;
    /**
     * The `id`s of every user in this `Group`.
     */
    users: string[];
    /**
     * The logo to use for this `Group`.
     */
    avatar: string;
    created_at: Date;
    updated_at: Date;
};

export class CreateGroupViewModel {
    /**
     * The name of the `Group`.
     */
    name: string;
    /**
     * The `id`s of every user in this `Group`.
     */
    users?: string[];
    /**
     * The logo to use for this `Group`.
     */
    avatar?: string;
};

export class UpdateGroupViewModel {
    /**
     * The name of the `Group`.
     */
    name?: string;
    /**
     * The `id`s of every user in this `Group`.
     */
    users?: string[];
    /**
     * The logo to use for this `Group`.
     */
    avatar?: string;
};