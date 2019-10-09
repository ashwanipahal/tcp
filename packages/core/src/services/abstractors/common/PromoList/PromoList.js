import logger from '@tcp/core/src/utils/loggerInstance';
import handler from '../../../handler';

/**
 * Responsible for content fetching using content ID
 */
export const DataAbstractor = {
  getData: async id => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'promoList',
        data: { cid: id, type: 'promoList' },
      })
      .then(response => (response ? response.data : {}));
  },
  processData: async data => {
    const {
      composites: { promoListWrapper },
    } = data.promoList;

    return promoListWrapper;
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {String} cid - Content ID
 */
export const getPromoList = async cid => {
  const { getData, processData } = DataAbstractor;
  let response = {};

  try {
    const data = await getData(cid);
    response = await processData(data);
  } catch (error) {
    logger.error(error);
  }
  return response;
};
