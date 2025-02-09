import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

import { awsCredentialsProvider } from "@vercel/functions/oidc";
import { RepositoryRecord } from "~/types";

const client = new DynamoDBClient({
    credentials: process.env.AWS_ROLE_ARN
        ? awsCredentialsProvider({
              roleArn: process.env.AWS_ROLE_ARN!,
          })
        : undefined,
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.REPO_TABLE!;

export const scanRepositories = async () => {
    try {
        const command = new ScanCommand({ TableName: tableName });
        const response = await ddbDocClient.send(command);
        return response.Items as RepositoryRecord[];
    } catch (error) {
        return [];
    }
};

export const putRepository = async (repository: RepositoryRecord) => {
    const command = new PutCommand({
        TableName: tableName,
        Item: repository,
    });
    await ddbDocClient.send(command);
};
