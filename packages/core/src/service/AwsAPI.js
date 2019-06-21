import AWSAppSyncClient from 'aws-appsync';
// import { fetch } from "node-fetch";
import { awsConfig } from './aws-cred-exports';

export default class AwsAppSyncClient {
  static getClient() {
    if (AwsAppSyncClient.client) return AwsAppSyncClient.client;
    return AwsAppSyncClient.createClient();
  }

  static createClient() {
    AwsAppSyncClient.client = new AWSAppSyncClient({
      url: awsConfig.aws_appsync_graphqlEndpoint,
      region: awsConfig.aws_appsync_region,
      auth: {
        type: awsConfig.aws_appsync_authenticationType,
        apiKey: awsConfig.aws_appsync_apiKey,
      },
    });
    return AwsAppSyncClient.client;
  }
}
