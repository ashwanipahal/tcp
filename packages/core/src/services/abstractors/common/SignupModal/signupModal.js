import fetchData from '@tcp/core/src/service/API';
import mock from './mock';

/**
 * Abstractor layer for loading data from API for ModuleD related components
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
  getMock: () => {
    return mock;
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
    console.log('processSmsSubscriptionData', res);
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
  // eslint-disable-next-line no-console
  handleError: e => {
    console.log(e);
    return 'invalid';
  },
};
export default Abstractor;
