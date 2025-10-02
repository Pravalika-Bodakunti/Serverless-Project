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

    const id = event.pathParameters.id;

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: { id },
      ConditionExpression: "attribute_exists(id)", // Ensure item exists before deleting
      ReturnValues: "ALL_OLD"
    };

    const result = await dynamo.delete(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Item deleted successfully",
        deletedItem: result.Attributes
      })
    };
  } catch (error) {
    console.error("Error deleting item:", error);
    
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
        error: "Could not delete item",
        message: error.message
      })
    };
  }
};
