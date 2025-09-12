import { gmail_v1, drive_v3 } from 'googleapis';

// Existing EmailContext definition
export interface EmailContext {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    body: string; // HTML or plain text body
    // New property for Google Drive file attachments
    googleDriveFileIds?: string[];
}

export interface SendEmailOutput {
    messageId: string | null | undefined;
}


// Helper function to encode a string to Base64Url
function base64UrlEncode(str: string): string {
    return Buffer.from(str).toString('base64');
}

// Helper function to construct MIME message part for an attachment
interface AttachmentData {
    filename: string;
    mimeType: string;
    data: Buffer;
}

function createAttachmentPart(attachment: AttachmentData, boundary: string): string {
    const encodedData = attachment.data.toString('base64');
    return [
        `--${boundary}`,
        `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
        `Content-Disposition: attachment; filename="${attachment.filename}"`,
        `Content-Transfer-Encoding: base64`,
        '',
        encodedData,
    ].join('rn');
}

export async function sendEmail(gmail: gmail_v1.Gmail, drive: drive_v3.Drive, context: EmailContext): Promise<SendEmailOutput> {
    const { to, cc, bcc, subject, body, googleDriveFileIds } = context;

    const recipients = [to].flat().filter(Boolean);
    const ccRecipients = (cc ? [cc].flat() : []).filter(Boolean);
    const bccRecipients = (bcc ? [bcc].flat() : []).filter(Boolean);

    // Email headers
    const headers: string[] = [];
    if (recipients.length > 0) headers.push(`To: ${recipients.join(', ')}`);
    if (ccRecipients.length > 0) headers.push(`Cc: ${ccRecipients.join(', ')}`);
    if (bccRecipients.length > 0) headers.push(`Bcc: ${bccRecipients.join(', ')}`);
    headers.push(`Subject: =?utf-8?B?${base64UrlEncode(subject)}?=`);
    headers.push(`MIME-Version: 1.0`);

    const messageParts: string[] = [];
    const attachments: AttachmentData[] = [];
    let totalAttachmentSize = 0;
    const GMAIL_ATTACHMENT_MAX_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

    // Fetch Google Drive attachments if provided
    if (googleDriveFileIds && googleDriveFileIds.length > 0) {
        if (googleDriveFileIds.length > 10) {
            console.warn('Warning: Limiting attachments to 10 as per design constraint.');
            googleDriveFileIds.splice(10); // Limit to 10 attachments
        }

        for (const fileId of googleDriveFileIds) {
            try {
                const response = await drive.files.get(
                    {
                        fileId, alt: 'media'
                    },
                    { responseType: 'arraybuffer' } // Fetch as ArrayBuffer
                );

                const fileMetadataResponse = await drive.files.get({
                    fileId, fields: 'mimeType,name,size'
                });
                const mimeType = fileMetadataResponse.data.mimeType;
                const filename = fileMetadataResponse.data.name;
                const fileSize = fileMetadataResponse.data.size ? parseInt(fileMetadataResponse.data.size) : 0;

                // Validate MIME types
                const allowedMimeTypes = [
                    'application/pdf',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
                ];
                if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
                    console.warn(`Skipping attachment for file ID ${fileId} due to unsupported MIME type: ${mimeType}`);
                    continue;
                }

                if (fileSize + totalAttachmentSize > GMAIL_ATTACHMENT_MAX_SIZE_BYTES * 0.5) { // Account for Base64 encoding size increase (approx. 33-50% increase)
                    console.error(`Error: Total attachment size would exceed effective Gmail limit with file ${filename}. Skipping this file.`);
                    // Optionally, handle this by suggesting a Drive link or throwing an error
                    continue;
                }

                attachments.push({
                    filename: filename || `attachment-${fileId}`,
                    mimeType: mimeType,
                    data: Buffer.from(response.data as ArrayBuffer),
                });
                totalAttachmentSize += fileSize;

            } catch (error: any) {
                console.error(`Failed to retrieve Google Drive file ${fileId}:`, error.message);
                // Implement retry logic with exponential backoff here if not handled by higher-level client.
                // For v0, simply log and skip the problematic attachment.
            }
        }
    }

    const boundary = `----=_Part_${Math.random().toString().slice(2)}`;
    headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

    // Text/HTML body part
    messageParts.push([
        `--${boundary}`,
        `Content-Type: text/html; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        '',
        body,
    ].join('rn'));

    // Add attachments
    for (const attachment of attachments) {
        messageParts.push(createAttachmentPart(attachment, boundary));
    }

    messageParts.push(`--${boundary}--`);

    const rawMessage = [
        ...headers,
        '',
        ...messageParts,
    ].join('rn');

    try {
        const encodedMessage = base64UrlEncode(rawMessage);
        const gmailResponse = await gmail.users.messages.send({
            userId: 'me', // Assuming 'me' for the authenticated user
            requestBody: {
                raw: encodedMessage,
            },
        });
        return { messageId: gmailResponse.data.id };
    } catch (error: any) {
        console.error('Error sending email:', error.message);
        // Implement error handling and retry with exponential backoff here if not handled by higher-level client.
        throw new Error(`Failed to send email: ${error.message}`);
    }
}