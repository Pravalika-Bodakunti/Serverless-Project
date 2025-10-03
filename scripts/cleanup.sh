#!/bin/bash

# Task Management API Cleanup Script
# Usage: ./scripts/cleanup.sh [dev|prod]

set -e

STAGE=${1:-dev}

echo "🧹 Cleaning up Task Management API from $STAGE environment..."

# Check if stage is valid
if [[ "$STAGE" != "dev" && "$STAGE" != "prod" ]]; then
    echo "❌ Error: Stage must be 'dev' or 'prod'"
    exit 1
fi

# Navigate to API directory
cd crud-api

# Remove the stack
echo "🗑️  Removing AWS resources..."
npx serverless remove --stage $STAGE --verbose

echo "✅ Cleanup of $STAGE environment completed successfully!"
echo "⚠️  All AWS resources for $STAGE have been removed"
