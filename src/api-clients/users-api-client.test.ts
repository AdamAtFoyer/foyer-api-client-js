import { expect, test, } from 'vitest';
import { CreateUserViewModel, UpdateUserViewModel } from '../view-models/user-view-models';
import { v4 as uuidv4 } from 'uuid';
import { TEST_CLIENT, TEST_EMAIL } from '../test-util';

test('Users Client', async () => {
    const uuid = uuidv4();

    const createVm: CreateUserViewModel = {
        email: TEST_EMAIL.replace('@', '+100@'),
        first_name: uuid + 'Test',
        last_name: uuid + 'User',
        phone_number: '555-5555',
        role: 'client',
    };

    const updateVm: UpdateUserViewModel = {
        first_name: uuid + 'Test1',
        last_name: uuid + 'User2',
        phone_number: '1-555-5555',
    };

    let user;

    try {
        // confirm you can create users and find this one
        user = await TEST_CLIENT.users().create({
            ...createVm,
            // adding these other flags adhoc, just to make it easier
            // to compare results (they aren't present in the UserViewModel)
            send_registration_email: false,
            make_default_space: false,
        });
        expect(user).toMatchObject(createVm);

        // confirm you can retrieve the user 
        user = await TEST_CLIENT.users().get(user.id);
        expect(user).toMatchObject(createVm);

        // confirm you can update the user 
        user = await TEST_CLIENT.users().update(user.id, updateVm);
        expect(user).toMatchObject(Object.assign({}, createVm, updateVm));

        // confirm you can search users and find this one
        const searchResponse = await TEST_CLIENT.users().search({
            query: uuid,
        });
        expect(searchResponse.count).toBe(1);
        expect(searchResponse.results[0]).toMatchObject(Object.assign({}, createVm, updateVm));
    } finally {
        // delete the user when finished
        if (user) {
            await TEST_CLIENT.users().delete(user.id);
        }
    }
});