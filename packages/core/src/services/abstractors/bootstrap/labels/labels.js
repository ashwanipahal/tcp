import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Labels related components
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => {
    const result = {};
    data.map(labelData => {
      const { name: category, subcategories } = labelData;
      result[category] = {};
      subcategories.map(({ name: subcategory, labels, referred }) => {
        result[category][subcategory] = {};
        result[category][subcategory].referred = referred;
        labels.map(({ key, value }) => {
          result[category][subcategory][key] = value;
          return value;
        });
        return subcategory;
      });
      return labelData;
    });

    return result;
  },
};
export default Abstractor;
