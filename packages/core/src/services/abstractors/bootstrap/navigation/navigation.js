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
    return navLinkList.map(listItem => {
      const subCategories = {};
      listItem.subCategories.map(subCategory => {
        const subCat = subCategory;
        const category = subCat.categoryContent.groupIdentifierName || 'Lorem Ipsum';
        if (!subCategories[category]) {
          subCategories[category] = [];
        }
        subCat.url = Abstractor.constructUrl(subCategory.categoryContent);
        subCat.subCategories.map(L3 => {
          const L3Obj = L3;
          L3Obj.url = Abstractor.constructUrl(L3.categoryContent);
          return L3Obj;
        });
        subCategories[category].push(subCat);
        return subCategory;
      });

      return {
        categoryContent: listItem.categoryContent,
        subCategories,
        url: Abstractor.constructUrl(listItem.categoryContent),
        categoryId: listItem.categoryContent.catgroupId,
      };
    });
  },
};

export default Abstractor;
