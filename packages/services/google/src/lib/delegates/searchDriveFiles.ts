import { drive_v3 } from 'googleapis';
import { DriveFile } from '@codestrap/developer-foundations-types';
import { toUTCFromWallClock, toZonedISOString } from './findOptimalMeetingTime.v2';

const LOG_PREFIX = 'GSUITE - searchDriveFiles - ';

type SearchArgs = {
  name?: string;                // name contains
  contains?: string;            // fullText contains
  windowStartLocal?: Date;      // wall clock in timezone
  windowEndLocal?: Date;        // wall clock in timezone
  timezone?: string;            // IANA tz
  fallbackOffsetMinutes?: number;
};

type QueryArgs = {
  includeTrashed?: boolean;     // default false
  joinOperator?: 'and' | 'or';  // default 'and'
  pageSize?: number;            // default 50, max 1000

  /* passthroughs to files.list */
  includeItemsFromAllDrives?: boolean; // computed default based on corpora
  supportsAllDrives?: boolean;         // computed default based on corpora
  corpora?: 'user' | 'domain' | 'drive' | 'allDrives'; // default 'user' (My Drive)
  driveId?: string;            // for a specific shared drive
  orderBy?: string;            // default 'modifiedTime desc'
  pageToken?: string;
  fields?: string;             // default fields below
};

type Args = SearchArgs & QueryArgs;


/* ---------- helpers ---------- */
const safeTrim = (v?: string) => (typeof v === 'string' ? v.trim() : undefined);
const nonEmpty = (v?: string) => !!(typeof v === 'string' && v.trim().length > 0);
const isValidDate = (d: unknown): d is Date => d instanceof Date && !isNaN(d.getTime());
const isValidTz = (tz?: string) => {
  if (!tz) return false;
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch { return false; }
};

/* ---------- validation ---------- */
function validateSearchArgs(args: Args): void {
  // Validate name if provided
  if (args.name !== undefined) {
    if (typeof args.name !== 'string' || args.name.trim().length === 0) {
      throw new Error('`name` is required and must be a string');
    }
    (args as any).name = safeTrim(args.name);
  }

  // Validate contains if provided  
  if (args.contains !== undefined) {
    if (typeof args.contains !== 'string' || args.contains.trim().length === 0) {
      throw new Error('`contains` must be a non-empty string');
    }
    (args as any).contains = safeTrim(args.contains);
  }

  const anyTime = args.windowStartLocal !== undefined ||
                  args.windowEndLocal   !== undefined ||
                  args.timezone         !== undefined;

  if (anyTime) {
    if (!isValidDate(args.windowStartLocal)) throw new Error('`windowStartLocal` must be a valid Date when using time filters');
    if (!isValidDate(args.windowEndLocal))   throw new Error('`windowEndLocal` must be a valid Date when using time filters');
    if (!isValidTz(args.timezone))           throw new Error('`timezone` must be a valid IANA time zone string');
    if (args.windowStartLocal!.getTime() > args.windowEndLocal!.getTime()) {
      throw new Error('`windowStartLocal` must be <= `windowEndLocal`');
    }
  }

  if (args.pageSize !== undefined) {
    if (!Number.isFinite(args.pageSize) || args.pageSize <= 0 || args.pageSize > 1000) {
      throw new Error('`pageSize` must be 1..1000');
    }
  }

  // At least one real criterion
  if (!nonEmpty(args.name) && !nonEmpty(args.contains) && !anyTime) {
    throw new Error('Provide at least one search criterion: `name`, `contains`, or a time window.');
  }
}

  

/* ---------- query builder ---------- */

function buildDriveQuery(args: Args): string {
  const clauses: string[] = [];

  // Add name search if provided
  const name = safeTrim(args.name);
  if (name) {
    clauses.push(`name contains '${name.replace(/'/g, "\\'")}'`);
  }

  // Add contains search if provided
  const contains = safeTrim(args.contains);
  if (contains) {
    clauses.push(`fullText contains '${contains.replace(/'/g, "\\'")}'`);
  }

  // Add time-based search if provided
  if (args.windowStartLocal && args.windowEndLocal && args.timezone) {
    const fallback = args.fallbackOffsetMinutes ?? -300;
    const startUTC = toUTCFromWallClock(args.windowStartLocal, args.timezone, fallback);
    const endUTC   = toUTCFromWallClock(args.windowEndLocal,   args.timezone, fallback);

    // Use ISO strings for Google Drive API
    clauses.push(`modifiedTime >= '${startUTC.toISOString()}'`);
    clauses.push(`modifiedTime <= '${endUTC.toISOString()}'`);
  }

  if (clauses.length === 0) {
    throw new Error('No valid search criteria provided');
  }

  const joinedUser = clauses.join(args.joinOperator === 'or' ? ' or ' : ' and ');

  // Add trash filter independently from joinOperator  
  if (!args.includeTrashed) {
    return `(${joinedUser}) and trashed = false`;
  }
  return joinedUser;
}

/* ---------- main delegate (validate before logging) ---------- */

export async function searchDriveFiles(
  drive: drive_v3.Drive,
  args: Args
): Promise<DriveFile[]> {
  try {
    validateSearchArgs(args);

    const q = buildDriveQuery(args);

    const corpora = args.corpora ?? (args.driveId ? 'drive' : 'user');
    const includeItemsFromAllDrives =
      args.includeItemsFromAllDrives ?? (corpora === 'allDrives' || corpora === 'drive');
    const supportsAllDrives =
      args.supportsAllDrives ?? (corpora === 'allDrives' || corpora === 'drive' || !!args.driveId);

    const res = await drive.files.list({
      q,
      fields: args.fields ?? 'nextPageToken,files(id,name,mimeType,owners(displayName,emailAddress))',
      corpora,
      driveId: args.driveId,
      includeItemsFromAllDrives,
      supportsAllDrives,
      orderBy: args.orderBy ?? 'modifiedTime desc',
      pageSize: args.pageSize ?? 50,
      pageToken: args.pageToken,
    });

    const files: DriveFile[] = (res.data.files ?? []).map((f) => ({
      id: f.id!,
      fileName: f.name!,
      owners:
        f.owners?.map((o) => ({
          emailAddress: o.emailAddress ?? 'Unknown',
          displayName: o.displayName ?? undefined,
        })) ?? [],
    }));
  
    return files;
  } catch (error) {
    console.error(
      `${LOG_PREFIX} Drive search failed:\n  message: ${
        error instanceof Error ? error.message : String(error)
      }\n  stack: ${error instanceof Error ? error.stack : ''}\n  response: ${JSON.stringify(
        (error as any).response?.data,
        null,
        2
      )}`
    );
    throw error;
  }
}
