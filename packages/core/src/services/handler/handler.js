import { graphQLClient } from '../api.constants';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically } from '../../utils';
import statefulAPIClient from './stateful/statefulClient';
import unbxdAPIClient from './unbxd/unbxdClient';
import externalAPIClient from './external/externalClient';

let apiConfig = null;

/**
 * Logs error
 * @param {*} e error object
 */
const errorHandler = e => {
  // eslint-disable-next-line no-console
  console.log(e);
};

/**
 * Executes query on GraphQL Client
 * @param {*} query
 * @param {*} graphQLInterface
 */
const executeQuery = (query, graphQLInterface) => {
  const client = graphQLInterface.getClient();
  return client.executeQuery(query);
};

/**
 * Loads GraphQL client interface
 */
const loadGraphQLInterface = () => {
  const clientName = graphQLClient;
  return importGraphQLClientDynamically(clientName).then(
    ({ default: graphQLInterface }) => graphQLInterface
  );
};

/**
 * Executes a graph ql query
 * @param {*} QueryBuilder GraphQL query builder which returns query wrapped with graphql-tag, passed in form of a default export
 * @returns {Promise} Resolves with data or rejects with error object
 */
export const executeGraphQLQuery = query => {
  return loadGraphQLInterface()
    .then(client => executeQuery(query, client))
    .catch(errorHandler);
};

/**
 * Fetches Queries based on passed module, then executes the query and returns a promise for query execution
 * @param {*} moduleName Module for which query needs to be executed
 * @returns {Promise} Resolves with data or rejects with error object
 */
export const fetchModuleDataFromGraphQL = async modules => {
  const query = await QueryBuilder.getQuery(modules);
  return executeGraphQLQuery(query).catch(errorHandler);
};

/**
 * @summary Creates the API config object and set it to global constant to be used across
 */
const createAPIConfig = () => {
  // TODO - Get data from env config
  apiConfig = {
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
    assetHost: 'https://test3.childrensplace.com',
    domain: '://test3.childrensplace.com/api/',
    unbxd: '://search.unbxd.io',
    cookie: null,
    isMobile: false,
  };
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
export const getAPIConfig = () => {
  if (!apiConfig) {
    createAPIConfig();
  }
  return apiConfig;
};

/**
 * @summary Fetches Queries based on passed module, then executes the query and returns a promise for query execution
 * @param {Object} reqObj request param with endpoints and payload
 * @returns {Promise} Resolves with unbxd or stateful client based on request object or returns null
 */
export const executeStatefulAPICall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return statefulAPIClient(apiConfigObj, reqObj).catch(errorHandler);
};

export const executeUnbxdAPICall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return unbxdAPIClient(apiConfigObj, reqObj).catch(errorHandler);
};

export const executeExternalAPICall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return externalAPIClient(apiConfigObj, reqObj).catch(errorHandler);
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
