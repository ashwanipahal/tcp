import { executeExternalAPICall, executeStatefulAPICall } from '../../../handler';
import { getAPIConfig } from '../../../../utils';

import endpoints from '../../../endpoints';
/**
 * Abstractor layer for loading data from API for SMS and Email Signup
 */
const ErrorResponse = { success: false, error: 'Invalid' };
const SuccessResponse = { success: true };

const Abstractor = {
  /**
   * @param {Object} reqBody body to the API
   * @return {Object} return promise.
   */
  subscribeEmail: reqBody => {
    const { storeId, catalogId, langId } = getAPIConfig();
    const reqObj = {
      webService: endpoints.addEmailSignup,
      body: {
        catalogId,
        storeId,
        langId,
        ...reqBody,
      },
    };

    return executeStatefulAPICall(reqObj)
      .then(Abstractor.processSubscriptionData)
      .catch(Abstractor.handleSubscriptionError);
  },
  /**
   * @param {Object} payload payload to the API
   * @return {Object} return promise.
   */
  subscribeSms: (payload = '') => {
    const { ACQUISITION_ID } = getAPIConfig();

    const body = {
      acquisition_id: ACQUISITION_ID,
      mobile_phone: {
        mdn: payload.replace(/\D/g, ''),
      },
      custom_fields: {
        src_cd: '1',
        sub_src_cd: 'sms_footer',
      },
    };

    const reqObj = {
      webService: endpoints.addSmsSignup,
      body,
    };

    return executeStatefulAPICall(reqObj)
      .then(Abstractor.processSmsSubscriptionData)
      .catch(Abstractor.handleValidationError);
  },
  /**
   * @param {String} baseURI Base URL of the API
   * @return {Object} returns Promise.
   */
  verifyEmail: emailAddress => {
    const apiConfig = getAPIConfig();
    const payload = {
      webService: endpoints.emailVerification,
      body: {
        address: emailAddress,
        apikey: apiConfig.BV_API_KEY,
      },
    };
    return executeExternalAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleValidationError);
  },
  /**
   * @param {Object} res response object
   * @return {Object} returns success { success: true } or error ({ success: false, error: 'Invalid' }) object.
   */
  processSubscriptionData: res => {
    /**
     * The only way currently to confirm successful email subscription is that
     * we get redirectionurl with /email-confirmation on that.
     */
    if (
      res.body &&
      res.body.redirecturl &&
      res.body.redirecturl.indexOf('/email-confirmation') !== -1
    ) {
      return SuccessResponse;
    }
    return ErrorResponse;
  },
  /**
   * @param {Object} res response object
   * @return {Object} returns success { success: true } or error ({ success: false, error: 'Invalid' }) object.
   */
  processSmsSubscriptionData: res => {
    if (res.errors) {
      return ErrorResponse;
    }
    return SuccessResponse;
  },
  /**
   * @param {Object} res response object
   * @return {Object} returns success { success: true } or error ({ success: false, error: 'Invalid' }) object.
   */
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return SuccessResponse;
    }
    return ErrorResponse;
  },
  /**
   * @return {Object} returns error ({ success: false, error: 'Invalid' }) object.
   */
  handleValidationError: () => {
    return ErrorResponse;
  },
  /**
   * @return {Object} returns error ({ success: false, error: 'Invalid' }) object.
   */
  handleSubscriptionError: () => {
    return ErrorResponse;
  },
};
export default Abstractor;
