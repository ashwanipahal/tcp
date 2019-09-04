/* eslint-disable */
/* eslint-disable extra-rules/no-commented-out-code */
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
        filtersAndSort: {
          categoryPath2_uFilter: [
            {
              displayName: 'Baby Girl',
              id: 'Baby Girl',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Online Only',
              id: 'Online Only',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'New Arrivals',
              id: 'New Arrivals',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Essentials Shop',
              id: 'Essentials Shop',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'School Uniforms',
              id: 'School Uniforms',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Sets',
              id: 'Sets',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Active',
              id: 'Active',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Bottoms',
              id: 'Bottoms',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Leggings',
              id: 'Leggings',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Shop Now',
              id: 'Shop Now',
              facetName: 'categoryPath2_uFilter',
            },
          ],
          TCPColor_uFilter: [
            {
              displayName: 'WHITE',
              id: 'WHITE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'PINK',
              id: 'PINK',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'BLUE',
              id: 'BLUE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'BLACK',
              id: 'BLACK',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'RED',
              id: 'RED',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'GRAY',
              id: 'GRAY',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'MULTI',
              id: 'MULTI',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'ORANGE',
              id: 'ORANGE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'PURPLE',
              id: 'PURPLE',
              facetName: 'TCPColor_uFilter',
            },
          ],
          v_tcpsize_uFilter: [
            {
              displayName: '6-9 M',
              id: 'EF_6-9 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '9-12 M',
              id: 'EJ_9-12 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '12-18 M',
              id: 'EM_12-18 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '18-24 M',
              id: 'EP_18-24 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '2T',
              id: 'ET_2T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '3T',
              id: 'EX_3T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '4T',
              id: 'EZ_4T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '5T',
              id: 'FB_5T',
              facetName: 'v_tcpsize_uFilter',
            },
          ],
          unbxd_price_range_uFilter: [
            {
              displayName: '$10 and Under',
              id: '$10 and Under',
              facetName: 'unbxd_price_range_uFilter',
            },
            {
              displayName: '$10 - $19.99',
              id: '$10 - $19.99',
              facetName: 'unbxd_price_range_uFilter',
            },
            {
              displayName: '$20 - $29.99',
              id: '$20 - $29.99',
              facetName: 'unbxd_price_range_uFilter',
            },
          ],
          v_tcpfit_unbxd_uFilter: [],
          gender_uFilter: [],
          age_group_uFilter: [
            {
              displayName: 'Toddler (6M - 5T)',
              id: 'AC_Toddler (6M - 5T)',
              facetName: 'age_group_uFilter',
            },
            {
              displayName: 'Baby (0 - 18M)',
              id: 'AD_Baby (0 - 18M)',
              facetName: 'age_group_uFilter',
            },
          ],
          unbxdDisplayName: {
            categoryPath2_uFilter: 'Category',
            TCPColor_uFilter: 'Color',
            v_tcpsize_uFilter: 'Size',
            unbxd_price_range_uFilter: 'Price',
            v_tcpfit_unbxd_uFilter: 'Fit',
            gender_uFilter: 'Gender',
            age_group_uFilter: 'Size Range',
          },
          l1category: '',
        },
        pageNumber: 0,
        getImgPath: () => {
          return {
            colorSwatch: [],
            productImages: [],
          };
        },
        categoryId: '223321',
        breadCrumbs: [],
        bucketingSeqConfig: {
          bucketingSeq: true,
          requiredChildren: [],
        },
        getFacetSwatchImgPath: () => {},
        isUnbxdSequencing: undefined,
        excludeBadge: {},
        startProductCount: undefined,
        numberOfProducts: undefined,
        cacheFiltersAndCount: false,
        extraParams: {},
        shouldApplyUnbxdLogic: false,
        hasShortImage: false,
      })
      .then(res => {
        // console.log('res', res);
      });
  });
});

describe('product Listing', () => {
  it('should get the PLP products', () => {
    const productListingInstance = new ProductListing();
    return productListingInstance
      .getProducts({
        seoKeywordOrCategoryIdOrSearchTerm: '',
        isSearch: false,
        filtersAndSort: {
          categoryPath2_uFilter: [
            {
              displayName: 'Baby Girl',
              id: 'Baby Girl',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Online Only',
              id: 'Online Only',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'New Arrivals',
              id: 'New Arrivals',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Essentials Shop',
              id: 'Essentials Shop',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'School Uniforms',
              id: 'School Uniforms',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Sets',
              id: 'Sets',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Active',
              id: 'Active',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Bottoms',
              id: 'Bottoms',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Leggings',
              id: 'Leggings',
              facetName: 'categoryPath2_uFilter',
            },
            {
              displayName: 'Shop Now',
              id: 'Shop Now',
              facetName: 'categoryPath2_uFilter',
            },
          ],
          TCPColor_uFilter: [
            {
              displayName: 'WHITE',
              id: 'WHITE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'PINK',
              id: 'PINK',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'BLUE',
              id: 'BLUE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'BLACK',
              id: 'BLACK',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'RED',
              id: 'RED',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'GRAY',
              id: 'GRAY',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'MULTI',
              id: 'MULTI',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'ORANGE',
              id: 'ORANGE',
              facetName: 'TCPColor_uFilter',
            },
            {
              displayName: 'PURPLE',
              id: 'PURPLE',
              facetName: 'TCPColor_uFilter',
            },
          ],
          v_tcpsize_uFilter: [
            {
              displayName: '6-9 M',
              id: 'EF_6-9 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '9-12 M',
              id: 'EJ_9-12 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '12-18 M',
              id: 'EM_12-18 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '18-24 M',
              id: 'EP_18-24 M',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '2T',
              id: 'ET_2T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '3T',
              id: 'EX_3T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '4T',
              id: 'EZ_4T',
              facetName: 'v_tcpsize_uFilter',
            },
            {
              displayName: '5T',
              id: 'FB_5T',
              facetName: 'v_tcpsize_uFilter',
            },
          ],
          unbxd_price_range_uFilter: [
            {
              displayName: '$10 and Under',
              id: '$10 and Under',
              facetName: 'unbxd_price_range_uFilter',
            },
            {
              displayName: '$10 - $19.99',
              id: '$10 - $19.99',
              facetName: 'unbxd_price_range_uFilter',
            },
            {
              displayName: '$20 - $29.99',
              id: '$20 - $29.99',
              facetName: 'unbxd_price_range_uFilter',
            },
          ],
          v_tcpfit_unbxd_uFilter: [],
          gender_uFilter: [],
          age_group_uFilter: [
            {
              displayName: 'Toddler (6M - 5T)',
              id: 'AC_Toddler (6M - 5T)',
              facetName: 'age_group_uFilter',
            },
            {
              displayName: 'Baby (0 - 18M)',
              id: 'AD_Baby (0 - 18M)',
              facetName: 'age_group_uFilter',
            },
          ],
          unbxdDisplayName: {
            categoryPath2_uFilter: 'Category',
            TCPColor_uFilter: 'Color',
            v_tcpsize_uFilter: 'Size',
            unbxd_price_range_uFilter: 'Price',
            v_tcpfit_unbxd_uFilter: 'Fit',
            gender_uFilter: 'Gender',
            age_group_uFilter: 'Size Range',
          },
          l1category: '',
        },
        pageNumber: 0,
        getImgPath: () => {
          return {
            colorSwatch: [],
            productImages: [
              {
                500: 'abcd.jpg',
              },
            ],
          };
        },
        categoryId: '223321',
        breadCrumbs: [],
        bucketingSeqConfig: {
          bucketingRequired: true,
          bucketingSeq: true,
          requiredChildren: [],
        },
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
        // console.log('res', res);
        // expect(res).toEqual(formattedData);
      });
  });
});
