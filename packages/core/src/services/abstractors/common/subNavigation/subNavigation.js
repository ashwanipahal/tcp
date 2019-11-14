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
        name: 'helpCenterLeftNavigation',
        data: { category, brand, country, channel, type: 'helpCenterLeftNavigation' },
      })
      .then(response => (response ? response.data : {}));
  },

  processData: async data => {
    if(Object.keys(data).length) {
      const subNavigation = data.subNavigation.map(item => {
        if(Object.keys(item.leafLink).length) {
          item.leafLink.id = item.leafLink.text.split(" ").join("-");
          item.leafLink.component = item.leafLink.text.split(" ").join("-");
          item.leafLink.displayName = item.leafLink.text;
          return item;
        }
      });
      return subNavigation;
    }
    return [];
  },
};

export const getNavigationData = async (
  category = 'Help Centre Left Navigation',
  brand = 'TCP',
  country = 'USA',
  channel = 'Desktop'
) => {
  const { getData, processData } = DataAbstractor;
  let response = {};

  try {
    const data = await getData(category, brand, country, channel);
    response = await processData(data);
  } catch (error) {
    logger.error(error);
  }
  return response;
};
