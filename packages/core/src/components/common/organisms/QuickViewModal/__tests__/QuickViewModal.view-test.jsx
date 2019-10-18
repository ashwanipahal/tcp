import React from 'react';
import { shallow } from 'enzyme';

import { QuickViewModalVanilla } from '../views/QuickViewModal.view';

describe('QuickViewModal component', () => {
  it('should renders correctly', () => {
    const props = {
      quickViewLabels: {},
      closeQuickViewModal: jest.fn(),
      isModalOpen: false,
      addToBagMultipleItemError: {},
      productInfo: [
        {
          breadCrumbs: [
            {
              displayName: 'Toddler Girl',
              urlPathSuffix: 'c?cid=toddler-girl-clothes',
              categoryId: '47502',
            },
            {
              displayName: 'Denim',
              urlPathSuffix: 'c?cid=toddler-girl-jeans',
              categoryId: '489054',
            },
          ],
          rawBreadCrumb: '47502>489054>489096',
          product: {
            ratingsProductId: '2044098',
            generalProductId: '2044098_757',
            categoryId: '47502>489054',
            name: 'Toddler Girls Basic Skinny Jeans - Black Wash',
            pdpUrl: '/p/2044098_757',
            shortDescription: "Here's the skinny on a super comfy pair she'll love to wear!",
            longDescription:
              '<li>Made of 73% cotton/26% polyester/1% spandex denim in our Black wash</li><li>Pull-on style with elasticized back waist</li><li>Snap closure with zipper fly</li><li>Five-pocket styling with a fitted thigh and knee; slim leg opening</li><li>Inner adjustable waist tabs for a custom fit</li><li>Pre-washed for an extra-gentle feel and to reduce shrinkage</li><li>Tagless label</li><li>Note: details may vary from image</li><li>Imported</li>',
            imagesByColor: {
              'BLACK WASH': {
                basicImageUrl:
                  'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2044098_757.jpg',
                extraImages: [
                  {
                    isOnModalImage: false,
                    iconSizeImageUrl:
                      'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2044098_757.jpg',
                    listingSizeImageUrl:
                      'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2044098_757.jpg',
                    regularSizeImageUrl:
                      'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2044098_757.jpg',
                    bigSizeImageUrl:
                      'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2044098_757.jpg',
                    superSizeImageUrl:
                      'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2044098_757.jpg',
                  },
                ],
              },
            },
            colorFitsSizesMap: [
              {
                color: {
                  name: 'BLACK WASH',
                  imagePath:
                    'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/2044098_757.jpg',
                  family: 'DENIM',
                },
                pdpUrl: '/p/2044098_757',
                colorProductId: '585900',
                colorDisplayId: '2044098_757',
                categoryEntity: 'Toddler Girl:Denim',
                imageName: '2044098_757',
                favoritedCount: 32,
                maxAvailable: 1603,
                maxAvailableBoss: 3366,
                hasFits: false,
                miscInfo: {
                  isBopisEligible: false,
                  isBossEligible: false,
                  badge1: {
                    matchBadge: false,
                    defaultBadge: '',
                  },
                  keepAlive: false,
                },
                fits: [
                  {
                    fitName: '',
                    isDefault: true,
                    maxAvailable: 1.7976931348623157e308,
                    sizes: [
                      {
                        sizeName: '6-9 M',
                        skuId: '747962',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 5,
                        maxAvailableBoss: 519,
                        variantId: '00889705031386',
                        variantNo: '2044098001',
                        position: 0,
                      },
                      {
                        sizeName: '9-12 M',
                        skuId: '749797',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 2,
                        maxAvailableBoss: 391,
                        variantId: '00889705031393',
                        variantNo: '2044098008',
                        position: 1,
                      },
                      {
                        sizeName: '12-18 M',
                        skuId: '751458',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 14,
                        maxAvailableBoss: 351,
                        variantId: '00889705031409',
                        variantNo: '2044098007',
                        position: 2,
                      },
                      {
                        sizeName: '18-24 M',
                        skuId: '756362',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 1436,
                        maxAvailableBoss: 1436,
                        variantId: '00889705031416',
                        variantNo: '2044098002',
                        position: 3,
                      },
                      {
                        sizeName: '2T',
                        skuId: '758616',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 27,
                        maxAvailableBoss: 168,
                        variantId: '00889705027723',
                        variantNo: '2044098005',
                        position: 4,
                      },
                      {
                        sizeName: '3T',
                        skuId: '761057',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 40,
                        maxAvailableBoss: 139,
                        variantId: '00889705027730',
                        variantNo: '2044098003',
                        position: 5,
                      },
                      {
                        sizeName: '4T',
                        skuId: '763482',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 50,
                        maxAvailableBoss: 263,
                        variantId: '00889705027747',
                        variantNo: '2044098004',
                        position: 6,
                      },
                      {
                        sizeName: '5T',
                        skuId: '765861',
                        listPrice: 16.5,
                        offerPrice: 16.5,
                        maxAvailable: 29,
                        maxAvailableBoss: 99,
                        variantId: '00889705027754',
                        variantNo: '2044098006',
                        position: 7,
                      },
                    ],
                  },
                ],
                listPrice: 16.5,
                offerPrice: 16.5,
              },
            ],
            isGiftCard: false,
            colorFitSizeDisplayNames: null,
            listPrice: 16.5,
            offerPrice: 16.5,
            highListPrice: 0,
            highOfferPrice: 0,
            lowListPrice: 16.5,
            lowOfferPrice: 0,
            ratings: 0,
            reviewsCount: 0,
            unbxdProdId: '2044098_757',
            alternateSizes: {
              'Big Kid Sizes': 'Boys-Basic-Loose-Jeans---Rinse-Wash-2044069-RQ',
              'Adult Womens Sizes': 'Girls-Denim-Jeggings-2082137-BM',
            },
            productId: '2044098_757',
            promotionalMessage:
              "<span class='product-loyalty\u001apromotionText user-tier-theme'> EARN DOUBLE/TRIPLE POINTS </span> on all Denim!",
            promotionalPLCCMessage:
              "<span class='product-loyalty\u001apromotionText user-tier-theme'> EARN TRIPLE POINTS </span> on all Denim!",
            long_product_title: '',
            bundleProducts: [],
          },
        },
      ],
      plpLabels: {},
      currency: '',
      priceCurrency: '',
      currencyExchange: '',
      isCanada: false,
      isHasPlcc: false,
      isInternationalShipping: false,
    };
    const component = shallow(<QuickViewModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
