import fetchData from '../../../../service/API';
import { executeExternalAPICall } from '../../../handler';
import { getAPIConfig } from '../../../../utils';

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
      return true;
    }
    return false;
  },
  processSmsSubscriptionData: res => {
    if (res.errors) {
      return 'invalid';
    }
    return 'valid';
  },
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return true;
    }
    return false;
  },

  handleValidationError: e => {
    // eslint-disable-next-line no-console
    console.log(e);
    return 'invalid';
  },
  handleSubscriptionError: e => {
    // eslint-disable-next-line no-console
    console.log(e);
    return false;
  },
};
export default Abstractor;
