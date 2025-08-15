import {
  Context,
  MachineEvent,
  Task,
  ActionType,
} from '@codestrap/developer-foundations-types';

// TODO: Import actual Google service functions when implemented
// import {
//   googleCalendarEvent,
//   googleDriveUpload,
//   googleDocsCreate,
//   googleSheetsRead,
// } from '../../functions';

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
    // TODO: Add Google service functions here
    // Example scaffolding:
    [
      'placeholderFunction',
      {
        description:
          'Placeholder function - replace with actual Google service functions',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            'Placeholder function called - implement actual Google service logic'
          );

          // TODO: Implement actual function logic
          const result = {
            success: true,
            message: 'Placeholder implementation',
          };

          const payload = getPayload(context, result);
          dispatch({ type: 'CONTINUE', payload });

          return result;
        },
      },
    ],
    // TODO: Add more Google service functions:
    // - Google Calendar functions
    // - Google Drive functions
    // - Google Docs functions
    // - Google Sheets functions
    // - Gmail functions
    // etc.
  ]);
}
