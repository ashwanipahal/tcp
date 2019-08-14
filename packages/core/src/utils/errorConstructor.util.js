/** @module ServiceError
 * @summary an Error class describing a service abstractor call error.
 * Objects of this type are the value that a promise returned by dynamic service
 * abstractor should reject with.
 */
import ExtendableError from 'es6-error';

class ServiceError extends ExtendableError {
  /**
   * @param {object} errorCode A object that contains - errorCode,
   *                       errorMessage, networkStatusCode, misc and errorMsg
   */
  constructor({ errorCode, errorMessage, networkStatusCode, misc, errorMsg }) {
    super(errorMsg);

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.networkStatusCode = networkStatusCode;
    this.misc = misc;
  }
}

export default ServiceError;
