import { graphQLClient } from '../config';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically } from '../../utils';
import statefulAPICall from './stateful/statefulClient';
import unbxdAPICall from './graphQL/graphQLClient';

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
  apiConfig = {
    traceIdCount: 0,
    proto: 'https',
    MELISSA_KEY: '63987687',
    storeId: '10151',
    catalogId: '10551',
    isUSStore: true,
    langId: '-1',
    siteId: 'us',
    countryKey: '_US',
    assetHost: 'https://test1.childrensplace.com',
    domain: '://test1.childrensplace.com/api/',
    unbxd: '://search.unbxd.io',
    cookie: null,
    isMobile: false,
  };
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
const getAPIConfig = () => {
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
export const executeWebServiceCall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  const apiClient = reqObj.webService.unbxd ? unbxdAPICall : statefulAPICall;
  return apiClient(apiConfigObj, reqObj).catch(errorHandler);
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
