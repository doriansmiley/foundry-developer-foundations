#!/bin/bash

echo "🔧 Fixing npm install issues..."

# Check Node.js version
echo "📊 Checking Node.js version..."
node_version=$(node -v)
echo "Current Node.js version: $node_version"

if [[ ! "$node_version" =~ ^v22\. ]]; then
    echo "⚠️  Warning: Node.js version should be 22.x for this project"
    echo "   Consider using nvm: nvm use 22"
fi

# Check npm version
echo "📊 Checking npm version..."
npm_version=$(npm -v)
echo "Current npm version: $npm_version"

# Clean up existing installations
echo "🧹 Cleaning up existing node_modules and lock files..."
rm -rf node_modules
rm -rf .nx/installation
rm -f package-lock.json

# Clear npm cache
echo "🗑️  Clearing npm cache..."
npm cache clean --force

# Configure npm for better reliability
echo "⚙️  Configuring npm..."
npm config set fund false
npm config set audit false
npm config set progress false
npm config set loglevel error
npm config set prefer-offline true

# Install dependencies with nx wrapper skipped to prevent hanging
echo "📦 Installing dependencies (skipping nx postinstall)..."
export NX_WRAPPER_SKIP_INSTALL=true
npm install --no-fund --no-audit --prefer-offline

if [ $? -eq 0 ]; then
    echo "📦 npm install completed successfully!"
    
    # Now manually initialize nx
    echo "🔧 Initializing nx installation..."
    npx nx --version
    
    if [ $? -eq 0 ]; then
        echo "✅ Setup completed successfully!"
    else
        echo "⚠️  nx initialization had issues but dependencies are installed"
    fi
else
    echo "❌ npm install failed. Try running this script again or check your internet connection."
    exit 1
fi 