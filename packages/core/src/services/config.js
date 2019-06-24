import endpoints from './endpoints';

export const awsAppSync = {
  aws_project_region: 'us-east-1',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-ehb42hpkffdwjdp2it63titn6e',
  aws_content_delivery_bucket: 'ppync-20190316024210-hostingbucket-windows',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_url:
    'http://ppync-20190316024210-hostingbucket-windows.s3-website-us-east-1.amazonaws.com',
  aws_appsync_graphqlEndpoint: endpoints.graphQL,
};

export const graphQLClient = 'awsAppSync';

export default {
  awsAppSync,
  graphQLClient,
};
