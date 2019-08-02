import handler from '../../../handler';

/**
 * Responsible for content fetching using content ID
 */
export const DataAbstractor = {
  getData: async id => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'moduleX',
        data: { cid: id, type: 'moduleX' },
      })
      .then(response => (response ? response.data : {}));
  },
  processData: async data => {
    const result = {};
    const {
      name,
      composites: { richTextList },
    } = data.moduleX;
    result.name = name;
    result.richText = richTextList[0].text;
    return result;
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {String} cid - Content ID
 */
export const getModuleX = async cid => {
  const { getData, processData } = DataAbstractor;
  let response = {};

  try {
    const data = await getData(cid);
    response = await processData(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return response;
};
