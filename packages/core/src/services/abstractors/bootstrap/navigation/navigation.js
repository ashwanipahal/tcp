/* eslint-disable sonarjs/no-duplicate-string */
import mock from './mock';
import handler from '../../../handler';
import utils from '../../../../utils';

/**
 * Abstractor layer for loading data from API for Navigation
 */
const Abstractor = {
  constructUrl: contentObj => {
    return (
      contentObj.seoUrl ||
      `/${utils.getSiteId()}/${
        contentObj.seoToken && contentObj.seoToken.startsWith('content-')
          ? contentObj.seoToken.replace(new RegExp('content-', 'g'), 'content/')
          : // eslint-disable-next-line
            'c/' + (contentObj.seoToken || contentObj.catgroupId)
      }`
    );
  },
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
    // eslint-disable-next-line
    return navLinkList.map(listItem => {
      const subCategories = {};
      listItem.subCategories.map(subCategory => {
        if (!subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum']) {
          subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'] = [];
        }
        // eslint-disable-next-line
        subCategory.url = Abstractor.constructUrl(subCategory.categoryContent);
        subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'].push(
          subCategory
        );
        subCategory.subCategories.map(L3 => {
          // eslint-disable-next-line
          L3.url = Abstractor.constructUrl(L3.categoryContent);
          return L3;
        });
        return subCategory;
      });

      return {
        categoryContent: listItem.categoryContent,
        subCategories,
        // eslint-disable-next-line
        url: Abstractor.constructUrl(listItem.categoryContent),
        categoryId: listItem.categoryContent.catgroupId,
      };
    });
  },
};

export default Abstractor;
