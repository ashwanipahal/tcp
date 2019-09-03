import ProductListing from '../productListing';
import formattedData from './formattedData';

jest.mock('../../../handler/handler');

describe('product Listing', () => {
  it('should get the PLP products', () => {
    const productListingInstance = new ProductListing();
    return productListingInstance
      .getProducts({
        seoKeywordOrCategoryIdOrSearchTerm: '',
        isSearch: false,
        filtersAndSort: {},
        pageNumber: 0,
        getImgPath: () => {
          return {
            colorSwatch: [],
            productImages: [],
          };
        },
        categoryId: '223321',
        breadCrumbs: [],
        bucketingSeqConfig: {},
        getFacetSwatchImgPath: () => {},
        isUnbxdSequencing: {},
        excludeBadge: {},
        startProductCount: 20,
        numberOfProducts: 20,
        cacheFiltersAndCount: true,
        extraParams: {},
        shouldApplyUnbxdLogic: true,
        hasShortImage: true,
      })
      .then(res => {
        expect(res).toEqual(formattedData);
      });
  });
});
