import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for ModuleD related components
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: data => data,
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
