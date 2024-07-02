import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import AWS from "aws-sdk"; // Only needed for configuring AWS SDK v2
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// AWS SDK v2 configuration (if still needed for other parts of your application)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

// Create a DynamoDB v3 client
const client = new DynamoDBClient({});

// Create DynamoDBDocumentClient from the DynamoDB v3 client
const dynamoDB = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "user_table";

export const signupUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const accountCreated = new Date().toISOString();

  const params = {
    TableName: TABLE_NAME,
    Item: {
      email,          // Primary key
      firstName,
      lastName,
      password: hashedPassword,
      accountCreated,
    },
    ConditionExpression: "attribute_not_exists(email)",
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    return { email, firstName, lastName, accountCreated };
  } catch (error: any) {
    if (error.name === "ConditionalCheckFailedException") {
      throw new Error("User already exists");
    } else {
      throw error;
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      email,          // Primary key
    },
  };

  try {
    const data = await dynamoDB.send(new GetCommand(params));
    if (!data.Item) {
      throw new Error("User not found");
    }

    const { password: hashedPassword, name, lastname, accountCreated } = data.Item;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      throw new Error("Unauthorized");
    }

    // Update last login time
    const lastLogin = new Date().toISOString();
    const updateParams = {
      TableName: TABLE_NAME,
      Key: {
        email: email,  // Specify the email as the key
      },
      UpdateExpression: "set lastLogin = :lastLogin",
      ExpressionAttributeValues: {
        ":lastLogin": lastLogin,
      },
      ReturnValues: "UPDATED_NEW" as const,  // Ensure ReturnValues is of type 'UPDATED_NEW'
    };
    
    await dynamoDB.send(new UpdateCommand(updateParams));

    return { email, name, lastname, accountCreated, lastLogin };
  } catch (error) {
    throw error;
  }
};
