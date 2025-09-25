import {
  Context,
  MachineEvent,
  OfficeServiceV2,
  DriveSearchOutput,
  DriveSearchParams,
  DriveDateField,
  GeminiService,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { 
  extractJsonFromBackticks,
  partsInTZ,
  wallClockToUTC,
  buildDateWindowUTC,
} from '@codestrap/developer-foundations-utils';
import { container } from '@codestrap/developer-foundations-di';
import { searchTranscripts } from './SearchTranscripts';

// Mock the container
jest.mock('@codestrap/developer-foundations-di', () => ({
  container: {
    get: jest.fn(),
    getAsync: jest.fn(),
  },
}));

// Mock the utility functions
jest.mock('@codestrap/developer-foundations-utils', () => ({
  extractJsonFromBackticks: jest.fn(),
  partsInTZ: jest.fn(),
  wallClockToUTC: jest.fn(),
  buildDateWindowUTC: jest.fn(),
}));

// Mock console methods to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('searchTranscripts', () => {
  let mockGeminiService: jest.MockedFunction<GeminiService>;
  let mockOfficeService: jest.Mocked<OfficeServiceV2>;
  let mockContainer: jest.Mocked<typeof container>;

  const mockContext: Context = {
    status: 0,
    requestId: 'test-request-id',
    stack: [],
  };

  const mockEvent: MachineEvent = {
    type: 'CONTINUE',
    payload: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock GeminiService
    mockGeminiService = jest.fn() as jest.MockedFunction<GeminiService>;
    mockContainer = container as jest.Mocked<typeof container>;
    mockContainer.get.mockReturnValue(mockGeminiService);

    // Setup mock OfficeServiceV2
    mockOfficeService = {
      searchDriveFiles: jest.fn(),
      getDriveClient: jest.fn(),
      summarizeCalendars: jest.fn(),
      getAvailableMeetingTimes: jest.fn(),
      scheduleMeeting: jest.fn(),
      sendEmail: jest.fn(),
      readEmailHistory: jest.fn(),
      watchEmails: jest.fn(),
      getCalendarClient: jest.fn(),
      getEmailClient: jest.fn(),
    } as jest.Mocked<OfficeServiceV2>;
    mockContainer.getAsync.mockResolvedValue(mockOfficeService);

    // Setup mock utility functions
    (partsInTZ as jest.Mock).mockReturnValue({
      year: 2024,
      month: 1,
      day: 15,
      hour: 10,
      minute: 30,
      second: 0
    });
    (wallClockToUTC as jest.Mock).mockReturnValue(new Date('2024-01-15T10:30:00.000Z'));
    (buildDateWindowUTC as jest.Mock).mockReturnValue({
      startDate: new Date('2024-01-15T00:00:00.000Z'),
      endDate: new Date('2024-01-16T00:00:00.000Z'),
    });
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('Timeframe Classification', () => {
    it('should classify "today" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['standup'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find today\'s standup meeting notes');

      expect(mockGeminiService).toHaveBeenCalledWith(
        expect.stringContaining('Find today\'s standup meeting notes'),
        expect.stringContaining('You are a helpful virtual ai assistant')
      );
      expect(buildDateWindowUTC).toHaveBeenCalledWith('today', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "yesterday" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'yesterday',
        topicKeywords: ['budget discussion', 'budget'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find yesterday\'s budget discussion notes');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('yesterday', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "this week" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'this week',
        topicKeywords: ['product review', 'product'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Search for product review meeting transcripts from this week');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('this week', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "last week" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'last week',
        topicKeywords: ['corner'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Give me transcript for meeting with corner last week');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('last week', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "this month" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'this month',
        topicKeywords: ['interview'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Search for interview transcripts from this month');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('this month', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "last month" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'last month',
        topicKeywords: ['team sync', 'sync'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find team sync notes from last month');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('last month', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should classify "all time" timeframe correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'all time',
        topicKeywords: ['client call', 'client'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Show me all client call transcripts');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('all time', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });

    it('should default to "today" when no timeframe is specified', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(buildDateWindowUTC).toHaveBeenCalledWith('today', expect.any(Date));
      expect(result).toEqual(mockDriveResponse);
    });
  });

  describe('Topic Keyword Extraction', () => {
    it('should extract single keyword correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['standup'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find today\'s standup meeting notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          keywords: ['standup', '- Transcript', '- Notes by Gemini'],
        })
      );
    });

    it('should extract multiple keywords correctly', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'this week',
        topicKeywords: ['product review', 'product'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Search for product review meeting transcripts from this week');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          keywords: ['product review', 'product', '- Transcript', '- Notes by Gemini'],
        })
      );
    });

    it('should handle complex keyword phrases', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'all time',
        topicKeywords: ['quarterly planning', 'quarterly'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Give me all quarterly planning transcripts');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          keywords: ['quarterly planning', 'quarterly', '- Transcript', '- Notes by Gemini'],
        })
      );
    });
  });

  describe('Drive Search Parameters', () => {
    it('should set correct MIME type for Google Docs', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          mimeType: 'application/vnd.google-apps.document',
        })
      );
    });

    it('should set correct owner and trashed parameters', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          owner: 'me',
          trashed: false,
        })
      );
    });

    it('should set correct page size and ordering', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          pageSize: 50,
          orderBy: 'modifiedTime desc',
        })
      );
    });

    it('should set correct date range parameters', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'yesterday',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find yesterday\'s meeting notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            startDate: new Date('2024-01-15T00:00:00.000Z'),
            endDate: new Date('2024-01-16T00:00:00.000Z'),
            field: DriveDateField.MODIFIED_TIME,
          },
        })
      );
    });
  });

  describe('Response Handling', () => {
    it('should return Drive search results successfully', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed successfully',
        files: [
          {
            id: 'file1',
            name: 'Meeting Notes - Transcript',
            mimeType: 'application/vnd.google-apps.document',
            size: '1024',
            createdTime: '2024-01-15T09:00:00.000Z',
            modifiedTime: '2024-01-15T10:00:00.000Z',
            webViewLink: 'https://drive.google.com/file/d/file1/view',
            webContentLink: 'https://drive.google.com/uc?id=file1',
            owners: [
              {
                displayName: 'John Doe',
                emailAddress: 'john@example.com',
              },
            ],
            lastModifyingUser: {
              displayName: 'Jane Doe',
              emailAddress: 'jane@example.com',
            },
            parents: ['parent1'],
            description: 'Meeting transcript',
            starred: false,
            trashed: false,
          },
        ],
        totalResults: 1,
        nextPageToken: undefined,
        incompleteSearch: false,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find today\'s meeting notes');

      expect(result).toEqual(mockDriveResponse);
    });

    it('should handle empty search results', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['nonexistent'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'No files found',
        files: [],
        totalResults: 0,
        nextPageToken: undefined,
        incompleteSearch: false,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, 'Find nonexistent meeting notes');

      expect(result).toEqual(mockDriveResponse);
    });
  });

  describe('Error Handling', () => {
    it('should handle Gemini service errors', async () => {
      const geminiError = new Error('Gemini API error');
      mockGeminiService.mockRejectedValue(geminiError);

      await expect(
        searchTranscripts(mockContext, mockEvent, 'Find meeting notes')
      ).rejects.toThrow('Gemini API error');
    });

    it('should handle invalid JSON response from Gemini', async () => {
      (extractJsonFromBackticks as jest.Mock).mockReturnValue('invalid json');
      mockGeminiService.mockResolvedValue('invalid json');

      await expect(
        searchTranscripts(mockContext, mockEvent, 'Find meeting notes')
      ).rejects.toThrow();
    });

    it('should handle missing timeframe in Gemini response', async () => {
      const mockGeminiResponse = JSON.stringify({
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      // The function should handle missing timeframe gracefully by using default
      const result = await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');
      
      expect(result).toEqual(mockDriveResponse);
      // Should still call buildDateWindowUTC with undefined timeframe
      expect(buildDateWindowUTC).toHaveBeenCalledWith(undefined, expect.any(Date));
    });

    it('should handle missing topicKeywords in Gemini response', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');

      await expect(
        searchTranscripts(mockContext, mockEvent, 'Find meeting notes')
      ).rejects.toThrow();
    });

    it('should handle Office service errors', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const officeError = new Error('Drive API error');
      mockOfficeService.searchDriveFiles.mockRejectedValue(officeError);

      await expect(
        searchTranscripts(mockContext, mockEvent, 'Find meeting notes')
      ).rejects.toThrow('Drive API error');
    });

    it('should handle container service resolution errors', async () => {
      const containerError = new Error('Service not found');
      mockContainer.getAsync.mockRejectedValue(containerError);

      await expect(
        searchTranscripts(mockContext, mockEvent, 'Find meeting notes')
      ).rejects.toThrow('Service not found');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined task parameter', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: [],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, undefined);

      expect(mockGeminiService).toHaveBeenCalledWith(
        expect.stringContaining('undefined'),
        expect.any(String)
      );
      expect(result).toEqual(mockDriveResponse);
    });

    it('should handle empty task parameter', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: [],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      const result = await searchTranscripts(mockContext, mockEvent, '');

      expect(mockGeminiService).toHaveBeenCalledWith(
        expect.stringContaining(''),
        expect.any(String)
      );
      expect(result).toEqual(mockDriveResponse);
    });

    it('should handle empty topicKeywords array', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: [],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find some notes');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          keywords: ['- Transcript', '- Notes by Gemini'],
        })
      );
    });

    it('should handle all time timeframe with no date range', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'all time',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      // Mock buildDateWindowUTC to return undefined dates for 'all time'
      (buildDateWindowUTC as jest.Mock).mockReturnValue({
        startDate: undefined,
        endDate: undefined,
      });
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Show me all meeting transcripts');

      expect(mockOfficeService.searchDriveFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            startDate: undefined,
            endDate: undefined,
            field: DriveDateField.MODIFIED_TIME,
          },
        })
      );
    });
  });

  describe('Integration with Dependencies', () => {
    it('should call container.get with correct TYPES.GeminiService', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(mockContainer.get).toHaveBeenCalledWith(TYPES.GeminiService);
    });

    it('should call container.getAsync with correct TYPES.OfficeService', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(mockContainer.getAsync).toHaveBeenCalledWith(TYPES.OfficeService);
    });

    it('should call partsInTZ and wallClockToUTC with correct timezone', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(partsInTZ).toHaveBeenCalledWith(expect.any(Date), 'America/Los_Angeles');
      expect(wallClockToUTC).toHaveBeenCalledWith(expect.any(String), 'America/Los_Angeles');
    });

    it('should call extractJsonFromBackticks with Gemini response', async () => {
      const mockGeminiResponse = JSON.stringify({
        timeframe: 'today',
        topicKeywords: ['meeting'],
      });
      
      (extractJsonFromBackticks as jest.Mock).mockReturnValue(mockGeminiResponse);
      mockGeminiService.mockResolvedValue('```json\n' + mockGeminiResponse + '\n```');
      
      const mockDriveResponse: DriveSearchOutput = {
        message: 'Search completed',
        files: [],
        totalResults: 0,
      };
      mockOfficeService.searchDriveFiles.mockResolvedValue(mockDriveResponse);

      await searchTranscripts(mockContext, mockEvent, 'Find meeting notes');

      expect(extractJsonFromBackticks).toHaveBeenCalledWith('```json\n' + mockGeminiResponse + '\n```');
    });
  });
});