import { chat_v1 } from 'googleapis';
import {
  SendChatMessageInput,
  SendChatMessageOutput,
} from '@codestrap/developer-foundations-types';

const LOG_PREFIX = 'CHAT - sendChatMessage - ';

function validateChatInput(input: SendChatMessageInput): void {
  const { message, channelId } = input;

  if (typeof message !== 'string') {
    throw new Error('Message is required and must be a string');
  }

  if (message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (channelId && typeof channelId !== 'string') {
    throw new Error('ChannelId must be a string if provided');
  }
}

export async function sendChatMessage(
  chatClient: chat_v1.Chat,
  input: SendChatMessageInput
): Promise<SendChatMessageOutput> {
  console.log(
    `${LOG_PREFIX} Processing chat message request:\n  message: "${input.message}"\n  channelId: ${input.channelId || 'default'}`
  );

  try {
    validateChatInput(input);

    const spaceName = input.channelId || 'spaces/default';
    
    const requestBody: chat_v1.Schema$Message = {
      text: input.message,
    };

    const response = await chatClient.spaces.messages.create({
      parent: spaceName,
      requestBody,
    });

    const result = {
      messageId: response.data.name || '',
      timestamp: response.data.createTime || new Date().toISOString(),
      success: true,
    };

    console.log(
      `${LOG_PREFIX} message sent successfully:\n  messageId: ${result.messageId}\n  timestamp: ${result.timestamp}`
    );

    return result;
  } catch (error) {
    console.error(
      `${LOG_PREFIX} Message sending failed:\n  message: ${
        error instanceof Error ? error.message : error
      }\n  stack: ${error instanceof Error ? error.stack : ''}`
    );
    throw error;
  }
}