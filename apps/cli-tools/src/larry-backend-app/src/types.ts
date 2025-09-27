export type UUID = string;

export type MachineStatus =
  | 'pending'
  | 'running'
  | 'awaiting_human'
  | 'success'
  | 'error'
  | 'canceled';

export interface ThreadListItem {
  id: UUID;
  label: string;
  worktreeName: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface ThreadsListResponse {
  items: ThreadListItem[];
  nextCursor: string | null;
  requestId: string;
}

export interface MachineResponse {
  id: UUID; // machineId/executionId
  status: any;
  currentState: string | undefined;
  // Context scoped to the CURRENT state - flexible, includes artifacts inside
  currentStateContext: Record<string, any>; // may include { artifacts: [...] }
  // passthroughs from DAO while you still need them
  machine?: string; // raw JSON string from DAO
  state?: string; // raw JSON string from DAO
  logs?: string;
}

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  requestId: string;
}

// Helpers for SSE payloads
export interface ThreadCreatedEvent {
  type: 'thread.created';
  threadId: UUID;
  machineId: UUID;
  label: string;
  worktreeName: string;
  clientRequestId?: string;
}

export interface MachineUpdatedEvent {
  type: 'machine.updated';
  machine: MachineResponse;
  clientRequestId?: string;
}
