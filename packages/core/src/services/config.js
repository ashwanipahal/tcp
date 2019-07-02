import endpoints from './endpoints';

const graphQLAPIKey = {
  dev: 'da2-vg7nle5r3vbafbeh3ntt7tkkrm',
  uat: 'da2-sjg3l2hlijggnhsjd73i7qu3e4',
};

export const awsAppSync = {
  aws_project_region: 'us-east-1',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: graphQLAPIKey.dev,
  aws_content_delivery_bucket: 'ppync-20190316024210-hostingbucket-windows',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_url:
    'http://ppync-20190316024210-hostingbucket-windows.s3-website-us-east-1.amazonaws.com',
  aws_appsync_graphqlEndpoint: endpoints.graphQL.dev,
};

export const graphQLClient = 'graphQL';

export const defaultCountry = 'USA';
export const defaultBrand = 'TCP';
export const defaultChannel = 'Desktop';

export default {
  awsAppSync,
  graphQLClient,
};
