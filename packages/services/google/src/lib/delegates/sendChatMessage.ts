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
    
    console.log(`${LOG_PREFIX} 🔍 Auth client details:`);
    console.log(`${LOG_PREFIX}   - Auth type: ${(chatClient as any).context?._options?.auth?.constructor?.name || 'Unknown'}`);
    
    // Test auth before making the API call
    try {
      console.log(`${LOG_PREFIX} 📝 Testing authentication...`);
      const auth = (chatClient as any).context?._options?.auth;
      if (auth && typeof auth.getClient === 'function') {
        const authClient = await auth.getClient();
        console.log(`${LOG_PREFIX} ✅ Authentication successful`);
        console.log(`${LOG_PREFIX} 📋 Auth client info:`, {
          type: authClient.constructor.name,
          email: (authClient as any).email || 'N/A',
          scopes: (authClient as any).scopes || 'N/A',
          subject: (authClient as any).subject || 'N/A'
        });
      } else {
        console.log(`${LOG_PREFIX} ⚠️ Cannot test auth - auth client not accessible`);
      }
    } catch (authError) {
      console.error(`${LOG_PREFIX} ❌ Authentication test failed:`, authError);
    }
    
    const requestBody: chat_v1.Schema$Message = {
      text: input.message,
    };

    console.log(`${LOG_PREFIX} 🚀 Making API request to space: ${spaceName}`);
    console.log(`${LOG_PREFIX} 📦 Request body:`, JSON.stringify(requestBody, null, 2));
    
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