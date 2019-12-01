import endpoints from './endpoints';

const graphQLAPIKey = {
  int: 'da2-mf3uaes3nncszkdir7t4dfj4ya',
  uat: 'da2-4epdnjdh7zhp7fvoux3eu7cgxe',
  perf: 'da2-kj4nwpz22bbaxnhx6dyxm7o3ci',
  sandbox: 'da2-4zbdyvv4cbcyhbpanpak25wtai',
};

export const googleAppConfig = {
  google_map_api_key: 'AIzaSyDYl5bgJ8yD30bRchcB0hKgZgJR0JqdrO4',
};

export const UPDATE_ITEM_IN_CART = {
  X_CALCULATION_USAGE: '-1,-3,-5,-6,-7',
  X_UPDATE_DESCRIPTION: 'true',
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

export const moduleNames = {
  accountNavigation: 'AccountNavigation',
  navigation: 'navigation',
  subNavigation: 'subNavigation',
};

// TODO - to move it in env config file
export const API_CONFIG = {
  sites: ['us', 'ca'],
  brands: ['tcp', 'gym'],
  channels: ['Desktop', 'MobileWeb', 'MobileApp'],
  channelIds: {
    Desktop: 'Desktop',
    MobileWeb: 'MobileWeb',
    MobileApp: 'MobileApp',
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
  brandIds: {
    tcp: 'tcp',
    gym: 'gym',
  },
  TCP_CONFIG_OPTIONS: {
    brandId: 'tcp',
    brandIdCMS: 'TCP',
  },
  GYM_CONFIG_OPTIONS: {
    brandId: 'gym',
    brandIdCMS: 'Gymboree',
  },
  CATALOGID_CONFIG: {
    TCP: {
      USA: '10551',
      Canada: '10552',
    },
    Gymboree: {
      USA: '10555',
      Canada: '10556',
    },
  },
  sitesInfo: {
    port: 8081,
    proto: 'https',
    protoSeparator: '://',
    langId: '-1',
    MELISSA_KEY: '63987687',
    BV_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
    traceIdCount: 0,
    assetHost: '/',
    domain: '/',
    unbxd: 'https://search.unbxd.io',
    BV_SHARED_KEY: 'Fca3yih00AVeVDFvmaDwnwlWM',
    BV_WEB_VIEW_URL: 'https://test4.childrensplace.com/static/bazaarVoice/index.html',
  },
  US_CONFIG_OPTIONS: {
    storeId: '10151',
    isUSStore: true,
    countryKey: '_US',
    siteId: 'us',
    siteIdCMS: 'USA',
  },
  CA_CONFIG_OPTIONS: {
    storeId: '10152',
    isUSStore: false,
    countryKey: '_CA',
    siteId: 'ca',
    siteIdCMS: 'Canada',
  },
  /* --------- UNBXD ------- */
  version: 'V2',
  pagetype: 'boolean',
  variantcount: '100',
  apiRequestTimeout: {
    response: 30000,
    deadline: 40000,
  },
  overlayTimeout: 5000,
  sessionCookieKey: 'QuantumMetricSessionID',
  pageCountCookieKey: 'pv',
  apiContentType: 'application/json',
};

export default {
  awsAppSync,
  API_CONFIG,
  googleAppConfig,
};
