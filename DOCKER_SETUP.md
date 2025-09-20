# Larry Docker Setup

## Overview

This setup allows running the Larry AI assistant in a Docker container with automatic conversation management.

## Files Created

### 1. `Codebase.Dockerfile`

- Lightweight Alpine-based Node.js 22.13.0 image
- Installs npm and build dependencies
- Builds the cli-tools project
- Runs the Larry server with environment variable support

### 2. VS Code Extension Updates

- **Webview (`index.tsx`)**:

  - Generates unique conversation IDs
  - Manages Docker container lifecycle
  - Handles real-time message polling from SQLite
  - Saves user messages to database

- **Extension (`extension.ts`)**:
  - Docker image building and management
  - Container lifecycle (start/stop)
  - Volume mounting for `.larry` directory
  - Error handling and user feedback

## Usage

### 1. Build and Run

```bash
# Build the Docker image
docker build -f Codebase.Dockerfile -t larry-server .

# Run Larry server for a conversation
CONVERSATION_ID=123 docker run -d --name larry-server-123 -e CONVERSATION_ID=123 -v "$(pwd)/.larry:/app/.larry" larry-server
```

### 2. VS Code Extension

1. **Create New Session**: Generates conversation ID and starts Docker container
2. **Open Existing Session**: Starts Docker container for existing conversation
3. **Leave Session**: Stops Docker container
4. **Real-time Messaging**: Polls SQLite database every 2 seconds

## Environment Variables

- `CONVERSATION_ID`: Unique identifier for the conversation thread

## Volume Mounts

- `.larry/`: Shared directory for SQLite database and worktrees
  - `developer-foundations-threads.sqlite`: Message storage
  - `worktrees/`: Git worktrees for each conversation

## Container Management

- **Container Naming**: `larry-server-{conversationId}`
- **Auto-cleanup**: Containers are stopped and removed when leaving sessions
- **Error Handling**: Graceful fallback if Docker operations fail

## Database Schema

Messages are stored in SQLite with the following structure:

```json
{
  "conversationId": "conv-1234567890-abc123",
  "id": "unique-message-id",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "type": "text",
  "content": "message content",
  "metadata": {
    "isUserTurn": boolean
  }
}
```
