import { sendSlackMessage } from "@xreason/services/delegates/slack/sendMessage";
import { Message, MessageService } from "@xreason/types";

export function makeSlackClient(baseUrl: string, botToken: string): MessageService {

    return {
        sendMessage: async (message: Message) => {
            const response = await sendSlackMessage(message, baseUrl, botToken);

            return response;
        }
    }

}