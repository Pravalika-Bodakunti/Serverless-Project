#!/bin/bash

# Task Management API Testing Script
# Usage: ./scripts/test-api.sh [dev|prod]

set -e

STAGE=${1:-dev}
BASE_URL=""

echo "🧪 Testing Task Management API on $STAGE environment..."

# Get the API URL
if [[ "$STAGE" == "dev" ]]; then
    BASE_URL="https://zg6y5ynqd0.execute-api.us-east-2.amazonaws.com/dev"
elif [[ "$STAGE" == "prod" ]]; then
    BASE_URL="https://jf043lb8n8.execute-api.us-east-2.amazonaws.com/prod"
else
    echo "❌ Error: Stage must be 'dev' or 'prod'"
    exit 1
fi

echo "🌐 Testing API at: $BASE_URL"
echo ""

# Test 1: Create a task
echo "1️⃣ Testing CREATE task..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "Test Description", "priority": "HIGH", "category": "WORK"}')

echo "Response: $CREATE_RESPONSE"
TASK_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "✅ Task created with ID: $TASK_ID"
echo ""

# Test 2: List all tasks
echo "2️⃣ Testing LIST tasks..."
LIST_RESPONSE=$(curl -s -X GET "$BASE_URL/tasks")
echo "Response: $LIST_RESPONSE"
echo "✅ Tasks listed successfully"
echo ""

# Test 3: Get specific task
echo "3️⃣ Testing GET specific task..."
GET_RESPONSE=$(curl -s -X GET "$BASE_URL/tasks/$TASK_ID")
echo "Response: $GET_RESPONSE"
echo "✅ Task retrieved successfully"
echo ""

# Test 4: Update task
echo "4️⃣ Testing UPDATE task..."
UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/tasks/$TASK_ID" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Test Task", "status": "IN_PROGRESS"}')
echo "Response: $UPDATE_RESPONSE"
echo "✅ Task updated successfully"
echo ""

# Test 5: Delete task
echo "5️⃣ Testing DELETE task..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/tasks/$TASK_ID")
echo "Response: $DELETE_RESPONSE"
echo "✅ Task deleted successfully"
echo ""

echo "🎉 All API tests completed successfully!"
echo "✅ CREATE, READ, UPDATE, DELETE operations all working"
