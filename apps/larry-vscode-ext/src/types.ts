export type Message = {
  conversationId: string;
  id: string;
  updatedAt: string;
  actor: 'user' | 'larry' | 'system';
  type: string; // in future e.g "markdown", "widget", etc.
  content: string;
  metadata: {
    isUserTurn: boolean;
    widgetData?: Record<string, any>;
  };
};

export type Conversation = {
  conversationId: string;
  agentId: string;
  updatedAt: string;
  name: string;
  worktreeId: string;
  messages: Message[];
};
