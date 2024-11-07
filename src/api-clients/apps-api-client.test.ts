import { expect, test, } from 'vitest';
import { CreateAppViewModel, UpdateAppViewModel } from '../view-models/app-view-models';
import { TEST_CLIENT } from '../test-util';

test('Apps Client', async () => {
    // make sure we can list apps
    const apps = await TEST_CLIENT.apps().list();
    expect(apps.length).toBeGreaterThan(0);

    // make sure the apps we can get via `apps().get()` is the same that is returned from list
    const firstApp = apps[0];
    expect(firstApp).toEqual(await TEST_CLIENT.apps().get(firstApp.id));

    const createVm: CreateAppViewModel = {
        app_type: '4aa59705-9585-465f-9b99-604682c1d90d', // "Embed" App
        config_type: 'user',
        label: 'Test App',
        icon: 'code',
        route: 'testapp', // current issue is that the route is returning with /a/route but sent with /route ... 
    };

    const updateVm: UpdateAppViewModel = {
        label: 'Test App (Updated)',
        route: 'testappupdated',
    };

    let app;

    try {
        // make sure you can add an app
        app = await TEST_CLIENT.apps().create(createVm);
        expect(app).toMatchObject({ ...createVm, effective_route: '/a/' + createVm.route, });


        // confirm you can update the app 
        app = await TEST_CLIENT.apps().update(app.id, updateVm);
        expect(app).toMatchObject(Object.assign({}, createVm, updateVm));
    } finally {
        if (app) {
            // not actually deleting
            TEST_CLIENT.apps().delete(app.id);
        }
    }
});