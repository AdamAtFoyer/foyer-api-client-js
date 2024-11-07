import { expect, test, } from 'vitest';
import { FoyerApiClient } from '../api-client';
import { v4 as uuidv4 } from 'uuid';
import { CreateSpaceViewModel, UpdateSpaceViewModel } from '../view-models/space-view-models';
import { TEST_CLIENT } from '../test-util';

test('Spaces Client', async () => {
    const uuid = uuidv4();

    // get some user ids (that we will use when testing -- to be passed in as `members`)
    const userSearchResponse = await TEST_CLIENT.users().search({ page_size: 5, });
    const groupSearchResponse = await TEST_CLIENT.groups().search({ page_size: 5, });

    const createVm: CreateSpaceViewModel = {
        name: uuid + 'Name',
        members: {
            users: userSearchResponse.results.map(x => x.id),
            groups: groupSearchResponse.results.map(x => x.id),
        },
    };

    const updateVm: UpdateSpaceViewModel = {
        name: uuid + 'Name Updated',
        members: {
            users: userSearchResponse.results.slice(0, 2).map(x => x.id),
            groups: [],
        },
    };

    let space;

    try {
        // confirm you can create spaces and find this one
        space = await TEST_CLIENT.spaces().create(createVm);
        expect(space).toMatchObject(createVm);

        // confirm you can retrieve the space 
        space = await TEST_CLIENT.spaces().get(space.id);
        expect(space).toMatchObject(createVm);

        // confirm you can retrieve a SAS token for the Space
        const getSasResponse = await TEST_CLIENT.spaces().getSas(space.id);
        expect(getSasResponse.token).toBeTruthy();
        expect(new URL(getSasResponse.url)).toBeTruthy();

        // confirm you can update the space 
        space = await TEST_CLIENT.spaces().update(space.id, updateVm);
        expect(space).toMatchObject(Object.assign({}, createVm, updateVm));

        // confirm you can search spaces and find this one
        const searchResponse = await TEST_CLIENT.spaces().search({ query: uuid, });
        expect(searchResponse.count).toBe(1);
        expect(searchResponse.results[0]).toMatchObject(Object.assign({}, createVm, updateVm));
    } finally {
        // delete the space when finished
        if (space) {
            await TEST_CLIENT.spaces().delete(space.id);
        }
    }
});