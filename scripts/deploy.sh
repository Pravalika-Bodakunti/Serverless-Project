#!/bin/bash

# Task Management API Deployment Script
# Usage: ./scripts/deploy.sh [dev|prod]

set -e

STAGE=${1:-dev}
SERVICE_NAME="task-management-api"

echo "🚀 Deploying Task Management API to $STAGE environment..."

# Check if stage is valid
if [[ "$STAGE" != "dev" && "$STAGE" != "prod" ]]; then
    echo "❌ Error: Stage must be 'dev' or 'prod'"
    exit 1
fi

# Navigate to API directory
cd crud-api

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy using Serverless Framework
echo "☁️  Deploying to AWS..."
npx serverless deploy --stage $STAGE --verbose

# Get deployment info
echo "📊 Getting deployment information..."
npx serverless info --stage $STAGE

echo "✅ Deployment to $STAGE completed successfully!"

# Display API endpoints
echo ""
echo "🌐 API Endpoints:"
echo "Base URL: https://$(npx serverless info --stage $STAGE | grep -o 'https://[^/]*' | head -1)/$STAGE"
echo ""
echo "Available endpoints:"
echo "  POST   /tasks     - Create new task"
echo "  GET    /tasks     - List all tasks"
echo "  GET    /tasks/{id} - Get specific task"
echo "  PUT    /tasks/{id} - Update task"
echo "  DELETE /tasks/{id} - Delete task"
echo ""
echo "🧪 Test your API with:"
echo "curl -X POST https://$(npx serverless info --stage $STAGE | grep -o 'https://[^/]*' | head -1)/$STAGE/tasks \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"title\": \"Test Task\", \"description\": \"Test Description\"}'"
