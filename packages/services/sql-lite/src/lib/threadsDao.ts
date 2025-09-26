import initSqlJs from 'sql.js';
import * as path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { Threads, ThreadsDao } from '@codestrap/developer-foundations-types';

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
    CREATE TABLE IF NOT EXISTS threads (
      id TEXT PRIMARY KEY,
      appId TEXT,
      messages TEXT,
      worktreeId TEXT,
      type TEXT,
      userId TEXT,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add missing columns if they don't exist (migration)
  try {
    db.run('ALTER TABLE threads ADD COLUMN worktreeId TEXT;');
  } catch (e) {
    // Column already exists, ignore
  }

  try {
    db.run('ALTER TABLE threads ADD COLUMN type TEXT;');
  } catch (e) {
    // Column already exists, ignore
  }

  try {
    db.run('ALTER TABLE threads ADD COLUMN name TEXT;');
  } catch (e) {
    // Column already exists, ignore
  }

  db.run('CREATE INDEX IF NOT EXISTS idx_threads_appId ON threads(appId);');

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
      'SQLite threads store not initialized. Call ensureInitialized() first.'
    );
  }
}

async function ensureInitialized() {
  await initDatabase();
}

export function makeSqlLiteThreadsDao(): ThreadsDao {
  return {
    upsert: async (
      messages: string,
      appId: string,
      id?: string,
      worktreeId?: string,
      name?: string
    ): Promise<Threads> => {
      await ensureInitialized();
      ensureDb();

      const threadId = id || randomUUID();

      console.log('upsert: Saving thread', threadId, 'with appId:', appId);
      console.log('upsert: Messages length:', messages?.length || 0);

      // Use REPLACE for upsert functionality
      db.run(
        `REPLACE INTO threads (id, appId, messages, worktreeId, name, type, userId, updated_at) 
         VALUES (?, ?, ?, ?, ?, NULL, NULL, CURRENT_TIMESTAMP)`,
        [threadId, appId, messages, worktreeId || null, name || null]
      );

      console.log('upsert: SQL executed successfully');

      const stmt = db.prepare(
        'SELECT id, appId, messages, worktreeId, name, type, userId, updated_at FROM threads WHERE id = ?'
      );
      const rows = stmt.getAsObject([threadId]);
      stmt.free();

      if (!rows || !rows.id) {
        throw new Error('Failed to upsert and retrieve thread');
      }

      const thread: Threads = {
        id: rows.id as string,
        appId: (rows.appId as string) || undefined,
        messages: (rows.messages as string) || undefined,
        userId: (rows.userId as string) || undefined,
        worktreeId: (rows.worktreeId as string) || undefined,
        name: (rows.name as string) || undefined,
        type: (rows.type as string) || undefined,
        updatedAt: (rows.updated_at as string) || undefined,
      };

      // Save to file
      const dbPath = process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH;
      await saveDatabase(dbPath);
      console.log('Thread upserted and saved to:', dbPath);

      return thread;
    },

    delete: async (id: string): Promise<void> => {
      await ensureInitialized();
      ensureDb();

      db.run('DELETE FROM threads WHERE id = ?', [id]);

      // Save to file
      await saveDatabase(process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH);
    },

    read: async (id: string): Promise<Threads> => {
      await ensureInitialized();
      ensureDb();

      const stmt = db.prepare(
        'SELECT id, appId, messages, worktreeId, name, type, userId, updated_at FROM threads WHERE id = ?'
      );
      const rows = stmt.getAsObject([id]);
      stmt.free();

      if (!rows || !rows.id) {
        throw new Error(`Thread not found for id ${id}`);
      }

      const thread: Threads = {
        id: rows.id as string,
        appId: (rows.appId as string) || undefined,
        messages: (rows.messages as string) || undefined,
        userId: (rows.userId as string) || undefined,
        worktreeId: (rows.worktreeId as string) || undefined,
        name: (rows.name as string) || undefined,
        type: (rows.type as string) || undefined,
        updatedAt: (rows.updated_at as string) || undefined,
      };

      return thread;
    },

    listAll: async (): Promise<Threads[]> => {
      await ensureInitialized();
      ensureDb();

      const dbPath = process.env['SQL_LITE_DB_PATH'] || DEFAULT_DB_PATH;
      console.log('listAll: Querying database at:', dbPath);
      const stmt = db.prepare(
        'SELECT id, appId, messages, worktreeId, name, type, userId, updated_at FROM threads ORDER BY updated_at DESC'
      );
      const results: Threads[] = [];

      let rowCount = 0;
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rowCount++;
        console.log(`Row ${rowCount}:`, row);
        results.push({
          id: row.id as string,
          appId: (row.appId as string) || undefined,
          messages: (row.messages as string) || undefined,
          userId: (row.userId as string) || undefined,
          worktreeId: (row.worktreeId as string) || undefined,
          name: (row.name as string) || undefined,
          type: (row.type as string) || undefined,
          updatedAt: (row.updated_at as string) || undefined,
        });
      }

      stmt.free();
      console.log(`listAll: Found ${results.length} threads total`);
      return results;
    },
  };
}
