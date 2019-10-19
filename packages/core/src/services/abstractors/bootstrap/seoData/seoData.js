import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for SEO data
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => {
        return response.data.seoData;
      })
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => {
    const result = {};
    data.forEach(({ path, ...rest }) => {
      const seoDataKey = path.split('/')[1];
      result[seoDataKey] = { ...rest };
    });
    return result;
  },
};
export default Abstractor;
