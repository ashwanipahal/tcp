import handler from '../../../handler';
import mock from './mock';

/**
 * Abstractor layer for loading data from API for Labels
 */
const Abstractor = {
  getData: (module, contentId) => {
    return handler.fetchDataFromGraphQL(module, contentId).then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => {
    return data;
  },
};

export default Abstractor;
