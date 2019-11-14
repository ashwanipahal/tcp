import logger from '@tcp/core/src/utils/loggerInstance';
import handler from '../../../handler';

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
    // debugger;
    // const subNavigationData = data.map(navItem => {
    //   if(navItem.leafLink) {
    //     navItem.leafLink.id = navItem.leafLink.text.replace(" ", "-");
    //     navItem.leafLink.displayName = navItem.leafLink.text;
    //     return navItem;
    //   }
    // });
    return data;
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
