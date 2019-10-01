import React from 'react';
import { shallow } from 'enzyme';
import { ProductSummaryVanilla } from '../views/ProductSummary.view.native';

describe('ProductSummaryVanilla', () => {
  let component;
  const props = {
    productData: {
      ratingsProductId: '2101089',
      generalProductId: '2101089_142',
      categoryId: '47511>49007',
      name: 'Girls Uniform Short Sleeve Button Front Belted Woven Shirt Dress',
      pdpUrl: '/p/2101089_142',
      shortDescription: "A cool style that's school approved!",
      longDescription:
        '<li>Made of 100% cotton twill</li><li>Pointed collar</li><li>Elasticized underarms and waist</li><li>Button front</li><li>Removable self-tie belt and belt loops</li><li>Designed in an above-the-knee length</li><li>Pre-washed for an extra-gentle feel and to reduce shrinkage</li><li>Imported</li>',
      imagesByColor: {
        SANDY: {
          basicImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2101089_142.jpg',
          extraImages: [
            {
              isOnModalImage: false,
              regularSizeImageUrl:
                'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2101089_142.jpg',
              bigSizeImageUrl:
                'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2101089_142.jpg',
            },
          ],
        },
        TIDAL: {
          basicImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2101089_IV.jpg',
          extraImages: [
            {
              isOnModalImage: false,
              regularSizeImageUrl:
                'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2101089_IV.jpg',
              bigSizeImageUrl:
                'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2101089_IV.jpg',
            },
          ],
        },
      },
      colorFitsSizesMap: [
        {
          color: {
            name: 'TIDAL',
            imagePath:
              'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2101089_IV.jpg',
            family: 'BLUE',
          },
          pdpUrl: '/p/2101089_IV',
          colorProductId: '1118066',
          colorDisplayId: '2101089_IV',
          categoryEntity: 'Girl:School Uniforms:Dresses & Jumpers',
          imageName: '2101089_IV',
          favoritedCount: 0,
          maxAvailable: 2282,
          maxAvailableBoss: 0,
          hasFits: false,
          miscInfo: {
            isBopisEligible: false,
            isBossEligible: false,
            badge1: {
              matchBadge: false,
              defaultBadge: 'ONLINE EXCLUSIVE',
            },
            keepAlive: false,
          },
          fits: [
            {
              fitNameVal: '',
              isDefault: true,
              maxAvailable: 1.7976931348623157e308,
              sizes: [
                {
                  sizeName: 'XS (4)',
                  skuId: '1119013',
                  listPrice: 24.95,
                  offerPrice: 24.95,
                  maxAvailable: 0,
                  variantId: '00191755273372',
                  variantNo: '2101089001',
                  position: 0,
                },
              ],
            },
          ],
          listPrice: 24.95,
          offerPrice: 24.95,
        },
        {
          color: {
            name: 'SANDY',
            imagePath:
              'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2101089_142.jpg',
            family: 'TAN',
          },
          pdpUrl: '/p/2101089_142',
          colorProductId: '1118065',
          colorDisplayId: '2101089_142',
          categoryEntity: 'Girl:School Uniforms:Dresses & Jumpers',
          imageName: '2101089_142',
          favoritedCount: 0,
          maxAvailable: 3664,
          maxAvailableBoss: 0,
          hasFits: false,
          miscInfo: {
            isBopisEligible: false,
            isBossEligible: false,
            badge1: {
              matchBadge: false,
              defaultBadge: 'ONLINE EXCLUSIVE',
            },
            keepAlive: false,
          },
          fits: [
            {
              fitNameVal: '',
              isDefault: true,
              maxAvailable: 1.7976931348623157e308,
              sizes: [
                {
                  sizeName: 'XS (4)',
                  skuId: '1119012',
                  listPrice: 24.95,
                  offerPrice: 24.95,
                  maxAvailable: 0,
                  variantId: '00191755273433',
                  variantNo: '2101089007',
                  position: 0,
                },
              ],
            },
          ],
          listPrice: 24.95,
          offerPrice: 24.95,
        },
      ],
      isGiftCard: false,
      colorFitSizeDisplayNames: null,
      listPrice: 24.95,
      offerPrice: 24.95,
      highListPrice: 0,
      highOfferPrice: 0,
      lowListPrice: 24.95,
      lowOfferPrice: 0,
      ratings: 4,
      reviewsCount: 2,
      unbxdProdId: '2101089_IV',
      alternateSizes: {},
      productId: '2101089_IV',
      promotionalMessage:
        "<span class='product-loyalty\u001apromotionText user-tier-theme'> EARN DOUBLE/TRIPLE POINTS </span> on all Uniform!",
      promotionalPLCCMessage:
        "<span class='product-loyalty\u001apromotionText user-tier-theme'> EARN TRIPLE POINTS </span> on all Uniform!",
      long_product_title: '',
      bundleProducts: [],
    },
    isPlcc: false,
    currencyExchange: [{ exchangevalue: 1 }],
    currencySymbol: '$',
    selectedColorProductId: '1118066',
  };

  beforeEach(() => {
    component = shallow(<ProductSummaryVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled view component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(4);
  });

  it('should return styled LineComp component value one', () => {
    expect(component.find('Styled(LineComp)')).toHaveLength(3);
  });

  it('should return styled BodyCopy component value one', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(6);
  });

  it('should return styled PromotionalMessage component value one', () => {
    expect(component.find('Styled(PromotionalMessage)')).toHaveLength(1);
  });

  it('should return styled Anchor component value one', () => {
    expect(component.find('Styled(Anchor)')).toHaveLength(1);
  });
});
