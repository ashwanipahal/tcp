import React from 'react';
import { shallow } from 'enzyme';

import { ProductCustomizeFormPartContainerVanilla } from '../container/ProductCustomizeFormPart.container';

describe('ProductCustomizeFormPartContainer component', () => {
  it('should renders correctly', () => {
    const defaultBadge = 'ONLINE EXCLUSIVE';
    const props = {
      quickViewLabels: {},
      className: '',
      currentColorEntry: {
        color: {
          name: 'SMOKEB10',
          imagePath:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2100606_1137.jpg',
          family: 'GRAY',
        },
        pdpUrl: '/p/2100606_1137',
        colorProductId: '1118006',
        colorDisplayId: '2100606_1137',

        imageName: '2100606_1137',
        favoritedCount: 991,
        maxAvailable: 5435,
        maxAvailableBoss: 0,
        hasFits: false,
        miscInfo: {
          isBopisEligible: false,
          isBossEligible: false,
          badge1: {
            matchBadge: false,
            defaultBadge,
          },
          badge2: '25% OFF',
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
                skuId: '1118990',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 218,
                variantId: '00191755242934',
                variantNo: '2100606001',
                position: 0,
              },
              {
                sizeName: 'S (5/6)',
                skuId: '1119730',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 1065,
                variantId: '00191755242941',
                variantNo: '2100606002',
                position: 1,
              },
              {
                sizeName: 'M (7/8)',
                skuId: '1118372',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 1730,
                variantId: '00191755242958',
                variantNo: '2100606003',
                position: 2,
              },
              {
                sizeName: 'L (10/12)',
                skuId: '1118586',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 1417,
                variantId: '00191755242965',
                variantNo: '2100606004',
                position: 3,
              },
              {
                sizeName: 'XL (14)',
                skuId: '1118690',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 630,
                variantId: '00191755242972',
                variantNo: '2100606005',
                position: 4,
              },
              {
                sizeName: 'XXL (16)',
                skuId: '1118793',
                listPrice: 24.95,
                offerPrice: 18.71,
                maxAvailable: 375,
                variantId: '00191755242989',
                variantNo: '2100606006',
                position: 5,
              },
            ],
          },
        ],
        listPrice: 24.95,
        offerPrice: 18.71,
      },
      productInfo: {
        ratingsProductId: '2100606',
        generalProductId: '2100606_IV',
        categoryId: '47503>47539',
        name: 'Boys Uniform V Neck Sweater',
        pdpUrl: '/p/2100606_IV',
        shortDescription: 'School-approved style for your super cool dude!',
        longDescription:
          '<li>Made of 100% cotton in a sweater knit</li><li>Rib-knit V neck, sleeve cuffs and hem</li><li>Fully-fashioned sleeves for ease of movement</li><li>Pre-washed for added softness and to reduce shrinkage</li><li>Imported</li>',
        imagesByColor: {
          SMOKEB10: {
            basicImageUrl:
              'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_1137.jpg',
            extraImages: [
              {
                isOnModalImage: false,
                iconSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2100606_1137.jpg',
                listingSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2100606_1137.jpg',
                regularSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_1137.jpg',
                bigSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_1137.jpg',
                superSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_1137.jpg',
              },
              {
                isOnModalImage: false,
                iconSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2100606_1137-1.jpg',
                listingSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2100606_1137-1.jpg',
                regularSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_1137-1.jpg',
                bigSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_1137-1.jpg',
                superSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_1137-1.jpg',
              },
            ],
          },
          TIDAL: {
            basicImageUrl:
              'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_IV.jpg',
            extraImages: [
              {
                isOnModalImage: false,
                iconSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2100606_IV.jpg',
                listingSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2100606_IV.jpg',
                regularSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_IV.jpg',
                bigSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_IV.jpg',
                superSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_IV.jpg',
              },
              {
                isOnModalImage: false,
                iconSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2100606_IV-1.jpg',
                listingSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2100606_IV-1.jpg',
                regularSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2100606_IV-1.jpg',
                bigSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_IV-1.jpg',
                superSizeImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2100606_IV-1.jpg',
              },
            ],
          },
        },
        colorFitsSizesMap: [
          {
            color: {
              name: 'SMOKEB10',
              imagePath:
                'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2100606_1137.jpg',
              family: 'GRAY',
            },
            pdpUrl: '/p/2100606_1137',
            colorProductId: '1118006',
            colorDisplayId: '2100606_1137',
            categoryEntity: 'Boy:School Uniforms',
            imageName: '2100606_1137',
            favoritedCount: 991,
            maxAvailable: 5435,
            maxAvailableBoss: 0,
            hasFits: false,
            miscInfo: {
              isBopisEligible: false,
              isBossEligible: false,
              badge1: {
                matchBadge: false,
                defaultBadge,
              },
              badge2: '25% OFF',
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
                    skuId: '1118990',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 218,
                    variantId: '00191755242934',
                    variantNo: '2100606001',
                    position: 0,
                  },
                  {
                    sizeName: 'S (5/6)',
                    skuId: '1119730',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 1065,
                    variantId: '00191755242941',
                    variantNo: '2100606002',
                    position: 1,
                  },
                  {
                    sizeName: 'M (7/8)',
                    skuId: '1118372',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 1730,
                    variantId: '00191755242958',
                    variantNo: '2100606003',
                    position: 2,
                  },
                  {
                    sizeName: 'L (10/12)',
                    skuId: '1118586',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 1417,
                    variantId: '00191755242965',
                    variantNo: '2100606004',
                    position: 3,
                  },
                  {
                    sizeName: 'XL (14)',
                    skuId: '1118690',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 630,
                    variantId: '00191755242972',
                    variantNo: '2100606005',
                    position: 4,
                  },
                  {
                    sizeName: 'XXL (16)',
                    skuId: '1118793',
                    listPrice: 24.95,
                    offerPrice: 18.71,
                    maxAvailable: 375,
                    variantId: '00191755242989',
                    variantNo: '2100606006',
                    position: 5,
                  },
                ],
              },
            ],
            listPrice: 24.95,
            offerPrice: 18.71,
          },
        ],
        isGiftCard: false,
        colorFitSizeDisplayNames: null,
        listPrice: 24.95,
        offerPrice: 18.71,
        highListPrice: 0,
        highOfferPrice: 0,
        lowListPrice: 24.95,
        lowOfferPrice: 18.71,
        ratings: 0,
        reviewsCount: 0,
        unbxdProdId: '2100606_IV',
        alternateSizes: {},
        productId: '2100606_IV',
        promotionalMessage: '',
        promotionalPLCCMessage: '',
        long_product_title: 'Boys Uniform Long Sleeve V Neck Sweater',
        bundleProducts: [],
      },
      plpLabels: {},
      currency: '',
      priceCurrency: '',
      currencyExchange: '',
      isCanada: false,
      isHasPlcc: false,
      isInternationalShipping: false,
      colorFitsSizesMap: [
        {
          color: {
            name: 'TIDAL',
            imagePath:
              'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2100606_IV.jpg',
            family: 'BLUE',
          },
          pdpUrl: '/p/2100606_IV',
          colorProductId: '1118007',
          colorDisplayId: '2100606_IV',
          categoryEntity: 'Boy:School Uniforms',
          imageName: '2100606_IV',
          favoritedCount: 1529,
          maxAvailable: 10376,
          maxAvailableBoss: 0,
          hasFits: false,
          miscInfo: {
            isBopisEligible: false,
            isBossEligible: false,
            badge1: {
              matchBadge: false,
              defaultBadge,
            },
            badge2: '25% OFF',
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
                  skuId: '1118991',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 191,
                  variantId: '00191755242996',
                  variantNo: '2100606007',
                  position: 0,
                },
                {
                  sizeName: 'S (5/6)',
                  skuId: '1119731',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 2238,
                  variantId: '00191755243009',
                  variantNo: '2100606008',
                  position: 1,
                },
                {
                  sizeName: 'M (7/8)',
                  skuId: '1118373',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 3493,
                  variantId: '00191755243016',
                  variantNo: '2100606009',
                  position: 2,
                },
                {
                  sizeName: 'L (10/12)',
                  skuId: '1118587',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 2641,
                  variantId: '00191755243023',
                  variantNo: '2100606010',
                  position: 3,
                },
                {
                  sizeName: 'XL (14)',
                  skuId: '1118691',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 991,
                  variantId: '00191755243030',
                  variantNo: '2100606011',
                  position: 4,
                },
                {
                  sizeName: 'XXL (16)',
                  skuId: '1118794',
                  listPrice: 24.95,
                  offerPrice: 18.71,
                  maxAvailable: 822,
                  variantId: '00191755243047',
                  variantNo: '2100606012',
                  position: 5,
                },
              ],
            },
          ],
          listPrice: 24.95,
          offerPrice: 18.71,
        },
      ],
    };
    const component = shallow(<ProductCustomizeFormPartContainerVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
