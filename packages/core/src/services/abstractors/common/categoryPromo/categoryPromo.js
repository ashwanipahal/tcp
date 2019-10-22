import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for categoryPromo component
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
  handleError: e => {
    logger.error(e);
  },
};

export default Abstractor;
