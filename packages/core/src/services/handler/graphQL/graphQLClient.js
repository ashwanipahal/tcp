import AWSAppSync from 'aws-appsync';
import fetch from 'node-fetch';
import { awsAppSync as config } from '../../config';
import { isServer } from '../../../utils';

if (isServer()) {
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
    return {
      url: config.aws_appsync_graphqlEndpoint,
      region: config.aws_appsync_region,
      auth: {
        type: config.aws_appsync_authenticationType,
        apiKey: config.aws_appsync_apiKey,
      },
      disableOffline: true,
    };
  }

  /**
   * This function executes graphQL query
   * @param {*} query GraphQL query
   * @returns {Promise} Resolves with data or rejects with error object
   */
  executeQuery(query) {
    return this.hydrated().then(client => {
      return client.query({ query, fetchPolicy: 'network-only' }).catch(e => {
        this.errorHandler(e);
      });
    });
  }

  errorHandler(e) {
    // eslint-disable-next-line no-console
    console.log(this, e);
  }
}

export default AwsAppSyncClient;
