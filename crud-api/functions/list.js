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
    const params = {
      TableName: process.env.TABLE_NAME
    };

    const result = await dynamo.scan(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        items: result.Items,
        count: result.Count
      })
    };
  } catch (error) {
    console.error("Error listing items:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not list items",
        message: error.message
      })
    };
  }
};
