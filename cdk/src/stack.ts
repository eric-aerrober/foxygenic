import * as cdk from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create DynamoDB table for Salesforce repos
        const reposTable = new Table(this, "salesforceRepos", {
            tableName: "salesforceRepos",
            partitionKey: {
                name: "repoId",
                type: AttributeType.STRING,
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        // Create Vercel deploy role
        const vercelRole = new cdk.aws_iam.Role(this, "VercelDeployRole", {
            roleName: "vercel-deploy-role",
            assumedBy: new cdk.aws_iam.WebIdentityPrincipal(`arn:aws:iam::${process.env.CDK_DEFAULT_ACCOUNT}:oidc-provider/oidc.vercel.com`),
        });

        // Grant Vercel role access to the table
        reposTable.grantReadWriteData(vercelRole);
    }
}
