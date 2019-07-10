import { graphQLClient } from '../config';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically } from '../../utils';
import webServiceCall from './statefull/statefullClient';

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

export const createAPIConfig = () => {
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

export const getAPIConfig = () => {
  if (!apiConfig) {
    createAPIConfig();
  }
  return apiConfig;
};

export const executeWebServiceCall = reqObj => {
  const apiConfigObj = getAPIConfig();
  return webServiceCall(apiConfigObj, reqObj).catch(errorHandler);
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
