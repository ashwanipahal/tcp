import endpoints from './endpoints';

const graphQLAPIKey = {
  int: 'da2-mf3uaes3nncszkdir7t4dfj4ya',
  uat: 'da2-4epdnjdh7zhp7fvoux3eu7cgxe',
  perf: 'da2-kj4nwpz22bbaxnhx6dyxm7o3ci',
  sandbox: 'da2-4zbdyvv4cbcyhbpanpak25wtai',
};

export const awsAppSync = {
  aws_project_region: 'us-east-1',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: graphQLAPIKey.int,
  aws_content_delivery_bucket: 'ppync-20190316024210-hostingbucket-windows',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_url:
    'http://ppync-20190316024210-hostingbucket-windows.s3-website-us-east-1.amazonaws.com',
  aws_appsync_graphqlEndpoint: endpoints.graphQL.int,
};

// TODO - to move it in env config file
export const API_CONFIG = {
  sitesInfo: {
    proto: 'https',
    storeIdCA: '10152',
    storeIdUS: '10151',
    catalogIdCA: '10552',
    catalogIdUS: '10551',
    langId: '-1',
  },
  siteIds: {
    // the values here are the strings that make up the siteId protion of the sites' urls (i.e., it is the 'us' in the path ( /us/favorites)
    us: 'us',
    ca: 'ca',
  },
  companyIds: {
    us: '1',
    ca: '2',
  },
  MELISSA_KEY: '63987687',
  BV_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
  /* --------- UNBXD ------- */
  version: 'V2',
  pagetype: 'boolean',
  variantcount: '100',
  apiRequestTimeout: {
    response: 30000,
    deadline: 40000,
  },
  sessionCookieKey: 'QuantumMetricSessionID',
  apiContentType: 'application/json',
};

export default {
  awsAppSync,
  API_CONFIG,
};
