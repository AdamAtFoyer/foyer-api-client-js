export type UserRoleViewModel = 'guest' | 'client' | 'staff' | 'admin';
export type UserViewModelOrderById = 'email' | 'first_name' | 'last_name' | 'created_at';
/**
 * A View Model of a User.
 * 
 * There are 4 different types of users: guests, clients, staff, and admins.
 * Each have their own built-in permissions and levels of access.
 */
export class UserViewModel {
    id: string;
    email: string;
    role: UserRoleViewModel;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
};

export class CreateUserViewModel {
    email: string;
    first_name?: string;
    last_name?: string;
    role: UserRoleViewModel;
    phone_number?: string;
    avatar?: string;
    /**
     * If true, an invitation email will be sent to this user.
     * Their invitation includes instructions on how to set their password.
     * Your invitation emails can be customized on the "Org" page (if you're an admin).
     */
    send_registration_email?: boolean;
    /**
     * If true, an invitation email will be sent to this user.
     * Their invitation includes instructions on how to set their password.
     * Your invitation emails can be customized on the "Org" page (if you're an admin).
     */
    make_default_space?: boolean;
};

export class UpdateUserViewModel {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    avatar?: string;
};