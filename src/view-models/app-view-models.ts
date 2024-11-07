/**
 * A View Model of an `App`.
 */
export class AppViewModel {
    id: string;
    config_type: 'global' | 'user';
    label: string;
    icon: string;
    route: string;
    app_type: string;
    updated_at: Date;
    created_at: Date;
};

export class CreateAppViewModel {
    config_type: 'global' | 'user';
    app_type: string;
    label: string;
    icon?: string;
    route?: string;
};

export class UpdateAppViewModel {
    config_type?: 'global' | 'user';
    label: string;
    icon?: string;
    route?: string;
};