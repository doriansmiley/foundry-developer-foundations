# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.11.0
FROM --platform=amd64 node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy package files
COPY package*.json /app/

# Copy dist files
COPY dist/ /app/dist

# Remove dev dependencies
RUN npm ci --only=production

# Create a non-root numeric user (must be numeric for compute modules)
RUN adduser --uid 5001 --disabled-password --gecos "" user && \
    chown -R 5001:5001 /app

USER 5001

# Environment setup
ENV NODE_ENV=production

# Specify the entrypoint explicitly as required
ENTRYPOINT ["node", "dist/computeModule.cjs"] 