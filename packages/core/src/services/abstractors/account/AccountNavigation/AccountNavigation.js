import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for ModuleD related components
 */
const Abstractor = {
  getData: (module, data) => {
    handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => {
    console.log(data.accountNavigation);
    try {
      return data.accountNavigation
    } catch (e) {
      return {
        data: [],
      };
    }
  },
};
export default Abstractor;
