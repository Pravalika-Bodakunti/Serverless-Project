const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

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

    const result = await dynamo.get(params).promise();

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
