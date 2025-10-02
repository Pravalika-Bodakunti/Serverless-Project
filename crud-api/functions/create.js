const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dynamo = new AWS.DynamoDB.DocumentClient();

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
    
    const item = {
      id,
      name: body.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: item,
      ConditionExpression: "attribute_not_exists(id)" // Prevent overwriting existing items
    };

    await dynamo.put(params).promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: "Item created successfully",
        item
      })
    };
  } catch (error) {
    console.error("Error creating item:", error);
    
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: "Item with this ID already exists"
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not create item",
        message: error.message
      })
    };
  }
};
