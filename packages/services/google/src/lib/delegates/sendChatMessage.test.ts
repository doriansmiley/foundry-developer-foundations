import { sendChatMessage } from './sendChatMessage';
import { SendChatMessageInput } from '@codestrap/developer-foundations-types';
import { chat_v1 } from 'googleapis';

// Mock Google Chat API client
const mockChatClient = {
  spaces: {
    messages: {
      create: jest.fn(),
    },
  },
} as unknown as jest.Mocked<chat_v1.Chat>;

// Mock console methods to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('sendChatMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('Basic Functionality', () => {
    it('should send a simple message successfully', async () => {
      console.log('🧪 Testing basic message sending...');
      
      const mockResponse = {
        data: {
          name: 'spaces/default/messages/msg_12345',
          createTime: '2024-01-01T12:00:00Z',
        },
      };
      
      (mockChatClient.spaces.messages.create as jest.Mock).mockResolvedValue(mockResponse);

      const input: SendChatMessageInput = {
        message: 'Hello, world!',
      };

      console.log('📨 Input message:', input.message);

      const result = await sendChatMessage(mockChatClient, input);

      console.log('✅ Result:', result);

      expect(result).toEqual({
        messageId: 'spaces/default/messages/msg_12345',
        timestamp: '2024-01-01T12:00:00Z',
        success: true,
      });

      expect(mockChatClient.spaces.messages.create).toHaveBeenCalledWith({
        parent: 'spaces/default',
        requestBody: { text: 'Hello, world!' },
      });
      expect(mockChatClient.spaces.messages.create).toHaveBeenCalledTimes(1);
    });

    it('should send a message with channel ID', async () => {
      console.log('🧪 Testing message with channel ID...');
      
      const mockResponse = {
        data: {
          name: 'spaces/general/messages/msg_67890',
          createTime: '2024-01-01T12:05:00Z',
        },
      };
      
      (mockChatClient.spaces.messages.create as jest.Mock).mockResolvedValue(mockResponse);

      const input: SendChatMessageInput = {
        message: 'Hello, team!',
        channelId: 'spaces/general',
      };

      console.log('📨 Input message:', input.message);
      console.log('📍 Channel ID:', input.channelId);

      const result = await sendChatMessage(mockChatClient, input);

      console.log('✅ Result:', result);

      expect(result.messageId).toBe('spaces/general/messages/msg_67890');
      expect(result.success).toBe(true);
      expect(mockChatClient.spaces.messages.create).toHaveBeenCalledWith({
        parent: 'spaces/general',
        requestBody: { text: 'Hello, team!' },
      });
    });
  });

  describe('Input Validation', () => {
    it('should throw error for empty message', async () => {
      console.log('🧪 Testing empty message validation...');
      
      const input: SendChatMessageInput = {
        message: '',
      };

      console.log('❌ Testing invalid input:', input);

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow(
        'Message cannot be empty'
      );

      expect(mockChatClient.spaces.messages.create).not.toHaveBeenCalled();
    });

    it('should throw error for undefined message', async () => {
      console.log('🧪 Testing undefined message validation...');
      
      const input = {
        message: undefined,
      } as any;

      console.log('❌ Testing invalid input:', input);

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow(
        'Message is required and must be a string'
      );

      expect(mockChatClient.spaces.messages.create).not.toHaveBeenCalled();
    });

    it('should throw error for non-string channelId', async () => {
      console.log('🧪 Testing invalid channelId validation...');
      
      const input = {
        message: 'Valid message',
        channelId: 123,
      } as any;

      console.log('❌ Testing invalid channelId:', input.channelId);

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow(
        'ChannelId must be a string if provided'
      );

      expect(mockChatClient.spaces.messages.create).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle client errors gracefully', async () => {
      console.log('🧪 Testing client error handling...');
      
      const clientError = new Error('Network error');
      (mockChatClient.spaces.messages.create as jest.Mock).mockRejectedValue(clientError);

      const input: SendChatMessageInput = {
        message: 'This will fail',
      };

      console.log('📨 Input message:', input.message);
      console.log('💥 Simulating client error...');

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow('Network error');

      expect(mockChatClient.spaces.messages.create).toHaveBeenCalledWith({
        parent: 'spaces/default',
        requestBody: { text: 'This will fail' },
      });
    });

    it('should handle timeout errors', async () => {
      console.log('🧪 Testing timeout error handling...');
      
      const timeoutError = new Error('Request timeout');
      (mockChatClient.spaces.messages.create as jest.Mock).mockRejectedValue(timeoutError);

      const input: SendChatMessageInput = {
        message: 'Timeout test',
        channelId: 'spaces/test-channel',
      };

      console.log('📨 Input message:', input.message);
      console.log('⏰ Simulating timeout...');

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow('Request timeout');
    });
  });

  describe('Edge Cases', () => {
    it('should handle whitespace-only message', async () => {
      console.log('🧪 Testing whitespace-only message...');
      
      const input: SendChatMessageInput = {
        message: '   ',
      };

      console.log('❌ Testing whitespace message:', JSON.stringify(input.message));

      await expect(sendChatMessage(mockChatClient, input)).rejects.toThrow(
        'Message cannot be empty'
      );

      expect(mockChatClient.spaces.messages.create).not.toHaveBeenCalled();
    });

    it('should handle very long message', async () => {
      console.log('🧪 Testing very long message...');
      
      const longMessage = 'A'.repeat(1000);
      const mockResponse = {
        data: {
          name: 'spaces/default/messages/msg_long',
          createTime: '2024-01-01T12:10:00Z',
        },
      };
      
      (mockChatClient.spaces.messages.create as jest.Mock).mockResolvedValue(mockResponse);

      const input: SendChatMessageInput = {
        message: longMessage,
      };

      console.log('📨 Long message length:', input.message.length);

      const result = await sendChatMessage(mockChatClient, input);

      console.log('✅ Long message sent successfully');

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('spaces/default/messages/msg_long');
      expect(mockChatClient.spaces.messages.create).toHaveBeenCalledWith({
        parent: 'spaces/default',
        requestBody: { text: longMessage },
      });
    });
  });
});