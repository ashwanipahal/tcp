/* eslint-disable sonarjs/no-duplicate-string */
import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Navigation
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return Abstractor.processData(mock.data.navigation);
  },
  processData: navLinkList => {
    return navLinkList.map(listItem => {
      const subCategories = {};
      listItem.subCategories.map(subCategory => {
        const subCat = subCategory;
        const category = subCat.categoryContent.groupIdentifierName || 'Lorem Ipsum';
        if (!subCategories[category]) {
          subCategories[category] = [];
        }
        subCategories[category].push(subCat);
        return subCategory;
      });

      return {
        categoryContent: listItem.categoryContent,
        subCategories,
      };
    });
  },
};

export default Abstractor;
