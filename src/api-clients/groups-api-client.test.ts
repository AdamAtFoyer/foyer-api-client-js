import { expect, test, } from 'vitest';
import { FoyerApiClient } from '../api-client';
import { v4 as uuidv4 } from 'uuid';
import { CreateGroupViewModel, UpdateGroupViewModel } from '../view-models/group-view-models';
import { TEST_CLIENT } from '../test-util';

test('Groups Client', async () => {
    const uuid = uuidv4();

    // get some user ids (that we will use when testing -- to be passed in as `members`)
    const userSearchResponse = await TEST_CLIENT.users().search({ page_size: 5, });

    const createVm: CreateGroupViewModel = {
        name: uuid + 'Name',
        users: userSearchResponse.results.map(x => x.id),
        avatar: 'myimage',
    };

    const updateVm: UpdateGroupViewModel = {
        name: uuid + 'NewName',
        users: [],
        avatar: 'myimage2',
    };

    let group;

    try {
        // confirm you can create groups and find this one
        group = await TEST_CLIENT.groups().create(createVm);
        expect(group).toMatchObject(createVm);

        // confirm you can retrieve the group 
        group = await TEST_CLIENT.groups().get(group.id);
        expect(group).toMatchObject(createVm);

        // confirm you can update the group 
        group = await TEST_CLIENT.groups().update(group.id, updateVm);
        expect(group).toMatchObject(Object.assign({}, createVm, updateVm));

        // confirm you can search groups and find this one
        const searchResponse = await TEST_CLIENT.groups().search({
            query: uuid,
        });
        expect(searchResponse.count).toBe(1);
        expect(searchResponse.results[0]).toMatchObject(Object.assign({}, createVm, updateVm));
    } finally {
        // delete the group when finished
        if (group) {
            await TEST_CLIENT.groups().delete(group.id);
        }
    }
});