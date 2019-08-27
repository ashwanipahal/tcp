import graphQLClient from '../../services/handler/graphQL/graphQLClient';
import LayoutQuery from '../../services/handler/graphQL/queries/layout/layout.query';
import { awsAppSync } from '../../services/config';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

export const importGraphQLClientDynamically = module => {
  return new Promise(resolve => {
    if (module === 'graphQLClient') {
      sendResponse(
        {
          default: graphQLClient,
        },
        resolve
      );
    }
  });
};

export const importGraphQLQueriesDynamically = module => {
  return new Promise(resolve => {
    if (module === 'layout') {
      sendResponse(
        {
          default: LayoutQuery,
        },
        resolve
      );
    }
  });
};

export const getAPIConfig = () => {
  return {
    port: 8081,
    brandId: 'tcp',
    brandIdCMS: 'TCP',
    traceIdCount: 0,
    proto: 'https',
    MELISSA_KEY: '63987687',
    BV_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
    storeId: '10151',
    catalogId: '10551',
    isUSStore: true,
    langId: '-1',
    siteId: 'us',
    countryKey: '_US',
    assetHost: 'https://test5.childrensplace.com',
    domain: 'https://test5.childrensplace.com/api/',
    unbxd: '://search.unbxd.io',
    cookie: null,
    isMobile: false,
    graphql_reqion: awsAppSync.aws_appsync_region,
    graphql_endpoint_url: awsAppSync.aws_appsync_graphqlEndpoint,
    graphql_auth_type: awsAppSync.aws_appsync_authenticationType,
    graphql_api_key: awsAppSync.aws_appsync_apiKey,
  };
};

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
  getAPIConfig,
};
