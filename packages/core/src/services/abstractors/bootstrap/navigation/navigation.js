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
          : `c?cid=${seoToken || catgroupId}`
      }`
    );
  },
  constructAsPathForUrl: ({ seoUrl, seoToken, catgroupId }) => {
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
  processSubCategoryName: (l1Name = '', subCatName = '') => {
    const indexOfPipe = subCatName.indexOf('|');
    let labelToPrint = subCatName;
    if (indexOfPipe !== -1) {
      const splittedSubCatName = subCatName.split('|');
      const smallCasel1Name = l1Name ? l1Name.toLowerCase() : '';
      const smallCaseSubCatName = splittedSubCatName[0] ? splittedSubCatName[0].toLowerCase() : '';
      if (smallCasel1Name === smallCaseSubCatName) {
        [, labelToPrint] = splittedSubCatName;
      } else {
        [labelToPrint] = splittedSubCatName;
      }
    }
    return labelToPrint;
  },
  processData: navLinkList => {
    return navLinkList.map(listItem => {
      const { categoryContent } = listItem;
      const l1CategoryName = categoryContent ? categoryContent.name : '';
      categoryContent.url = Abstractor.constructUrl(listItem.categoryContent);
      categoryContent.asPath = Abstractor.constructAsPathForUrl(listItem.categoryContent);

      const subCategories = {};
      const hasL2 = listItem.subCategories && listItem.subCategories.length;
      listItem.subCategories.map(subCategory => {
        const subCat = subCategory;
        console.log(subCategory);
        subCat.name = Abstractor.processSubCategoryName(
          l1CategoryName,
          subCategory.categoryContent.name
        );
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
        subCat.asPath = Abstractor.constructAsPathForUrl(subCategory.categoryContent);

        subCat.subCategories.map(subCategoryL3 => {
          const subCatL3 = subCategoryL3;
          subCatL3.url = Abstractor.constructUrl(subCategoryL3.categoryContent);
          subCatL3.categoryContent.url = Abstractor.constructUrl(subCategoryL3.categoryContent);
          subCatL3.categoryContent.categoryId = subCategoryL3.categoryContent.catgroupId;
          subCatL3.asPath = Abstractor.constructAsPathForUrl(subCategoryL3.categoryContent);
          return subCatL3;
        });
        subCategories[category].items.push(subCat);
        return subCategory;
      });

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
