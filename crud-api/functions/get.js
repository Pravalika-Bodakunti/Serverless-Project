const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

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
    // Validate path parameters
    if (!event.pathParameters || !event.pathParameters.id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Item ID is required"
        })
      };
    }

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: { id: event.pathParameters.id }
    };

    const result = await dynamo.send(new GetCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: "Item not found"
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error("Error getting item:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not get item",
        message: error.message
      })
    };
  }
};
