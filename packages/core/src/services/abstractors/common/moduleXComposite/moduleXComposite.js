import handler from '../../../handler';

/**
 * Responsible for content fetching using content ID
 */
export const ModuleXCompositeDataAbstractor = {
  processData: async modulexData => {
    const result = {};
    const { data } = modulexData;
    const responseKeys = Object.keys(data);
    responseKeys.map(item => {
      result[item] = data[item].composites.richTextList[0].text;
      return result[item];
    });
    return result;
  },

  getData: async ids => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'moduleXComposite',
        data: {
          cids: ids,
          type: 'moduleX',
        },
      })
      .then(response => response);
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {Array} cids - Content ID
 */
export const getModuleX = async cids => {
  const { getData, processData } = ModuleXCompositeDataAbstractor;
  let response = {};

  try {
    const modulexResponse = await getData(cids);
    response = await processData(modulexResponse);
  } catch (error) {
    response = error;
  }
  return response;
};
