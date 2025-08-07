ARG NODE_VERSION=23.11.0
FROM --platform=amd64 node:${NODE_VERSION}-alpine

# Install essential tools
RUN apk add --no-cache git

WORKDIR /app

# Copy package.json for the specific package to install its dependencies
COPY packages/agents/vickie-bennie/package.json ./package.json

# For now .env are in dockerignore, figure out if we need to copy them
# COPY packages/agents/vickie-bennie/.env ./.env

# Install only production dependencies for this specific package
RUN npm install --only=production && npm cache clean --force

# Copy the pre-built dist files
COPY dist/packages/agents/vickie-bennie ./dist

# Create a non-root numeric user (must be numeric for compute modules)
RUN adduser --uid 5001 --disabled-password --gecos "" user && \
    chown -R 5001:5001 /app

USER 5001

# Environment setup
ENV NODE_ENV=production

# Specify the entrypoint explicitly as required
ENTRYPOINT ["node", "dist/lib/computeModule.cjs"] 