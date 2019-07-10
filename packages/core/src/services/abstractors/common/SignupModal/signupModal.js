import fetchData from '@tcp/core/src/service/API';
import mock from './mock';

/**
 * Abstractor layer for loading data from API for ModuleD related components
 */
const Abstractor = {
  getData: ({ baseURL, relURL, params = {}, method }) => {
    return fetchData(baseURL, relURL, params, method)
      .then(response => response.data)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  verifyData: (baseURI, relURI, params = {}, method) => {
    return fetchData(baseURI, relURI, params, method)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: res => {
    if (res.body && (res.body.status === 'valid' || res.body.status === 'accept_all')) {
      return true;
    }
    return false;
  },
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
