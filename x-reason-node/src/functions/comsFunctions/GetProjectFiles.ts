import { Context, MachineEvent } from "../../reasoning/types";

export type File = {
    kind: string,
    id: string,
    name: string,
    mimeType: string,
    modifiedDate: Date
}

// This function retrieves the most rescent versions of files from Google Drive using the input prompt and sends back as a list
// This is usefule for sending emails and status reports where files need to be referenced
export async function getProjectFiles(context: Context, event?: MachineEvent, task?: string): Promise<File[]> {
    return new Promise((resolve) => {
        // TODO use LLM to extract the input parameters from the context.solution parameter
        // IE "construct the query parameter for Google Drive API find files ${context.solution}"
        //@ts-ignore
        setTimeout(() => {
            resolve([
                {
                    kind: "drive#file",
                    id: "1234567890abcdef",
                    name: "important_document.pdf",
                    mimeType: "application/pdf",
                    modifiedDate: new Date("2023-12-20T15:30:00Z"),
                }
            ]);
        }, 500);
    })
}