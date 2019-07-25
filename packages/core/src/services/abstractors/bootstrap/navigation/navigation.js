import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Navigation
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => data,
};

export default Abstractor;
