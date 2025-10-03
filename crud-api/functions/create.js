const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
};

module.exports.handler = async (event) => {
  try {
    // Validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Request body is required"
        })
      };
    }

    const body = JSON.parse(event.body);

    // Validate required fields
    if (!body.name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Name is required"
        })
      };
    }

    // Generate ID if not provided
    const id = body.id || uuidv4();
    
    const task = {
      id,
      title: body.title || body.name, // Support both title and name for backward compatibility
      description: body.description || '',
      status: body.status || 'TODO',
      priority: body.priority || 'MEDIUM',
      category: body.category || 'WORK',
      dueDate: body.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const params = {
      TableName: process.env.TASKS_TABLE,
      Item: task,
      ConditionExpression: "attribute_not_exists(id)" // Prevent overwriting existing tasks
    };

    await dynamo.send(new PutCommand(params));

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: "Task created successfully",
        task
      })
    };
  } catch (error) {
    console.error("Error creating task:", error);
    
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: "Task with this ID already exists"
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not create task",
        message: error.message
      })
    };
  }
};
