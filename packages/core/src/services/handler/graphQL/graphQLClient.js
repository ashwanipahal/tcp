import AWSAppSync from 'aws-appsync';
import fetch from 'node-fetch';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getAPIConfig } from '../../../utils/utils';

// TODO - use util's isServer Method
if (!process.browser) {
  global.fetch = fetch;
}

const singleton = Symbol('singleton class');
const singletonEnforcer = Symbol('forces singleton class instance');

/**
 * Singleton Class AwsAppSyncClient which extends AWSAppSync npm module
 */
class AwsAppSyncClient extends AWSAppSync {
  /**
   * Ensures singleton instance of this class
   */
  constructor(enforcer, options) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
    super(options);
  }

  /**
   * Returns singleton instance of this class
   */
  static getClient() {
    if (!this[singleton]) {
      this[singleton] = new AwsAppSyncClient(singletonEnforcer, AwsAppSyncClient.clientOptions());
    }

    return this[singleton];
  }

  /**
   * This function returns config options used to initialize awsAppSync Class
   */
  static clientOptions() {
    const apiConfigObj = getAPIConfig();
    logger.info(
      'GraphQL Endpoint ------------ ',
      apiConfigObj.graphql_endpoint_url,
      ` - ${apiConfigObj.graphql_api_key}`
    );
    return {
      url: apiConfigObj.graphql_endpoint_url,
      region: apiConfigObj.graphql_reqion,
      auth: {
        type: apiConfigObj.graphql_auth_type,
        apiKey: apiConfigObj.graphql_api_key,
      },
      disableOffline: true,
    };
  }

  /**
   * @function resetClient
   * This method resets singleton instance - needed for brand switch in mobile app
   *
   * @static
   * @memberof AwsAppSyncClient
   */
  static resetClient() {
    this[singleton] = new AwsAppSyncClient(singletonEnforcer, AwsAppSyncClient.clientOptions());
  }

  /**
   * This function executes graphQL query
   * @param {*} query GraphQL query
   * @returns {Promise} Resolves with data or rejects with error object
   */
  executeQuery(query) {
    return this.hydrated().then(client => client.query({ query, fetchPolicy: 'network-only' }));
  }
}

export default AwsAppSyncClient;
