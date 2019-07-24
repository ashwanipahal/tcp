import fetchData from '../../../../service/API';
import { executeExternalAPICall, getAPIConfig } from '../../../handler';
import endpoints from '../../../endpoints';

/**
 * Abstractor layer for loading data from API for SMS and Email Signup
 */
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
    if (
      res.body &&
      res.body.redirecturl &&
      res.body.redirecturl.indexOf('/email-confirmation') !== -1
    ) {
      return { success: true };
    }
    return { error: 'invalid' };
  },
  processSmsSubscriptionData: res => {
    if (res.errors) {
      return { error: 'invalid' };
    }
    return { success: true };
  },
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return { success: true };
    }
    return { error: 'invalid' };
  },

  handleValidationError: () => {
    return { error: 'invalid' };
  },
  handleSubscriptionError: () => {
    return { error: 'invalid' };
  },
};
export default Abstractor;
