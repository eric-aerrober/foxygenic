#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { CdkStack } from "./stack";

const app = new cdk.App();
new CdkStack(app, "SalesforceDirectory", {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-west-2" },
});
