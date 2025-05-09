import { Context, MachineEvent } from "../../reasoning/types";
import { Slack } from "@foundry/external-systems/sources";

export type MessageResponse = {
    ok: boolean,
    channel: string,
    ts: number,
    error?: string
}

// This function is called by the state machine and uses the connection already established in Text2Action
export async function sendSlackMessage(context: Context, event?: MachineEvent, task?: string): Promise<MessageResponse> {
    // Get the state ID for the writeSlackMessage step that preceded this
    const writeSlackStateId = context.stack?.[context.stack?.length - 2];
    if (!writeSlackStateId) {
        throw new Error('Unable to find writeSlackMessage state in the machine stack.');
    }

    // Get the drafted message from the previous state
    const draftMessage = context[writeSlackStateId];
    if (!draftMessage?.message) {
        throw new Error('No message found in context from writeSlackMessage step.');
    }

    // Get the Slack bot token and connection
    const botToken = Slack.getSecret('BotToken');
    const baseUrl = Slack.getHttpsConnection().url;

    try {
        // Make the API call to Slack
        const response = await fetch(`${baseUrl}/api/chat.postMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${botToken}`
            },
            body: JSON.stringify({
                channel: draftMessage.channelId,
                text: draftMessage.message,
                unfurl_links: true,
                unfurl_media: true
            })
        });

        if (!response.ok) {
            return {
                ok: false,
                channel: draftMessage.channelId,
                ts: new Date().getTime(),
                error: `HTTP error: ${response.status} ${response.statusText}`
            };
        }

        const result = await response.json();

        if (!result.ok) {
            return {
                ok: false,
                channel: draftMessage.channelId,
                ts: new Date().getTime(),
                error: `Slack API error: ${result.error}`
            };
        }

        return {
            ok: true,
            channel: result.channel,
            ts: new Date().getTime()
        };
    } catch (error) {
        console.error('Error sending Slack message:', error);
        return {
            ok: false,
            channel: draftMessage.channelId,
            ts: new Date().getTime(),
            error: `Failed to send Slack message: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}