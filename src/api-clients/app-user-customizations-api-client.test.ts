import { expect, test, } from 'vitest';
import { TEST_CLIENT } from '../test-util';
import { CreateAppViewModel } from '../view-models/app-view-models';
import { SetAppUserCustomizationViewModel } from '../view-models/app-user-customization-view-models';

test('App User Customizations Client', async () => {
    const createAppVm: CreateAppViewModel = {
        app_type: '4aa59705-9585-465f-9b99-604682c1d90d', // "Embed" App
        config_type: 'user',
        label: 'Test App',
        icon: 'code',
        route: 'testapp',
    };

    const setVm: SetAppUserCustomizationViewModel = {
        config: {
            'x': 1,
            'y': 2,
            'z': 3,
        },
    };

    const me = await TEST_CLIENT.users().getMe();

    let app,
        cust;

    try {
        // add a new app
        app = await TEST_CLIENT.apps().create(createAppVm);
        expect(app).toMatchObject({ ...createAppVm, effective_route: '/a/' + createAppVm.route, });

        // set user app customization for myself
        cust = await TEST_CLIENT.appUserCustomizations(app.id, me.id).set(setVm);

        // get user app customization for myself
        cust = await TEST_CLIENT.appUserCustomizations(app.id, me.id).get();
        expect(cust).toMatchObject({ ...setVm });
    } finally {
        if (cust) {
            // not actually deleting
            await TEST_CLIENT.appUserCustomizations(app.id, me.id).delete();
        }
        if (app) {
            // not actually deleting
            await TEST_CLIENT.apps().delete(app.id);
        }
    }
});