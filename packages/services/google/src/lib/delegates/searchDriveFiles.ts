import { drive_v3 } from 'googleapis';
import { DriveFile } from '@codestrap/developer-foundations-types';

const LOG_PREFIX = 'GSUITE - searchDriveFiles - ';

type Args = {
  name: string;
  windowStartLocal: Date;   // wall clock in `timezone`
  windowEndLocal: Date;     // wall clock in `timezone`
  timezone?: string;         // IANA, e.g. "America/Chicago"
  fallbackOffsetMinutes?: number;// default -300
};

/* ---------- DST-safe helpers ---------- */

function getOffsetForUTCInstant(tz: string, utc: Date, fallback = -300): number {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });
    const parts = dtf.formatToParts(utc);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value])) as Record<string, string>;

    const y = Number(map['year']);
    const m = Number(map['month']);
    const d = Number(map['day']);
    const H = Number(map['hour']);
    const M = Number(map['minute']);
    const S = Number(map['second']);

    const asIfUTC = Date.UTC(y, m - 1, d, H, M, S);
    return Math.round((asIfUTC - utc.getTime()) / 60000);
  } catch {
    return fallback;
  }
}

function toUTCFromWallClock(localWall: Date, tz: string, fallback = -300): Date {
  const y = localWall.getFullYear(), m = localWall.getMonth(), d = localWall.getDate();
  const H = localWall.getHours(), M = localWall.getMinutes(), S = localWall.getSeconds();
  const guessUTC = new Date(Date.UTC(y, m, d, H, M, S));
  const offMin = getOffsetForUTCInstant(tz, guessUTC, fallback);
  return new Date(guessUTC.getTime() - offMin * 60_000);
}

/* ---------- validation ---------- */

function validateSearchArgs(args: Args): void {
  const { name, windowStartLocal, windowEndLocal, timezone } = args;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('`name` is required and must be a string');
  }
  if (!(windowStartLocal instanceof Date) || isNaN(windowStartLocal.getTime())) {
    throw new Error('`windowStartLocal` must be a valid Date');
  }
  if (!(windowEndLocal instanceof Date) || isNaN(windowEndLocal.getTime())) {
    throw new Error('`windowEndLocal` must be a valid Date');
  }
  if (!timezone || typeof timezone !== 'string') {
    throw new Error('`timezone` is required and must be an IANA string');
  }
}

/* ---------- query builder ---------- */

function buildDriveQuery(args: Args): string {
  const fallback = args.fallbackOffsetMinutes ?? -300; // Central default
  const startUTC = toUTCFromWallClock(args.windowStartLocal, args.timezone as string, fallback);
  const endUTC   = toUTCFromWallClock(args.windowEndLocal,   args.timezone as string, fallback);

  return [
    'trashed = false',
    `name contains '${args.name.replace(/'/g, "\\'")}'`,
    `modifiedTime >= '${startUTC.toISOString()}'`,
    `modifiedTime <= '${endUTC.toISOString()}'`,
  ].join(' and ');
}

/* ---------- main delegate (validate before logging) ---------- */

export async function searchDriveFiles(
  drive: drive_v3.Drive,
  args: Args
): Promise<DriveFile[]> {
  try {
    validateSearchArgs(args);

    const fallback = args.fallbackOffsetMinutes ?? -300;
    const startUTC = toUTCFromWallClock(args.windowStartLocal, args.timezone as string, fallback);
    const endUTC   = toUTCFromWallClock(args.windowEndLocal,   args.timezone as string, fallback);

    console.log(
      `${LOG_PREFIX} Searching Drive for:\n` +
      `  name: ${args.name}\n` +
      `  timezone: ${args.timezone}\n` +
      `  windowStartLocal: ${args.windowStartLocal.toISOString()} (wall)\n` +
      `  windowEndLocal:   ${args.windowEndLocal.toISOString()} (wall)\n` +
      `  windowStartUTC:   ${startUTC.toISOString()}\n` +
      `  windowEndUTC:     ${endUTC.toISOString()}`
    );

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
      owners:
        f.owners?.map((o) => ({
          emailAddress: o.emailAddress ?? 'Unknown',
          displayName: o.displayName ?? undefined,
        })) ?? [],
    }));

    console.log(`${LOG_PREFIX} Found ${files.length} file(s).`);
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
