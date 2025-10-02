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

    const id = event.pathParameters.id;
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

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: { id },
      UpdateExpression: "set #n = :name, #u = :updatedAt",
      ExpressionAttributeNames: { 
        "#n": "name",
        "#u": "updatedAt"
      },
      ExpressionAttributeValues: { 
        ":name": body.name,
        ":updatedAt": new Date().toISOString()
      },
      ConditionExpression: "attribute_exists(id)", // Ensure item exists
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamo.update(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Item updated successfully",
        item: result.Attributes
      })
    };
  } catch (error) {
    console.error("Error updating item:", error);
    
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: "Item not found"
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not update item",
        message: error.message
      })
    };
  }
};
