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
    Abstractor.getMock();
  },
};

/**
 * Responsible for loading the category promo content
 * @param {String} cid - Content ID
 */
export const getCategoryPromo = async cid => {
  const { getData, processData } = Abstractor;
  let response = {};

  try {
    const data = await getData(cid);
    response = await processData(data);
  } catch (error) {
    logger.error(error);
  }
  return response;
};

export default Abstractor;
