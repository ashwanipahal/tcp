import handler from '../../../handler';

/**
 * Responsible for content fetching using content ID
 */
export const DataAbstractor = {
  getData: async ids => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'moduleXComposite',
        data: { cids: ids, type: 'moduleX' },
      })
      .then(response => response);
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {Array} cids - Content ID
 */
export const getModuleX = async cids => {
  const { getData } = DataAbstractor;
  let response = {};

  try {
    response = await getData(cids);
  } catch (error) {
    response = error;
  }
  return response;
};
