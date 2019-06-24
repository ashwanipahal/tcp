import fetch from 'node-fetch';
import { graphQLClient } from '../config';
import QueryBuilder from '../queries';

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
 * Executes a graph ql query
 * @param {*} QueryBuilder GraphQL query builder which returns query wrapped with graphql-tag, passed in form of a default export
 * @returns {Promise} Resolves with data or rejects with error object
 */
export const executeGraphQLQuery = query => {
  const clientName = graphQLClient;
  return import(`./${clientName}`)
    .then(({ default: graphQLInterface }) => {
      const client = graphQLInterface.getClient();
      return client.executeQuery(query);
    })
    .catch(errorHandler);
};

/**
 * Fetches Queries based on passed module, then executes the query and returns a promise for query execution
 * @param {*} moduleName Module for which query needs to be executed
 * @returns {Promise} Resolves with data or rejects with error object
 */
export const fetchDataFromGraphQL = async modules => {
  const query = await QueryBuilder.getQuery(modules);
  return executeGraphQLQuery(query).catch(errorHandler);
};

export default {
  fetchDataFromGraphQL,
  executeGraphQLQuery,
};
