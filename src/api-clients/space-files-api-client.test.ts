import { expect, test, } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { CreateSpaceViewModel } from '../view-models/space-view-models';
import { TEST_CLIENT } from '../test-util';

test('Space Files Client', async () => {
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

    const fileName = 'My Test File.txt';
    const fileContents = 'Testing 123';

    const folderName = 'My Test Folder';

    let space, file, file2, file3, folder;

    try {
        // confirm you can create spaces and find this one
        space = await TEST_CLIENT.spaces().create(createVm);
        expect(space).toMatchObject(createVm);

        // upload a file from a string, validate the name and contents are correct
        file = await TEST_CLIENT.files(space.id).uploadFileFromString({
            name: fileName,
        }, fileContents);
        expect(file.name).toEqual(fileName);
        expect(file.size).toEqual(fileContents.length);

        // make sure you can download the actual file contents
        const downloadedFileContents = await TEST_CLIENT.files(space.id).downloadFileAsString(file.id);
        expect(downloadedFileContents).toEqual(fileContents);

        // make sure you can fetch the file
        const fileFromGet = await TEST_CLIENT.files(space.id).get(file.id);
        expect(fileFromGet).toMatchObject({
            parent_id: undefined,
            is_folder: false,
            name: fileName,
            size: fileContents.length,
        });

        // make sure you can create a folder
        folder = await TEST_CLIENT.files(space.id).addFolder({
            name: folderName,
        });
        expect(folder.name).toEqual(folderName);

        // make sure you can fetch the folder
        const folderFromGet = await TEST_CLIENT.files(space.id).get(folder.id);
        expect(folderFromGet).toMatchObject({
            parent_id: undefined,
            is_folder: true,
            name: folderName,
        });

        // make sure you can upload on top of the file (also testing buffer upload)
        file2 = await TEST_CLIENT.files(space.id).uploadFileFromBuffer({
            name: fileName,
        }, Buffer.from('abc'));
        expect(file2.name).toEqual(fileName);
        expect(file2.size).toEqual(3);
        // make sure you can download the actual file contents (and that they are the same as the buffer contents)
        expect(await TEST_CLIENT.files(space.id).downloadFileAsString(file2.id)).toEqual('abc');

        // validate uploading into a folder
        file3 = await TEST_CLIENT.files(space.id).uploadFileFromBuffer({
            parent_id: folder.id,
            name: 'File3.txt',
        }, Buffer.from('1234'));
        expect(file3.name).toEqual('File3.txt');
        expect(file3.size).toEqual('1234'.length);

        // validate searching in top level and within folder
        const folderResults = await TEST_CLIENT.files(space.id).search({
            parent_id: folder.id,
        });
        expect(folderResults.count).toEqual(1);
        expect(folderResults.results.length).toEqual(1);
        expect(folderResults.results[0].name).toEqual('File3.txt');

        const rootResults = await TEST_CLIENT.files(space.id).search();
        // size is 2 because those two files we uploaded have the same name, so they should become two different file versions.
        // the two files we expect are the `file`.name and `folder`.name
        expect(rootResults.count).toEqual(2);
        expect(rootResults.results.length).toEqual(2);
        expect(rootResults.results[0].name).toEqual(folderName);
        expect(rootResults.results[1].name).toEqual(fileName);
    } finally {
        // delete the file when finished
        if (space && file) await TEST_CLIENT.files(space.id).delete(file.id);
        if (space && file2) await TEST_CLIENT.files(space.id).delete(file2.id);
        if (space && file3) await TEST_CLIENT.files(space.id).delete(file3.id);
        // delete the folder when finished
        if (space && folder) {
            await TEST_CLIENT.files(space.id).delete(folder.id);
        }
        // delete the space when finished
        if (space) {
            await TEST_CLIENT.spaces().delete(space.id);
        }
    }
});