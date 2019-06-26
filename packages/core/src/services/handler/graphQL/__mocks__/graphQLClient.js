import { awsAppSync as config } from '../../../config';
import ModuleDMock from '../../../abstractors/common/moduleD/mock';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

const singleton = Symbol('singleton class');
const singletonEnforcer = Symbol('forces singleton class instance');

/**
 * Singleton Class AwsAppSyncClient which extends AWSAppSync npm module
 */
class AwsAppSyncClientMock {
  /**
   * Ensures singleton instance of this class
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
  }

  /**
   * Returns singleton instance of this class
   */
  static getClient() {
    if (!this[singleton]) {
      this[singleton] = new AwsAppSyncClientMock(singletonEnforcer);
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
  // eslint-disable-next-line class-methods-use-this
  executeQuery() {
    return new Promise(resolve => {
      sendResponse(ModuleDMock, resolve);
    });
  }

  errorHandler(e) {
    // eslint-disable-next-line no-console
    console.log(this, e);
  }
}

export default AwsAppSyncClientMock;
