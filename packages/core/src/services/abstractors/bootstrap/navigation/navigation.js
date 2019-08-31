import mock from './mock';
import { UNIDENTIFIED_GROUP } from './constants';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Navigation
 */
const Abstractor = {
  /**
   * This function generate URL for the link
   * @param {*} seoUrl This parameter takes the highest priority
   * @param {*} seoToken This parameter is appended to form url in format "/c/{seoToken}" and takes 2nd priority
   * @param {*} catgroupId This parameter is appended to form url in format "/c/{catgroupId}" and takes last priority
   */
  constructUrl: ({ seoUrl, seoToken, catgroupId }) => {
    return (
      seoUrl ||
      `/${
        seoToken.startsWith('content-')
          ? seoToken.replace(new RegExp('content-', 'g'), 'content/')
          : `c/${seoToken || catgroupId}`
      }` ||
      ''
    );
  },
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => {
        return response.data.navigation;
      })
      .then(Abstractor.processData);
  },
  getMock: () => {
    return Abstractor.processData(mock.data.navigation);
  },
  processData: navLinkList => {
    return navLinkList.map(listItem => {
      const subCategories = {};
      const hasL2 = listItem.subCategories && listItem.subCategories.length;
      listItem.subCategories.map(subCategory => {
        const subCat = subCategory;
        const category = subCat.categoryContent.groupIdentifierName || UNIDENTIFIED_GROUP;
        const order = subCat.categoryContent.groupIdentifierSequence || 0;
        const label = subCat.categoryContent.groupIdentifierName || '';

        if (!subCategories[category]) {
          subCategories[category] = {
            label,
            order,
            items: [],
          };
        }
        subCat.hasL3 = subCategory.subCategories && subCategory.subCategories.length;
        subCat.url = Abstractor.constructUrl(subCategory.categoryContent);
        subCat.url = Abstractor.constructUrl(subCategory.categoryContent);
        subCat.categoryContent.categoryId = subCategory.categoryContent.catgroupId;
        subCat.subCategories.map(subCategoryL3 => {
          const subCatL3 = subCategoryL3;
          subCatL3.url = Abstractor.constructUrl(subCategoryL3.categoryContent);
          subCatL3.categoryContent.url = Abstractor.constructUrl(subCategoryL3.categoryContent);
          subCatL3.categoryContent.categoryId = subCategoryL3.categoryContent.catgroupId;
          return subCatL3;
        });
        subCategories[category].items.push(subCat);
        return subCategory;
      });

      const { categoryContent } = listItem;

      return {
        categoryContent,
        subCategories,
        hasL2,
        url: Abstractor.constructUrl(listItem.categoryContent),
        categoryId: listItem.categoryContent.catgroupId,
      };
    });
  },
};

export default Abstractor;
