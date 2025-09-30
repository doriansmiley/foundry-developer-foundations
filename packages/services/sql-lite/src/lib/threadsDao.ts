import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import { Threads, ThreadsDao } from '@codestrap/developer-foundations-types';

let db: sqlite3.Database | null = null;

const DEFAULT_DB_PATH = path.resolve(
  process.cwd(),
  'db/developer-foundations-threads.sqlite'
);

async function initDatabase(
  dbPath: string = process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH
): Promise<void> {
  if (db) return;

  await mkdir(path.dirname(dbPath), { recursive: true });
  sqlite3.verbose();

  db = new sqlite3.Database(dbPath);

  await run(
    'CREATE TABLE IF NOT EXISTS threads (\n      id TEXT PRIMARY KEY,\n      appId TEXT,\n      messages TEXT,\n      userId TEXT,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );'
  );

  await run('CREATE INDEX IF NOT EXISTS idx_threads_appId ON threads(appId);');
}

function ensureDb() {
  if (!db) {
    throw new Error(
      'SQLite threads store not initialized. Call ensureInitialized() first.'
    );
  }
}

function run(sql: string, params: unknown[] = []): Promise<void> {
  ensureDb();
  return new Promise((resolve, reject) => {
    db!.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function get<T = any>(
  sql: string,
  params: unknown[] = []
): Promise<T | undefined> {
  ensureDb();
  return new Promise((resolve, reject) => {
    db!.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row as T | undefined);
    });
  });
}

async function ensureInitialized() {
  await initDatabase();
}

export function makeSqlLiteThreadsDao(): ThreadsDao {
  return {
    upsert: async (
      messages: string,
      appId: string,
      id?: string
    ): Promise<Threads> => {
      await ensureInitialized();

      const threadId = id || randomUUID();

      const sql = `INSERT INTO threads (id, appId, messages, userId, updated_at) VALUES (?, ?, ?, NULL, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET appId=excluded.appId, messages=excluded.messages, updated_at=CURRENT_TIMESTAMP`;

      await run(sql, [threadId, appId, messages]);

      const row = await get<{
        id: string;
        appId: string | null;
        messages: string | null;
        userId: string | null;
      }>('SELECT id, appId, messages, userId FROM threads WHERE id = ?', [
        threadId,
      ]);

      if (!row) {
        throw new Error('Failed to upsert and retrieve thread');
      }

      const thread: Threads = {
        id: row.id,
        appId: row.appId ?? undefined,
        messages: row.messages ?? undefined,
        userId: row.userId ?? undefined,
      };

      return thread;
    },

    delete: async (id: string): Promise<void> => {
      await ensureInitialized();
      await run('DELETE FROM threads WHERE id = ?', [id]);
    },

    read: async (id: string): Promise<Threads> => {
      await ensureInitialized();

      const row = await get<{
        id: string;
        appId: string | null;
        messages: string | null;
        userId: string | null;
      }>('SELECT id, appId, messages, userId FROM threads WHERE id = ?', [id]);

      if (!row) {
        throw new Error(`Thread not found for id ${id}`);
      }

      const thread: Threads = {
        id: row.id,
        appId: row.appId ?? undefined,
        messages: row.messages ?? undefined,
        userId: row.userId ?? undefined,
      };

      return thread;
    },
  };
}
