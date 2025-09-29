# Larry Docker Setup

## Overview

This setup allows running the Larry AI assistant in a Docker container with automatic conversation management.

## Files Created

### 1. `Larry.Dockerfile`

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
docker build -f Larry.Dockerfile -t larry-server .
```
