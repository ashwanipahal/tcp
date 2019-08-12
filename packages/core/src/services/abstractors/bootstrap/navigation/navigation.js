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
    // eslint-disable-next-line
    return navLinkList.map(listItem => {
      const subCategories = {};
      listItem.subCategories.map(subCategory => {
        if (!subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum']) {
          subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'] = [];
        }
        // eslint-disable-next-line
        subCategory.url =
          subCategory.categoryContent.seoUrl ||
          `/us/${
            subCategory.categoryContent.seoToken.startsWith('content-')
              ? subCategory.categoryContent.seoToken.replace(
                  new RegExp('content-', 'g'),
                  'content/'
                )
              : // eslint-disable-next-line
                'c/' +
                (subCategory.categoryContent.seoToken || subCategory.categoryContent.catgroupId)
          }`;
        subCategories[subCategory.categoryContent.groupIdentifierName || 'Lorem Ipsum'].push(
          subCategory
        );
        subCategory.subCategories.map(L3 => {
          // eslint-disable-next-line
          L3.url =
            L3.categoryContent.seoUrl ||
            `/us/${
              L3.categoryContent.seoToken.startsWith('content-')
                ? L3.categoryContent.seoToken.replace(new RegExp('content-', 'g'), 'content/')
                : // eslint-disable-next-line
                  'c/' + (L3.categoryContent.seoToken || L3.categoryContent.catgroupId)
            }`;
          return L3;
        });
        return subCategory;
      });

      return {
        categoryContent: listItem.categoryContent,
        subCategories,
        url:
          listItem.categoryContent.seoUrl ||
          `/us/${
            listItem.categoryContent.seoToken &&
            listItem.categoryContent.seoToken.startsWith('content-')
              ? listItem.categoryContent.seoToken.replace(new RegExp('content-', 'g'), 'content/')
              : // eslint-disable-next-line
                'c/' + (listItem.categoryContent.seoToken || listItem.categoryContent.catgroupId)
          }`,
        categoryId: listItem.categoryContent.catgroupId,
      };
    });
  },
};

export default Abstractor;
