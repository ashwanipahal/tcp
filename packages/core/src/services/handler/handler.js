import fetch from 'node-fetch';
import { graphQLClient } from '../config';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically } from '../../utils';

if (!process.browser) {
  global.fetch = fetch;
}

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

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
