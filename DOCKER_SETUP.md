# Larry Docker Setup

## Overview

This setup allows running the Larry AI assistant in a Docker container with automatic conversation management.

## Files Created

### 1. `Larry.Dockerfile`

- Lightweight Alpine-based Node.js 22.13.0 image
- Needs to have mounted directory
- Runs cli-tools "server" script

## Usage

### 1. Build and Run

```bash
# Build the Docker image
docker build -f Larry.Dockerfile -t larry-server .
```
