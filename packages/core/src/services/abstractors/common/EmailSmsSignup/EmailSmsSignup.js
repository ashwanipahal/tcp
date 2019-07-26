import fetchData from '../../../../service/API';
import { executeExternalAPICall, getAPIConfig } from '../../../handler';
import endpoints from '../../../endpoints';

/**
 * Abstractor layer for loading data from API for SMS and Email Signup
 */
const ErrorReponse = { success: false, error: 'Invalid' };
const SuccessResponse = { success: true };

const Abstractor = {
  subscribeEmail: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processSubscriptionData)
      .catch(Abstractor.handleSubscriptionError);
  },
  subscribeSms: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processSmsSubscriptionData)
      .catch(Abstractor.handleValidationError);
  },
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
    return ErrorReponse;
  },
  processSmsSubscriptionData: res => {
    if (res.errors) {
      return ErrorReponse;
    }
    return SuccessResponse;
  },
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return SuccessResponse;
    }
    return ErrorReponse;
  },

  handleValidationError: () => {
    return ErrorReponse;
  },
  handleSubscriptionError: () => {
    return ErrorReponse;
  },
};
export default Abstractor;
