import React from 'react';
import { shallow } from 'enzyme';
import { ProductListingMobileFiltersFormVanilla } from '../views/ProductListingMobileFilterForm.view';

describe('ProductListingFiltersForm is shown', () => {
  const props = {
    filtersMaps: {
        categoryPath2_uFilter: [
          {
            displayName: 'Essentials Shop',
            id: 'Essentials Shop',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Baby Girl',
            id: 'Baby Girl',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Bottoms',
            id: 'Bottoms',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Tops',
            id: 'Tops',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Shoes & Accessories',
            id: 'Shoes & Accessories',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Leggings',
            id: 'Leggings',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Polos',
            id: 'Polos',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Socks, Tights & Underwear',
            id: 'Socks, Tights & Underwear',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Online Only',
            id: 'Online Only',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Baby Boy',
            id: 'Baby Boy',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Socks & Underwear',
            id: 'Socks & Underwear',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Unisex',
            id: 'Unisex',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Active',
            id: 'Active',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Skorts & Shorts',
            id: 'Skorts & Shorts',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Jeggings & Chinos',
            id: 'Jeggings & Chinos',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Shoes',
            id: 'Shoes',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Dresses & Jumpers',
            id: 'Dresses & Jumpers',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Dresses',
            id: 'Dresses',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Shorts',
            id: 'Shorts',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Activewear',
            id: 'Activewear',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'All Easter Dress Up',
            id: 'All Easter Dress Up',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Easter Dress Up',
            id: 'Easter Dress Up',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Sibling Shop',
            id: 'Sibling Shop',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Big & Lil Sister',
            id: 'Big & Lil Sister',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Big & Little Sister',
            id: 'Big & Little Sister',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Flower Girl Shop',
            id: 'Flower Girl Shop',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Jackets',
            id: 'Jackets',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Matching Family Collections',
            id: 'Matching Family Collections',
            facetName: 'categoryPath2_uFilter'
          },
          {
            displayName: 'Accessories',
            id: 'Accessories',
            facetName: 'categoryPath2_uFilter'
          }
        ],
        TCPColor_uFilter: [
          {
            displayName: 'BLUE',
            id: 'BLUE',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/BLUE.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'WHITE',
            id: 'WHITE',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/WHITE.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'BLACK',
            id: 'BLACK',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/BLACK.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'GRAY',
            id: 'GRAY',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/GRAY.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'PINK',
            id: 'PINK',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/PINK.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'TAN',
            id: 'TAN',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/TAN.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'RED',
            id: 'RED',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/RED.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'MULTI',
            id: 'MULTI',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/MULTI.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'DENIM',
            id: 'DENIM',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/DENIM.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'GREEN',
            id: 'GREEN',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/GREEN.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'PURPLE',
            id: 'PURPLE',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/PURPLE.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'YELLOW',
            id: 'YELLOW',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/YELLOW.gif',
            facetName: 'TCPColor_uFilter'
          },
          {
            displayName: 'BROWN',
            id: 'BROWN',
            imagePath: 'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/BROWN.gif',
            facetName: 'TCPColor_uFilter'
          }
        ],
        v_tcpsize_uFilter: [
          {
            displayName: '6-9 M',
            id: 'EF_6-9 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '6-12 M',
            id: 'EG_6-12 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '9-12 M',
            id: 'EJ_9-12 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '12-18 M',
            id: 'EM_12-18 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '12-24 M',
            id: 'EN_12-24 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '18-24 M',
            id: 'EP_18-24 M',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '2T',
            id: 'ET_2T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '2T - 3T',
            id: 'EV_2T - 3T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '3T',
            id: 'EX_3T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '3T-4T',
            id: 'EY_3T-4T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '4T',
            id: 'EZ_4T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: '5T',
            id: 'FB_5T',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 4',
            id: 'IW_TODDLER 4',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 5',
            id: 'IZ_TODDLER 5',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 6',
            id: 'JC_TODDLER 6',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 7',
            id: 'JF_TODDLER 7',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 8',
            id: 'JI_TODDLER 8',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 9',
            id: 'JL_TODDLER 9',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 10',
            id: 'JO_TODDLER 10',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'TODDLER 11',
            id: 'JR_TODDLER 11',
            facetName: 'v_tcpsize_uFilter'
          },
          {
            displayName: 'ONE SIZE',
            id: 'LA_ONE SIZE',
            facetName: 'v_tcpsize_uFilter'
          }
        ],
        unbxd_price_range_uFilter: [
          {
            displayName: '$10 and Under',
            id: '$10 and Under',
            facetName: 'unbxd_price_range_uFilter'
          },
          {
            displayName: '$10 - $19.99',
            id: '$10 - $19.99',
            facetName: 'unbxd_price_range_uFilter'
          }
        ],
        v_tcpfit_unbxd_uFilter: [
          {
            displayName: 'Regular',
            id: 'Regular',
            facetName: 'v_tcpfit_unbxd_uFilter'
          }
        ],
        gender_uFilter: [
          {
            displayName: 'Girl',
            id: 'Girl',
            facetName: 'gender_uFilter'
          },
          {
            displayName: 'Unisex',
            id: 'Unisex',
            facetName: 'gender_uFilter'
          }
        ],
        age_group_uFilter: [
          {
            displayName: 'Big Kid (4 - 18)',
            id: 'AB_Big Kid (4 - 18)',
            facetName: 'age_group_uFilter'
          },
          {
            displayName: 'Toddler (6M - 5T)',
            id: 'AC_Toddler (6M - 5T)',
            facetName: 'age_group_uFilter'
          },
          {
            displayName: 'Baby (0 - 18M)',
            id: 'AD_Baby (0 - 18M)',
            facetName: 'age_group_uFilter'
          }
        ],
        unbxdDisplayName: {
          categoryPath2_uFilter: 'Category',
          TCPColor_uFilter: 'Color',
          v_tcpsize_uFilter: 'Size',
          unbxd_price_range_uFilter: 'Price',
          v_tcpfit_unbxd_uFilter: 'Fit',
          gender_uFilter: 'Gender',
          age_group_uFilter: 'Size Range'
        },
        l1category: 'Toddler Girl'
      },
    labels: {},
    initialValues: {},
    className: ''
  };
  it('should render ProductListingFiltersForm', () => {
    const component = shallow(<ProductListingMobileFiltersFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
