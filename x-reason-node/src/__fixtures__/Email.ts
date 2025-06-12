import { Context } from "@xreason/reasoning";

// Mock email response data
export const mockEmailResponse = {
    data: {
        id: '8675309',
        threadId: '2468',
        labelIds: ['labels', 'schmabels'],
    }
};

export const validEmailData = {
    message: 'Hello World',
    subject: 'Test Subject',
    recipients: ['test@example.com'],
    modelDialog: 'sample dialog',
    ts: 1234567890
};

export const validContext = {
    stack: ['emailData', 'bullshit'],
    emailData: validEmailData
} as any as Context;

export const missingRecipientContext = {
    stack: ['emailData', 'bullshit'],
    emailData: {
        // message is missing
        subject: 'Test',
        modelDialog: 'sample dialog',
        ts: 1234567890
    }
} as any as Context;
