import fetchData from '@tcp/core/src/service/API';

/**
 * Abstractor layer for loading data from API for SMS and Email Signup
 */
const Abstractor = {
  subscribeEmail: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processSubscriptionData)
      .catch(Abstractor.handleError);
  },
  subscribeSms: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processSmsSubscriptionData)
      .catch(Abstractor.handleError);
  },
  verifyEmail: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
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
      return false;
    }
    return true;
  },
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return 'valid';
    }
    return 'invalid';
  },

  handleError: e => {
    console.log(e);
    return 'invalid';
  },
};
export default Abstractor;
