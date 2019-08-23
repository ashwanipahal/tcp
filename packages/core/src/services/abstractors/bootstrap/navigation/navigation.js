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
        subCat.url = Abstractor.constructUrl(subCategory.categoryContent);
        subCategories[category].items.push(subCat);
        return subCategory;
      });

      const { categoryContent } = listItem;

      categoryContent.url = Abstractor.constructUrl(listItem.categoryContent);

      return {
        categoryContent,
        subCategories,
        url: Abstractor.constructUrl(listItem.categoryContent),
        categoryId: listItem.categoryContent.catgroupId,
      };
    });
  },
};

export default Abstractor;
