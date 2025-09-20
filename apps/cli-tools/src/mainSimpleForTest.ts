/**
 * Unified Message Structure for VS Code Extension and Larry App Communication
 *
 * Messages are stored in SQLite and have the following structure:
 *
 * {
 *   "conversationId": "conversation-uuid",
 *   "id": "unique-message-id",
 *   "updatedAt": "2024-01-01T00:00:00.000Z",
 *   "type": "string", // in future e.g "markdown", "widget", etc.
 *   "content": "message content",
 *   "metadata": {
 *     "isUserTurn": boolean,  // indicates if it's user's turn to respond - this is how extension will know if allow user to answer
 *     "widgetData"?: Record<string, any> // for future widget support
 *   }
 * }
 *
 * Conversation Structure:
 * {
 *   "conversationId": "conversation-uuid",
 *   "updatedAt": "2024-01-15T10:30:00Z",
 *   "name": "Session Name",
 *   "gitworktreeId": "worktree-id",
 *   "worktreePath": ".larry/worktrees/worktree-id",
 *   "messages": Message[]
 * }
 */

import {
  Larry,
  LarryResponse,
} from '@codestrap/developer-foundations-agents-vickie-bennie';
import { container } from '@codestrap/developer-foundations-di';
import { ThreadsDao, TYPES } from '@codestrap/developer-foundations-types';
import 'dotenv/config';
import { uuidv4 } from '@codestrap/developer-foundations-utils';

// Unified message type for both VS Code extension and Larry app
export interface Message {
  conversationId: string;
  id: string;
  updatedAt: string;
  type: string; // in future e.g "markdown", "widget", etc.
  content: string;
  metadata: {
    isUserTurn: boolean;
    widgetData?: Record<string, any>;
  };
}

export interface Conversation {
  conversationId: string;
  updatedAt: string;
  name: string;
  gitworktreeId: string;
  worktreePath: string;
  messages: Message[];
}

interface ParsedMessage {
  user?: string;
  system?: string;
}

/**
 * Process user input with Larry and return response
 */
export async function processUserInput(
  conversationId: string,
  userInput: string
): Promise<Message> {
  const larry = new Larry();
  const threadsDao = container.get<ThreadsDao>(TYPES.SQLLiteThreadsDao);
  const userId = process.env.FOUNDRY_TEST_USER || 'default-user';

  // Get Larry's response
  const result = await larry.askLarry(userInput, userId, conversationId);

  // Read the updated thread to get Larry's response
  const { messages } = await threadsDao.read(conversationId);
  const parsedMessages = JSON.parse(messages || '[]') as ParsedMessage[];
  const lastSystemMessage = parsedMessages[parsedMessages.length - 1]?.system;

  if (!lastSystemMessage) {
    throw new Error('No response from Larry');
  }

  return {
    conversationId,
    id: uuidv4(),
    updatedAt: new Date().toISOString(),
    type: 'text',
    content: lastSystemMessage,
    metadata: {
      isUserTurn: true, // it is up to us or LLM to decide when user input is needed
    },
  };
}

/**
 * Get all messages for a conversation
 */
export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  const threadsDao = container.get<ThreadsDao>(TYPES.SQLLiteThreadsDao);
  const { messages } = await threadsDao.read(conversationId);
  const parsedMessages = JSON.parse(messages || '[]') as ParsedMessage[];

  const formattedMessages: Message[] = [];

  for (let i = 0; i < parsedMessages.length; i++) {
    const msg = parsedMessages[i];

    if (msg.user) {
      formattedMessages.push({
        conversationId,
        id: uuidv4(),
        updatedAt: new Date().toISOString(),
        type: 'text',
        content: msg.user,
        metadata: { isUserTurn: false },
      });
    }

    if (msg.system) {
      formattedMessages.push({
        conversationId,
        id: uuidv4(),
        updatedAt: new Date().toISOString(),
        type: 'text',
        content: msg.system,
        metadata: { isUserTurn: true }, // this is assumption but should be distinguished by the LLM or directly in function catalog.
      });
    }
  }

  return formattedMessages;
}

// Simple polling server - runs forever and processes user messages
async function runServer() {
  const conversationId = process.argv[2];
  if (!conversationId) {
    console.log('Usage: node mainSimpleForTest.js <conversationId>');
    process.exit(1);
  }

  console.log(`Polling conversation ${conversationId}...`);

  setInterval(async () => {
    console.log('Polling conversation messages...');
    try {
      const messages = await getConversationMessages(conversationId);
      const lastMessage = messages[messages.length - 1];

      // If last message is from user, process it with Larry
      if (lastMessage && !lastMessage.metadata.isUserTurn) {
        console.log('Processing user message:', lastMessage.content);
        const response = await processUserInput(
          conversationId,
          lastMessage.content
        );
        console.log('Larry response:', response.content);
      }
    } catch {}
  }, 2000);
}

// Run server
runServer();
