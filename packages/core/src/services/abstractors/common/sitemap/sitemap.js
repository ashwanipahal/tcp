import logger from '@tcp/core/src/utils/loggerInstance';
import handler from '../../../handler';

/**
 * Abstractor layer for getting sitemap data
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => {
        return response.data.siteMap;
      })
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  processData: data => data,
  handleError: e => logger.error(e),
};
export default Abstractor;
