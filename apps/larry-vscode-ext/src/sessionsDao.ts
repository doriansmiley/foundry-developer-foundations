import initSqlJs from 'sql.js';
import * as path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';

export type SessionsDao = {
  upsert: (
    id?: string,
    threadsId?: string,
    name?: string,
    worktreeId?: string
  ) => Promise<Session>;
  delete: (id: string) => Promise<void>;
  read: (id: string) => Promise<Session>;
  listAll?: () => Promise<Session[]>;
};

export interface Session {
  id: string;
  name: string;
  updatedAt: string;
  worktreeId: string;
  threadsId?: string;
}

let SQL: any = null;
let db: any = null;

// Note: In VSCode extension context, the DB path should be set via environment variable
// by the extension.ts file using proper VSCode workspace APIs
const DEFAULT_DB_PATH = '/larry-db/developer-foundations-threads.sqlite';

async function initDatabase(
  dbPath: string = process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH
): Promise<void> {
  if (db) return;

  console.log('Initializing database at:', dbPath);

  // Initialize sql.js
  if (!SQL) {
    SQL = await initSqlJs();
  }

  await mkdir(path.dirname(dbPath), { recursive: true });

  // Try to load existing database file
  let data: Uint8Array | undefined;
  try {
    const buffer = await readFile(dbPath);
    data = new Uint8Array(buffer);
    console.log('Loaded existing database file, size:', data.length, 'bytes');
  } catch (e) {
    console.log('Database file does not exist, creating new database');
  }

  // Create or open database
  db = new SQL.Database(data);

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      threadsId TEXT,
      name TEXT,
      worktreeId TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(
    'CREATE INDEX IF NOT EXISTS idx_sessions_worktreeId ON sessions(worktreeId);'
  );

  // Save database to file
  await saveDatabase(dbPath);
}

async function saveDatabase(dbPath: string): Promise<void> {
  if (!db) {
    console.log('saveDatabase: No database instance to save');
    return;
  }

  const data = db.export();
  await writeFile(dbPath, Buffer.from(data));
  console.log(
    'saveDatabase: Saved database to',
    dbPath,
    'size:',
    data.length,
    'bytes'
  );
}

function ensureDb() {
  if (!db) {
    throw new Error(
      'SQLite sessions store not initialized. Call ensureInitialized() first.'
    );
  }
}

function run(sql: string, params: unknown[] = []): void {
  ensureDb();
  db.run(sql, params);
}

function get<T = any>(sql: string, params: unknown[] = []): T | undefined {
  ensureDb();
  const stmt = db.prepare(sql);
  const result = stmt.getAsObject(params);
  stmt.free();
  return result as T | undefined;
}

async function ensureInitialized() {
  await initDatabase();
}

export function makeSqlLiteSessionsDao(): SessionsDao {
  return {
    upsert: async (
      id?: string,
      threadsId?: string,
      name?: string,
      worktreeId?: string
    ): Promise<Session> => {
      await ensureInitialized();

      const sessionId = id || randomUUID();

      const sql = `INSERT INTO sessions (id, threadsId, name, worktreeId, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET threadsId=excluded.threadsId, name=excluded.name, worktreeId=excluded.worktreeId, updated_at=CURRENT_TIMESTAMP`;

      run(sql, [
        sessionId,
        threadsId || null,
        name || null,
        worktreeId || null,
      ]);

      const row = get<{
        id: string;
        threadsId: string | null;
        name: string | null;
        worktreeId: string | null;
        updated_at: string;
      }>(
        'SELECT id, threadsId, name, worktreeId, updated_at FROM sessions WHERE id = ?',
        [sessionId]
      );

      if (!row) {
        throw new Error('Failed to upsert and retrieve session');
      }

      const session: Session = {
        id: row.id,
        threadsId: row.threadsId ?? undefined,
        name: row.name || '',
        worktreeId: row.worktreeId || '',
        updatedAt: row.updated_at,
      };

      // Save to file
      const dbPath = process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH;
      await saveDatabase(dbPath);

      return session;
    },

    delete: async (id: string): Promise<void> => {
      await ensureInitialized();
      run('DELETE FROM sessions WHERE id = ?', [id]);

      // Save to file
      await saveDatabase(process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH);
    },

    read: async (id: string): Promise<Session> => {
      await ensureInitialized();

      const row = get<{
        id: string;
        threadsId: string | null;
        name: string | null;
        worktreeId: string | null;
        updated_at: string;
      }>(
        'SELECT id, threadsId, name, worktreeId, updated_at FROM sessions WHERE id = ?',
        [id]
      );

      if (!row) {
        throw new Error(`Session not found for id ${id}`);
      }

      const session: Session = {
        id: row.id,
        threadsId: row.threadsId ?? undefined,
        name: row.name || '',
        worktreeId: row.worktreeId || '',
        updatedAt: row.updated_at,
      };

      return session;
    },

    listAll: async (): Promise<Session[]> => {
      await ensureInitialized();

      const stmt = db.prepare(
        'SELECT id, threadsId, name, worktreeId, updated_at FROM sessions ORDER BY updated_at DESC'
      );
      const results: Session[] = [];

      while (stmt.step()) {
        const row = stmt.getAsObject();
        results.push({
          id: row.id as string,
          threadsId: (row.threadsId as string) ?? undefined,
          name: (row.name as string) || '',
          worktreeId: (row.worktreeId as string) || '',
          updatedAt: row.updated_at as string,
        });
      }

      stmt.free();
      return results;
    },
  };
}
