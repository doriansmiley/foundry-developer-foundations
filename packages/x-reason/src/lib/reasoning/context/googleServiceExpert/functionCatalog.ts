import {
  Context,
  MachineEvent,
  Task,
  ActionType,
} from '@codestrap/developer-foundations-types';

function getPayload(context: Context, result: Record<string, any>) {
  const stateId = context.stack?.[context.stack?.length - 1];
  if (!stateId) {
    throw new Error('Unable to find associated state in the machine stack.');
  }
  const payload = {
    stateId,
    [stateId]: {
      // we destructure to preserve other keys like result which holds values from user interaction
      ...context[stateId],
      ...result,
    },
  };

  return payload;
}
export function getFunctionCatalog(dispatch: (action: ActionType) => void) {
  return new Map<string, Task>([
    [
      'ScaffoldServiceFiles',
      {
        description:
          'Scaffold new service files with Nx generator (package: google-services, module: <moduleName>, function: <functionName>)',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            'ScaffoldServiceFiles implementation in function catalog called'
          );

          const moduleName =
            (event && (event as any).payload?.moduleName) ||
            (context as any)?.params?.moduleName ||
            'drive';

          const functionName =
            (event && (event as any).payload?.functionName) ||
            (context as any)?.params?.functionName ||
            'getFiles';

          const result = {
            scaffolded: true,
            package: 'google-services',
            module: moduleName,
            generatedFilePath: `packages/google-services/src/lib/delegates/${moduleName}/${functionName}.ts`,
            generatedTestFilePath: `packages/google-services/src/lib/tests/${moduleName}/${functionName}.test.ts`,
          };

          // TODO implement this function
          const payload = getPayload(context, result);

          dispatch({
            type: 'CONTINUE',
            payload,
          });
          // recursive chat before continuing
          // while (I have enough data) {
          //  use LLM to evolve asking questions
          //   const answers = await inquirer.prompt([
          //     {
          //       type: 'input',
          //       name: 'moduleName',
          //       message: 'What is the module name?',
          //     },
          //   ]);
          // }
          // const answers = await inquirer.prompt([
          //   {
          //     type: 'input',
          //     name: 'moduleName',
          //     message: 'What is the module name?',
          //   },
          // ]);

          // / dispatch({
          //   //   type: 'CONTINUE',
          //   //   payload,
          //   // });

          // inquire check put text to modify func if this is possibility. User needs to modify and accept before proceeding.
        },
      },
    ],
    [
      'ReadDocumentation',
      {
        description: 'Read API docs and return specification for the given API',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log('ReadDocumentation called');

          const payload = getPayload(context, {
            sdkDocumentation: `
            HTTP request
GET https://www.googleapis.com/drive/v3/files

The URL uses gRPC Transcoding syntax.

Query parameters
Parameters
corpora	
string

Bodies of items (files/documents) to which the query applies. Supported bodies are 'user', 'domain', 'drive', and 'allDrives'. Prefer 'user' or 'drive' to 'allDrives' for efficiency. By default, corpora is set to 'user'. However, this can change depending on the filter set through the 'q' parameter.

corpus
(deprecated)	
enum (Corpus)

Deprecated: The source of files to list. Use 'corpora' instead.

driveId	
string

ID of the shared drive to search.

includeItemsFromAllDrives	
boolean

Whether both My Drive and shared drive items should be included in results.

includeTeamDriveItems
(deprecated)	
boolean

Deprecated: Use includeItemsFromAllDrives instead.

orderBy	
string

A comma-separated list of sort keys. Valid keys are:

createdTime: When the file was created.
folder: The folder ID. This field is sorted using alphabetical ordering.
modifiedByMeTime: The last time the file was modified by the user.
modifiedTime: The last time the file was modified by anyone.
name: The name of the file. This field is sorted using alphabetical ordering, so 1, 12, 2, 22.
name_natural: The name of the file. This field is sorted using natural sort ordering, so 1, 2, 12, 22.
quotaBytesUsed: The number of storage quota bytes used by the file.
recency: The most recent timestamp from the file's date-time fields.
sharedWithMeTime: When the file was shared with the user, if applicable.
starred: Whether the user has starred the file.
viewedByMeTime: The last time the file was viewed by the user.
Each key sorts ascending by default, but can be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime desc,name.

pageSize	
integer

The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.

pageToken	
string

The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.

q	
string

A query for filtering the file results. See the "Search for files & folders" guide for supported syntax.

spaces	
string

A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'.

supportsAllDrives	
boolean

Whether the requesting application supports both My Drives and shared drives.

supportsTeamDrives
(deprecated)	
boolean

Deprecated: Use supportsAllDrives instead.

teamDriveId
(deprecated)	
string

Deprecated: Use driveId instead.

includePermissionsForView	
string

Specifies which additional view's permissions to include in the response. Only 'published' is supported.

includeLabels	
string

A comma-separated list of IDs of labels to include in the labelInfo part of the response.

Request body
The request body must be empty.

Response body
A list of files.

If successful, the response body contains data with the following structure:

JSON representation

{
  "files": [
    {
      object (File)
    }
  ],
  "nextPageToken": string,
  "kind": string,
  "incompleteSearch": boolean
}
Fields
files[]	
object (File)

The list of files. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.

nextPageToken	
string

The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ.

kind	
string

Identifies what kind of resource this is. Value: the fixed string "drive#fileList".

incompleteSearch	
boolean

Whether the search process was incomplete. If true, then some search results might be missing, since all documents were not searched. This can occur when searching multiple drives with the 'allDrives' corpora, but all corpora couldn't be searched. When this happens, it's suggested that clients narrow their query by choosing a different corpus such as 'user' or 'drive'.

Authorization scopes
Requires one of the following OAuth scopes:

https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/drive.appdata
https://www.googleapis.com/auth/drive.file
https://www.googleapis.com/auth/drive.meet.readonly
https://www.googleapis.com/auth/drive.metadata
https://www.googleapis.com/auth/drive.metadata.readonly
https://www.googleapis.com/auth/drive.photos.readonly
https://www.googleapis.com/auth/drive.readonly
Some scopes are restricted and require a security assessment for your app to use them. For more information, see the Authorization guide.

Corpus
Enums
user	Files owned by or shared to the user.
domain	Files shared to the user's domain.
            `,
          });

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'ImplementFunction',
      {
        description: 'Implement the selected Google service function',
        implementation: async (context: Context) => {
          console.log(
            `ImplementFunction called on path: ${
              context.stack?.[context.stack?.length - 1]
            }`
          );

          // Flip this to "BLOCKED" to test success vs early-exit behavior
          const implStatus: 'OK' | 'BLOCKED' = 'OK';

          const payload = getPayload(context, {
            impl: implStatus,
            implError: null,
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'CreateUnitTests',
      {
        description: 'Create unit tests for the implemented function',
        implementation: async (context: Context) => {
          console.log(
            `CreateUnitTests called with testPath: ${
              context.stack?.[context.stack?.length - 1]
            }`
          );

          const payload = getPayload(context, {
            testsCreated: true,
            testPassing: true,
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'AttachToGSuiteClient',
      {
        description: 'Attach the function to the gSuite client',
        implementation: async (context: Context) => {
          console.log('AttachToGSuiteClient called');

          const ok = true;

          const payload = getPayload(context, {
            status: ok ? 'attached' : 'error',
            message: ok ? undefined : 'Invalid credentials',
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'SummarizeActions',
      {
        description: 'Summarize actions and next steps for the developer',
        implementation: async (context: Context) => {
          console.log('SummarizeActions called');

          const payload = getPayload(context, {
            summary:
              'Scaffolded module, normalized API spec, implemented function, generated tests, attached to client. Next: run e2e and set OAuth scopes.',
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'UnsafeQuestion',
      {
        description: 'Default state to display for unsafe questions',
        implementation: (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log('UnsafeQuestion implementation called');
          dispatch({ type: 'success' });
        },
      },
    ],
    [
      'UnsupportedQuestion',
      {
        description: 'Default state to display for unsupported questions',
        implementation: (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log('UnsupportedQuestion implementation called');
          dispatch({ type: 'success' });
        },
      },
    ],
  ]);
}
