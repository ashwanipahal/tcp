import logger from '@tcp/core/src/utils/loggerInstance';
import handler from '../../../handler';

/**
 * @const DataAbstractor
 *
 * @member - getData - responsible for fetching the data for left navigation.
 * @member - processData - responsible form processing the data and return to navigation bar.
 */
export const DataAbstractor = {
  getData: async (category, brand, country, channel) => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'subNavigation',
        data: { category, brand, country, channel, type: 'subNavigation' },
      })
      .then(response => (response ? response.data : {}));
  },

  processData: async (data, category) => {
    if (Object.keys(data).length) {
      const subNavigation = data.subNavigation.map(item => {
        const tempItem = Object.assign({}, item);
        if (Object.keys(tempItem.leafLink).length) {
          tempItem.leafLink.id = tempItem.leafLink.text.split(' ').join('-');
          tempItem.leafLink.component = tempItem.leafLink.text.split(' ').join('-');
          tempItem.leafLink.displayName = tempItem.leafLink.text;
        }
        return tempItem;
      });
      return {
        key: category,
        val: subNavigation,
      };
    }
    return {};
  },
};

export const getNavigationData = async (category, brand, country, channel) => {
  const { getData, processData } = DataAbstractor;
  let response = {};

  try {
    const data = await getData(category, brand, country, channel);
    response = await processData(data, category);
  } catch (error) {
    logger.error(error);
  }
  return response;
};
