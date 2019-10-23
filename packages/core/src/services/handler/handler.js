import { trackError } from '@tcp/core/src/utils/errorReporter.util';
import { generateSessionId } from '../../utils/cookie.util';
import { graphQLClient } from '../api.constants';
import QueryBuilder from './graphQL/queries/queryBuilder';
import { importGraphQLClientDynamically, getAPIConfig, generateTraceId } from '../../utils';
import StatefulAPIClient from './stateful/statefulClient';
import UnbxdAPIClient from './unbxd/unbxdClient';
import ExternalAPIClient from './external/externalClient';

/**
 * Logs error
 * @param {*} e error object
 */
const errorHandler = ({
  err,
  reqObj = {
    webService: {
      URI: 'GRAPHQL QUERY || URI_NOT_SENT_IN_ERROR_LOGGING',
    },
  },
  reqHeaders = {
    'tcp-trace-request-id': 'NO-TRACE-ID',
    'tcp-trace-session-id': 'NO-TRACE-ID',
  },
} = {}) => {
  // unbxd-request-id
  let unbxdReqId = 'N/A';
  if (err && err.response && err.response.headers) {
    unbxdReqId = err.response.headers['unbxd-request-id'];
  }
  trackError({
    error: err,
    errorTags: [`API Handler-${reqObj.webService.URI}`, generateSessionId()],
    extraData: {
      ...reqObj,
      'trace-request-id': generateTraceId(),
      'trace-session-id': reqHeaders['tcp-trace-session-id'],
      'unbxd-request-id': unbxdReqId,
    },
  });
  throw err;
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
    .catch(err => {
      const reqObj = {
        webService: {
          URI: 'GRAPHQL QUERY',
          query,
        },
      };
      errorHandler({
        err,
        reqObj,
      });
    });
};

/**
 * @function resetGraphQLClient
 * This method resets graphql client
 *
 */
export const resetGraphQLClient = () => {
  loadGraphQLInterface().then(client => client.resetClient());
};

/**
 * Fetches Queries based on passed module, then executes the query and returns a promise for query execution
 * @param {*} moduleName Module for which query needs to be executed
 * @returns {Promise} Resolves with data or rejects with error object
 */
export const fetchModuleDataFromGraphQL = async modules => {
  const query = await QueryBuilder.getQuery(modules);
  return executeGraphQLQuery(query);
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
  return new UnbxdAPIClient(apiConfigObj, reqObj).catch(errorHandler); // TODO - Make a new Instance and for GRAPHQL as well..
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
