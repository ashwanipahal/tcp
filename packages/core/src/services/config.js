import endpoints from './endpoints';

const graphQLAPIKey = {
  dev: 'da2-q6pibqnepna67cdl3dr4xt7muq',
  uat: 'da2-4epdnjdh7zhp7fvoux3eu7cgxe',
  perf: 'da2-kj4nwpz22bbaxnhx6dyxm7o3ci',
};

export const awsAppSync = {
  aws_project_region: 'us-east-1',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: graphQLAPIKey.uat,
  aws_content_delivery_bucket: 'ppync-20190316024210-hostingbucket-windows',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_url:
    'http://ppync-20190316024210-hostingbucket-windows.s3-website-us-east-1.amazonaws.com',
  aws_appsync_graphqlEndpoint: endpoints.graphQL.uat,
};

export const graphQLClient = 'graphQL';

export const defaultCountry = 'USA';
export const defaultBrand = 'TCP';
export const defaultChannel = 'Desktop';

export default {
  awsAppSync,
  graphQLClient,
};
