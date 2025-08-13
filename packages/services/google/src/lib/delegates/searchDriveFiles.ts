import { drive_v3 } from 'googleapis';
import { DriveFile } from '@codestrap/developer-foundations-types';

const LOG_PREFIX = 'GSUITE - searchDriveFiles - ';

// validate checks name and date
function validateSearchArgs(args: {
  name: string;
  windowStartLocal: Date;
  windowEndLocal: Date;
}): void {
  if (!args.name || typeof args.name !== 'string') {
    throw new Error('`name` is required and must be a string');
  }
  if (!(args.windowStartLocal instanceof Date) || isNaN(args.windowStartLocal.getTime())) {
    throw new Error('`windowStartLocal` must be a valid Date');
  }
  if (!(args.windowEndLocal instanceof Date) || isNaN(args.windowEndLocal.getTime())) {
    throw new Error('`windowEndLocal` must be a valid Date');
  }
}

// build query string, only return files not trashed
function buildDriveQuery(args: {
  name: string;
  windowStartLocal: Date;
  windowEndLocal: Date;
}): string {
  return [
    'trashed = false',
    `name contains '${args.name.replace(/'/g, "\\'")}'`,
    `modifiedTime >= '${args.windowStartLocal.toISOString()}'`,
    `modifiedTime <= '${args.windowEndLocal.toISOString()}'`,
  ].join(' and ');
}

// Main delegate for searching files in Google Drive.
export async function searchDriveFiles(
  drive: drive_v3.Drive,
  args: {
    name: string;
    windowStartLocal: Date;
    windowEndLocal: Date;
  }
): Promise<DriveFile[]> {
  console.log(
    `${LOG_PREFIX} Searching Drive for:\n  name: ${args.name}\n  windowStartLocal: ${args.windowStartLocal.toISOString()}\n  windowEndLocal: ${args.windowEndLocal.toISOString()}`
  );

  try {
    validateSearchArgs(args);
    const q = buildDriveQuery(args);

    const res = await drive.files.list({
      q,
      fields: 'files(id,name,owners(displayName,emailAddress))',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      corpora: 'allDrives',
      orderBy: 'modifiedTime desc',
      pageSize: 50,
    });

    const files = (res.data.files ?? []).map((f) => ({
      id: f.id!,
      fileName: f.name!,
      owners: f.owners?.map((o) => ({
        emailAddress: o.emailAddress ?? 'Unknown',
        displayName: o.displayName ?? undefined,
      })) ?? [],
    }));

    console.log(`${LOG_PREFIX} Found ${files.length} file(s).`);
    return files;
  } catch (error) {
    console.error(
      `${LOG_PREFIX} Drive search failed:\n  message: ${
        error instanceof Error ? error.message : error
      }\n  stack: ${error instanceof Error ? error.stack : ''}\n  response: ${JSON.stringify(
        (error as any).response?.data,
        null,
        2
      )}`
    );
    throw error;
  }
}
