FROM node:22.13.0-alpine

# Install npm and other dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (if needed)
EXPOSE 3000

# Default command - will be overridden
CMD ["npm", "run", "start-simple-for-test"]
