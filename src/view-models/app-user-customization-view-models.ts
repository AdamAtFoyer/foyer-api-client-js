/**
 * A View Model of an `AppUserCustomization`.
 */
export class AppUserCustomizationViewModel {
    /** The unique identifier for the customization. */
    id: string;
    /** The `User` this customization applies to. */
    user_id: string;
    /** The `App` this customization applies to. */
    app_id: string;
    /** The App's configuration (JSON). */
    config: object;
    updated_at: Date;
    created_at: Date;
};

export class SetAppUserCustomizationViewModel {
    /** The App's configuration (JSON). */
    config?: object;
};