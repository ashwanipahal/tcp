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
        if (!subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum']) {
          subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'] = [];
        }
        subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'].push(
          subCategory
        );
        return subCategory;
      });

      return {
        categoryContent: listItem.categoryContent,
        subCategories,
        url: 'uniform-shop-girls-clothing-school-uniforms-tops',
        categoryId: '484507>484508',
      };
    });
  },
};

export default Abstractor;
