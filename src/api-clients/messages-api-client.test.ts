import { expect, test, } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageViewModel } from '../view-models/message-view-models';
import { TEST_CLIENT } from '../test-util';

test('Messages Client', async () => {
    const uuid = uuidv4();
    let space;
    let message;

    const me = await TEST_CLIENT.users().getMe();

    try {
        // create a space to send messages in (add user as a member)
        space = await TEST_CLIENT.spaces().create({
            name: uuid + ' Test Space',
            members: {
                users: [me.id],
            }
        });

        const createVm: CreateMessageViewModel = {
            content: uuid + ' Test Message',
        };

        // confirm you can send a message and find this one
        message = await TEST_CLIENT.messages(space.id).create(createVm);
        expect(message).toMatchObject(createVm);

        // confirm you can retrieve the message 
        message = await TEST_CLIENT.messages(space.id).get(message.id);
        expect(message).toMatchObject(createVm);

        // confirm you can search messages and find this one
        const searchResponse = await TEST_CLIENT.messages(space.id).search({ query: uuid, });
        // messages don't current return `count`, so just check first message
        expect(searchResponse.results[0]).toMatchObject(createVm);
    } finally {
        // clean up everything we created
        if (space && message) {
            await TEST_CLIENT.messages(space.id).delete(message.id);
        }
        if (space) {
            await TEST_CLIENT.spaces().delete(space.id);
        }
    }
});