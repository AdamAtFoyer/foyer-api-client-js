# Foyer Client Portal API Client for JavaScript (Browser and NodeJS)

This library allows you to interact programmatically with the [Foyer Client Portal REST API](https://usefoyer.com/api).

It provides TypeScript types and helper functions, making it easy to integrate the [Foyer](https://usefoyer.com) client portal's secure document sharing, messaging, and user management into your own applications.

## Overview
The Foyer API Client is designed to simplify the implementation of secure, interactive portals for client collaboration. With this client, you can:

- Create, manage, and organize users and groups.
- Set up spaces for private file sharing and messaging with clients and staff.
- Upload and download files securely.
- Send messages within spaces to communicate with your clients.
- Personalize the client experience with user-specific portal configurations.

## Installation
To start, install the package using npm:

```bash
npm install @usefoyer/api-client
```

## Getting Started
### Authentication
To use this library, initialize the `FoyerApiClient` with your API key:

```typescript
import { FoyerApiClient } from '@usefoyer/api-client';

const client = new FoyerApiClient({ apiKey: 'YOUR_API_KEY' });
```

## Use Cases and Examples
Below are practical examples and use cases for managing users, groups, spaces, files, and messaging.

### 1. User Management
Foyer's [client portal](https://usefoyer.com/features/client-portal) enables easy creation, retrieval, updating, and deletion of users. Here’s how to perform basic user management tasks.

#### Creating and Retrieving a User Profile
You may want to create new clients within your portal, set up their access, and verify their profiles. Here’s an example:

```typescript
import { CreateUserViewModel, UpdateUserViewModel } from '@usefoyer/api-client';

// Define a new client user profile
const createUser: CreateUserViewModel = {
  email: 'newclient@example.com',
  first_name: 'Alice',
  last_name: 'Smith',
  phone_number: '555-6789',
  role: 'client', // roles include 'client', 'staff', or 'admin'
};

// Create the user profile in Foyer
const user = await client.users().create(createUser);

// Retrieve and verify the user details by their ID
const retrievedUser = await client.users().get(user.id);
```

#### Updating and Deleting a User Profile
After onboarding, you may need to update a user’s profile as contact information changes or remove their access entirely.

```typescript
// Update the user's name and phone number
const updateUser: UpdateUserViewModel = { 
  first_name: 'Alicia', 
  phone_number: '555-1234' 
};
const updatedUser = await client.users().update(user.id, updateUser);

// Delete the user profile when no longer needed
await client.users().delete(user.id);
```

### 2. Group Management
Groups help you organize users, allowing you to control access to spaces and content more effectively. You can create groups for different client types, regions, or departments.

#### Creating, Retrieving, and Updating Groups
Below is an example of creating a group for VIP clients, updating it, and managing group members.

```typescript
import { CreateGroupViewModel, UpdateGroupViewModel } from '@usefoyer/api-client';

// Create a VIP group with specific users
const createGroup: CreateGroupViewModel = {
  name: 'VIP Clients',
  users: ['clientId1', 'clientId2'],
  avatar: 'vipBadgeIcon',
};

const group = await client.groups().create(createGroup);

// Retrieve the group
const retrievedGroup = await client.groups().get(group.id);

// Update the group to add more users
const updateGroup: UpdateGroupViewModel = { users: ['clientId1', 'clientId3'] };
const updatedGroup = await client.groups().update(group.id, updateGroup);
```

### 3. Space Management
Spaces in Foyer act as secure collaboration areas where users can exchange files and messages. Spaces help create focused areas for client interactions, such as sharing documents, updates, and discussing project-specific details.

#### Creating and Using Spaces
Imagine setting up a space where your team can securely share onboarding documents and chat with a new client.

```typescript
import { CreateSpaceViewModel, UpdateSpaceViewModel } from '@usefoyer/api-client';

// Define space members, including the client and support staff
const spaceDetails: CreateSpaceViewModel = {
  name: 'Onboarding - Alice Smith',
  members: {
    users: ['clientId1', 'staffId1'],
    groups: ['supportTeamGroupId'],
  },
};

// Create a new space for onboarding
const space = await client.spaces().create(spaceDetails);

// Update the space name to reflect a new phase
const updatedSpace = await client.spaces().update(space.id, { name: 'Onboarding & Training - Alice Smith' });
```

### 4. File Management
In Foyer, files are stored securely within spaces, allowing team members and clients to access necessary documents.

#### Uploading a Document to a Space
You can upload files directly to a space, making them accessible to all space members.

```typescript
// Upload a contract document to the space
const contractFile = await client.files(space.id).uploadFileFromString({ name: 'Contract.pdf' }, 'This is the contract content...');

// Retrieve file details for confirmation
const retrievedFile = await client.files(space.id).get(contractFile.id);
```

#### Downloading and Deleting Files
When a file is no longer needed, or if you need to retrieve its contents for processing, you can download or delete it.

```typescript
// Download the file as a string
const fileContent = await client.files(space.id).downloadFileAsString(contractFile.id);

// Delete the file after the project ends
await client.files(space.id).delete(contractFile.id);
```

### 5. Messaging within Spaces
Messaging in Foyer provides a private, encrypted channel for secure communication between clients and team members within a space.

#### Sending and Retrieving Messages in a Space
You can send updates or discuss documents within the space. For example, here’s how to send a welcome message:

```typescript
import { CreateMessageViewModel } from '@usefoyer/api-client';

// Send a welcome message to the client
const welcomeMessage: CreateMessageViewModel = { content: 'Welcome! Please review the attached contract.' };
const message = await client.messages(space.id).create(welcomeMessage);

// Retrieve and review the message thread
const messageThread = await client.messages(space.id).search();

messageThread.results.forEach(msg => console.log(`Message: ${msg.content} | Sent At: ${msg.created_at}`));
```

Messages can be used to guide clients through processes, answer questions, or share updates on tasks, all within the secure space.

### 6. App User Customizations
Foyer allows you to configure the portal experience for individual users using App Customizations.

#### Customizing the Portal for Individual Users
You may want to configure a customized app view for a client, adding specific tools or settings relevant to their project.

```typescript
import { SetAppUserCustomizationViewModel } from '@usefoyer/api-client';

const userId = 'clientId1';
const appId = 'appId1';

// Set up a custom dashboard layout for the client
const userCustomization: SetAppUserCustomizationViewModel = {
  config: { dashboardLayout: 'summary_view', displayTheme: 'light' },
};

const customization = await client.appUserCustomizations(appId, userId).set(userCustomization);
```

User customizations allow you to create a more personalized, effective portal experience for each user.

## Testing
To run tests for this library, you’ll need to set two environment variables:

FOYER_JS_TEST_URL: The base URL for your test instance of the Foyer API.
FOYER_JS_TEST_KEY: The API key used for testing.

Once you’ve set these environment variables, you can run the tests with [Vitest](https://vitest.dev):

```bash
npm run test
```

## Contributing
If you have improvements or bug fixes, contributions are welcome. Please open issues or submit pull requests here on GitHub.