import { graphQLClient } from '../api.constants';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically, getAPIConfig } from '../../utils';
import StatefulAPIClient from './stateful/statefulClient';
import unbxdAPIClient from './unbxd/unbxdClient';
import ExternalAPIClient from './external/externalClient';

/**
 * Logs error
 * @param {*} e error object
 */
const errorHandler = e => {
  // eslint-disable-next-line no-console
  console.log(e);
  throw e;
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
 * @summary Fetches Queries based on passed module, then executes the query and returns a promise for query execution
 * @param {Object} reqObj request param with endpoints and payload
 * @returns {Promise} Resolves with unbxd or stateful client based on request object or returns null
 */
export const executeStatefulAPICall = (reqObj, errHandler) => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return new StatefulAPIClient(apiConfigObj, reqObj).catch(errHandler || errorHandler);
};

export const executeUnbxdAPICall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return unbxdAPIClient(apiConfigObj, reqObj).catch(errorHandler); // TODO - Make a new Instance and for GRAPHQL as well..
};

export const executeExternalAPICall = reqObj => {
  if (!reqObj.webService) {
    return null;
  }
  const apiConfigObj = getAPIConfig();
  return new ExternalAPIClient(apiConfigObj, reqObj).catch(errorHandler);
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
