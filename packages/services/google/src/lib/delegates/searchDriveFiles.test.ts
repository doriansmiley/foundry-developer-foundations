// packages/services/google/src/lib/delegates/searchDriveFiles.test.ts
import { drive_v3 } from 'googleapis';
import { searchDriveFiles } from './searchDriveFiles';

// Mock the Google Drive client
const mockDriveClient = {
  files: {
    list: jest.fn(),
  },
} as unknown as drive_v3.Drive;

describe('searchDriveFiles', () => {
  beforeAll(() => {
    // Make local Date parsing deterministic (host-independent)
    process.env.TZ = 'UTC';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console noise in test output
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const tz = 'America/Chicago'; // CDT in Aug 2025 (UTC-05)

  describe('validation', () => {
    it('should throw error if name is missing', async () => {
      await expect(
        searchDriveFiles(mockDriveClient, {
          name: '',
          windowStartLocal: new Date('2025-08-01'),
          windowEndLocal: new Date('2025-08-31'),
          timezone: tz,
        })
      ).rejects.toThrow('`name` is required and must be a string');
    });

    it('should throw error if name is not a string', async () => {
      await expect(
        searchDriveFiles(mockDriveClient, {
          name: 123 as any,
          windowStartLocal: new Date('2025-08-01'),
          windowEndLocal: new Date('2025-08-31'),
          timezone: tz,
        })
      ).rejects.toThrow('`name` is required and must be a string');
    });

    it('should throw error if windowStartLocal is invalid', async () => {
      await expect(
        searchDriveFiles(mockDriveClient, {
          name: 'Q3 Operating Review',
          windowStartLocal: new Date('invalid'),
          windowEndLocal: new Date('2025-08-31'),
          timezone: tz,
        })
      ).rejects.toThrow('`windowStartLocal` must be a valid Date');
    });

    it('should throw error if windowEndLocal is invalid', async () => {
      await expect(
        searchDriveFiles(mockDriveClient, {
          name: 'Q3 Operating Review',
          windowStartLocal: new Date('2025-08-01'),
          windowEndLocal: new Date('invalid'),
          timezone: tz,
        })
      ).rejects.toThrow('`windowEndLocal` must be a valid Date');
    });
  });

  describe('successful search', () => {
    it('should return formatted drive files', async () => {
      const mockResponse = {
        data: {
          files: [
            {
              id: 'file1',
              name: 'Q3 Operating Review - Draft',
              owners: [
                {
                  displayName: 'Alex Morgan',
                  emailAddress: 'alex.morgan@corp.example',
                },
              ],
            },
            {
              id: 'file2',
              name: 'Q3 Operating Review Slides',
              owners: [
                {
                  emailAddress: 'finance.ops@corp.example',
                },
              ],
            },
          ],
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockResponse);

      const result = await searchDriveFiles(mockDriveClient, {
        name: 'Q3 Operating Review',
        windowStartLocal: new Date('2025-08-01'),
        windowEndLocal: new Date('2025-08-31'),
        timezone: tz,
      });

      expect(result).toEqual([
        {
          id: 'file1',
          fileName: 'Q3 Operating Review - Draft',
          owners: [
            {
              displayName: 'Alex Morgan',
              emailAddress: 'alex.morgan@corp.example',
            },
          ],
        },
        {
          id: 'file2',
          fileName: 'Q3 Operating Review Slides',
          owners: [
            {
              displayName: undefined,
              emailAddress: 'finance.ops@corp.example',
            },
          ],
        },
      ]);
    });

    it('should handle empty results', async () => {
      (mockDriveClient.files.list as jest.Mock).mockResolvedValue({
        data: { files: [] },
      });

      const result = await searchDriveFiles(mockDriveClient, {
        name: 'SOC2 Readiness Checklist',
        windowStartLocal: new Date('2025-08-01'),
        windowEndLocal: new Date('2025-08-31'),
        timezone: tz,
      });

      expect(result).toEqual([]);
    });

    it('should handle files with no owners', async () => {
      (mockDriveClient.files.list as jest.Mock).mockResolvedValue({
        data: {
          files: [
            {
              id: 'file1',
              name: 'ISO 27001 Controls Matrix',
              owners: undefined,
            },
          ],
        },
      });

      const result = await searchDriveFiles(mockDriveClient, {
        name: 'ISO 27001',
        windowStartLocal: new Date('2025-08-01'),
        windowEndLocal: new Date('2025-08-31'),
        timezone: tz,
      });

      expect(result).toEqual([
        {
          id: 'file1',
          fileName: 'ISO 27001 Controls Matrix',
          owners: [],
        },
      ]);
    });

    it('should call drive.files.list with correct parameters (UTC in query)', async () => {
      (mockDriveClient.files.list as jest.Mock).mockResolvedValue({
        data: { files: [] },
      });

      // Wall-clock window in America/Chicago.
      // With TZ=UTC for parsing and tz='America/Chicago' for conversion:
      // 2025-08-01T00:00:00 (wall) -> 2025-08-01T05:00:00Z (CDT -05)
      // 2025-08-31T23:59:59 (wall) -> 2025-09-01T04:59:59Z (CDT -05)
      const startLocal = new Date('2025-08-01T00:00:00'); // wall clock
      const endLocal = new Date('2025-08-31T23:59:59');   // wall clock

      await searchDriveFiles(mockDriveClient, {
        name: 'Vendor Contract',
        windowStartLocal: startLocal,
        windowEndLocal: endLocal,
        timezone: tz,
      });

      const call = (mockDriveClient.files.list as jest.Mock).mock.calls[0][0];

      // Test with default values for user Drive search
      expect(call).toEqual(
        expect.objectContaining({
          fields: 'nextPageToken,files(id,name,mimeType,owners(displayName,emailAddress))',
          includeItemsFromAllDrives: false,
          supportsAllDrives: false,
          corpora: 'user',
          orderBy: 'modifiedTime desc',
          pageSize: 50,
        })
      );

      // Query checks: UTC bounds computed from wall clock + tz
      const q: string = call.q;
      expect(q).toContain("trashed = false");
      expect(q).toContain("name contains 'Vendor Contract'");
      expect(q).toContain("modifiedTime >=");
      expect(q).toContain("modifiedTime <=");

      // Exact UTC instants expected
      expect(q).toContain("modifiedTime >= '2025-08-01T05:00:00.000Z'");
      expect(q).toContain("modifiedTime <= '2025-09-01T04:59:59.000Z'");
    });

    it('should support configurable parameters for shared drives', async () => {
      (mockDriveClient.files.list as jest.Mock).mockResolvedValue({
        data: { files: [] },
      });

      await searchDriveFiles(mockDriveClient, {
        name: 'Team Documents',
        windowStartLocal: new Date('2025-08-01T00:00:00'),
        windowEndLocal: new Date('2025-08-31T23:59:59'),
        timezone: tz,
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        pageSize: 100,
        orderBy: 'name',
        includeTrashed: true,
        joinOperator: 'or',
      });

      const call = (mockDriveClient.files.list as jest.Mock).mock.calls[0][0];

      expect(call).toEqual(
        expect.objectContaining({
          corpora: 'allDrives',
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
          pageSize: 100,
          orderBy: 'name',
        })
      );

      // Test that trash filter and OR operator work
      const q: string = call.q;
      expect(q).not.toContain("trashed = false"); // should be included when includeTrashed: true
      expect(q).toContain("name contains 'Team Documents'");
    });

    it('should escape single quotes in file names', async () => {
      (mockDriveClient.files.list as jest.Mock).mockResolvedValue({
        data: { files: [] },
      });

      await searchDriveFiles(mockDriveClient, {
        name: "Johnson's SOW",
        windowStartLocal: new Date('2025-08-01'),
        windowEndLocal: new Date('2025-08-31'),
        timezone: tz,
      });

      const callArgs = (mockDriveClient.files.list as jest.Mock).mock.calls[0][0];
      expect(callArgs.q).toContain("name contains 'Johnson\\'s SOW'");
    });
  });

  describe('error handling', () => {
    it('should handle API errors and re-throw', async () => {
      const apiError = new Error('API Error');
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue(apiError);

      await expect(
        searchDriveFiles(mockDriveClient, {
          name: 'Q4 OKRs',
          windowStartLocal: new Date('2025-08-01'),
          windowEndLocal: new Date('2025-08-31'),
          timezone: tz,
        })
      ).rejects.toThrow('API Error');

      expect(console.error).toHaveBeenCalled();
    });
  });
});
