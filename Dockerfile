# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0
FROM --platform=amd64 node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy package files
COPY package*.json /app/

# Install all dependencies for building
RUN npm ci

# Copy source files
COPY tsconfig.json /app/
COPY src/ /app/src/

# Build TypeScript
RUN npm run build

# Remove dev dependencies
RUN npm ci --only=production

# Create a non-root numeric user (must be numeric for compute modules)
RUN adduser --uid 5001 --disabled-password --gecos "" user && \
    chown -R 5001:5001 /app

USER 5001

# Environment setup
ENV NODE_ENV=production

# Verify directory structure
RUN ls -la /app/src/domain && \
    ls -la /app/src/services

# Specify the entrypoint explicitly as required
ENTRYPOINT ["node", "dist/src/index.js"] 