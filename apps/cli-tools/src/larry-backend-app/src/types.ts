import { Context } from '@codestrap/developer-foundations-types';

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
  status: MachineStatus;
  currentState: string | undefined;
  // Context scoped to the CURRENT state, on updates it is better to just send this than entire context
  currentStateContext?: Record<string, any>;
  // this is useful while getting all machine details to load up history
  context?: Context; // entire context for the machine
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
