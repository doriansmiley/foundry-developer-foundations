import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';

export type ConversationRole = 'system' | 'user' | 'assistant';

export type ConversationMessage = {
  role: ConversationRole;
  content: string;
  created_at?: string;
};

let db: sqlite3.Database | null = null;

const DEFAULT_DB_PATH = path.resolve(
  process.cwd(),
  'tmp/google-service-coding-assistant.sqlite'
); // TODO: make this configurable

async function initDatabase(dbPath: string = DEFAULT_DB_PATH): Promise<void> {
  if (db) return;

  await mkdir(path.dirname(dbPath), { recursive: true });
  sqlite3.verbose();

  db = new sqlite3.Database(dbPath);

  await run(
    'CREATE TABLE IF NOT EXISTS messages (\n      id TEXT PRIMARY KEY,\n      conversation_id TEXT NOT NULL,\n      role TEXT NOT NULL,\n      content TEXT NOT NULL,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );'
  );

  await run(
    'CREATE INDEX IF NOT EXISTS idx_messages_conv_created ON messages(conversation_id, created_at);'
  );
}

function ensureDb() {
  if (!db) {
    throw new Error(
      'Conversation store not initialized. Call ensureInitialized() first.'
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

function all<T = any>(sql: string, params: unknown[] = []): Promise<T[]> {
  ensureDb();
  return new Promise((resolve, reject) => {
    db!.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows as T[]);
    });
  });
}

export async function ensureInitialized(dbPath?: string): Promise<void> {
  await initDatabase(dbPath);
}

export function createConversationId(): string {
  return randomUUID();
}

export async function appendMessage(
  conversationId: string,
  role: ConversationRole,
  content: string
): Promise<void> {
  await ensureInitialized();
  const id = randomUUID();
  await run(
    'INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)',
    [id, conversationId, role, content]
  );
}

export async function appendMessages(
  conversationId: string,
  messages: ConversationMessage[]
): Promise<void> {
  for (const m of messages) {
    await appendMessage(conversationId, m.role, m.content);
  }
}

export async function readConversation(
  conversationId?: string
): Promise<ConversationMessage[]> {
  if (!conversationId) {
    return [];
  }

  await ensureInitialized();
  const rows = await all<{
    role: ConversationRole;
    content: string;
    created_at: string;
  }>(
    'SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY datetime(created_at) ASC, rowid ASC',
    [conversationId]
  );
  return rows.map((r) => ({
    role: r.role,
    content: r.content,
    created_at: r.created_at,
  }));
}
