import React from 'react';
import { shallow } from 'enzyme';

import { ProductAddToBagVanilla } from '../views/ProductAddToBag.view';

describe('ProductAddToBagVanilla should render correctly', () => {
  let wrapper;

  const props = {
    quickViewPickup: jest.fn(),
    currentProduct: {
      ratingsProductId: '2100622',
      generalProductId: '3000935_IV',
      name: 'Girl School Uniform',
      colorFitsSizesMap: [
        {
          color: {
            name: 'TIDAL',
            imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/3000935_IV.jpg',
            family: 'BLUE',
          },
          pdpUrl: '/us/p/3000935_IV',
          name: null,
          colorProductId: '1281598',
          colorDisplayId: '3000935_IV',
          categoryEntity: 'Girl:School Uniforms',
          imageName: '3000935_IV',
          favoritedCount: 0,
          maxAvailable: 42228,
          maxAvailableBoss: 0,
          hasFits: true,
          miscInfo: {
            isBopisEligible: false,
            isBossEligible: true,
            badge1: {
              defaultBadge: 'ONLINE EXCLUSIVE',
            },
            badge2: '',
            isClearance: '',
            hasOnModelAltImages: '',
            videoUrl: '',
            keepAlive: false,
          },
          fits: [
            {
              fitName: 'regular',
              isDefault: true,
              maxAvailable: 1.7976931348623157e308,
              sizes: [
                {
                  sizeName: 'XS (4)',
                  skuId: '1281998',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 739,
                  maxAvailableBoss: 0,
                  variantId: '00193511074322',
                  variantNo: '3000935007',
                  position: 0,
                },
                {
                  sizeName: 'S (5/6)',
                  skuId: '1282327',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 6771,
                  maxAvailableBoss: 0,
                  variantId: '00193511074339',
                  variantNo: '3000935008',
                  position: 1,
                },
                {
                  sizeName: 'M (7/8)',
                  skuId: '1281700',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 12920,
                  maxAvailableBoss: 0,
                  variantId: '00193511074346',
                  variantNo: '3000935009',
                  position: 2,
                },
                {
                  sizeName: 'L (10/12)',
                  skuId: '1281815',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 9331,
                  maxAvailableBoss: 0,
                  variantId: '00193511074353',
                  variantNo: '3000935010',
                  position: 3,
                },
                {
                  sizeName: 'XL (14)',
                  skuId: '1281870',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 4381,
                  maxAvailableBoss: 0,
                  variantId: '00193511074360',
                  variantNo: '3000935011',
                  position: 4,
                },
                {
                  sizeName: 'XXL (16)',
                  skuId: '1281922',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 3473,
                  maxAvailableBoss: 0,
                  variantId: '00193511074377',
                  variantNo: '3000935012',
                  position: 5,
                },
              ],
            },
            {
              fitName: 'plus',
              isDefault: false,
              maxAvailable: 1.7976931348623157e308,
              sizes: [
                {
                  sizeName: 'L(10P-12P)',
                  skuId: '1225288',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 1037,
                  maxAvailableBoss: 0,
                  variantId: '00193511079488',
                  variantNo: '3000936026',
                  position: 0,
                },
                {
                  sizeName: 'XL(14P)',
                  skuId: '1225289',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 1231,
                  maxAvailableBoss: 0,
                  variantId: '00193511079495',
                  variantNo: '3000936027',
                  position: 1,
                },
                {
                  sizeName: 'XXL (16P)',
                  skuId: '1225287',
                  listPrice: 12.95,
                  offerPrice: 12.95,
                  maxAvailable: 2345,
                  maxAvailableBoss: 0,
                  variantId: '00193511079471',
                  variantNo: '3000936025',
                  position: 2,
                },
              ],
            },
          ],
          listPrice: 12.95,
          offerPrice: 12.95,
          unbxdId: null,
        },
      ],
    },
    plpLabels: {
      addToBag: '',
      errorMessage: '',
      size: '',
      fit: '',
      color: '',
    },
    className: '',
    selectedColor: {
      name: 'WHITE',
    },
    selectedFit: null,
    isErrorMessageDisplayed: false,
    fitChanged: true,
    selectedSize: '',
    quantityList: 1,
    selectColor: jest.fn(),
    selectFit: jest.fn(),
    selectSize: jest.fn(),
    initialValues: {},
    displayErrorMessage: false,
    sizeList: [
      {
        displayName: 'XS (4)',
        id: 'XS (4)',
        maxAvailable: 739,
      },
    ],
    fitList: [],
    colorList: [
      {
        color: {
          name: 'TIDAL',
          imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/3000935_IV.jpg',
          family: 'BLUE',
        },
        pdpUrl: '/us/p/3000935_IV',
        name: null,
        colorProductId: '1281598',
        colorDisplayId: '3000935_IV',
        categoryEntity: 'Girl:School Uniforms',
        imageName: '3000935_IV',
        favoritedCount: 0,
        maxAvailable: 42228,
        maxAvailableBoss: 0,
        hasFits: true,
        miscInfo: {
          isBopisEligible: false,
          isBossEligible: true,
          badge1: {
            defaultBadge: 'ONLINE EXCLUSIVE',
          },
          badge2: '',
          isClearance: '',
          hasOnModelAltImages: '',
          videoUrl: '',
          keepAlive: false,
        },
        fits: [
          {
            fitName: 'regular',
            isDefault: true,
            maxAvailable: 1.7976931348623157e308,
            sizes: [
              {
                sizeName: 'XS (4)',
                skuId: '1281998',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 739,
                maxAvailableBoss: 0,
                variantId: '00193511074322',
                variantNo: '3000935007',
                position: 0,
              },
              {
                sizeName: 'S (5/6)',
                skuId: '1282327',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 6771,
                maxAvailableBoss: 0,
                variantId: '00193511074339',
                variantNo: '3000935008',
                position: 1,
              },
              {
                sizeName: 'M (7/8)',
                skuId: '1281700',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 12920,
                maxAvailableBoss: 0,
                variantId: '00193511074346',
                variantNo: '3000935009',
                position: 2,
              },
              {
                sizeName: 'L (10/12)',
                skuId: '1281815',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 9331,
                maxAvailableBoss: 0,
                variantId: '00193511074353',
                variantNo: '3000935010',
                position: 3,
              },
              {
                sizeName: 'XL (14)',
                skuId: '1281870',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 4381,
                maxAvailableBoss: 0,
                variantId: '00193511074360',
                variantNo: '3000935011',
                position: 4,
              },
              {
                sizeName: 'XXL (16)',
                skuId: '1281922',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 3473,
                maxAvailableBoss: 0,
                variantId: '00193511074377',
                variantNo: '3000935012',
                position: 5,
              },
            ],
          },
          {
            fitName: 'plus',
            isDefault: false,
            maxAvailable: 1.7976931348623157e308,
            sizes: [
              {
                sizeName: 'L(10P-12P)',
                skuId: '1225288',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 1037,
                maxAvailableBoss: 0,
                variantId: '00193511079488',
                variantNo: '3000936026',
                position: 0,
              },
              {
                sizeName: 'XL(14P)',
                skuId: '1225289',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 1231,
                maxAvailableBoss: 0,
                variantId: '00193511079495',
                variantNo: '3000936027',
                position: 1,
              },
              {
                sizeName: 'XXL (16P)',
                skuId: '1225287',
                listPrice: 12.95,
                offerPrice: 12.95,
                maxAvailable: 2345,
                maxAvailableBoss: 0,
                variantId: '00193511079471',
                variantNo: '3000936025',
                position: 2,
              },
            ],
          },
        ],
        listPrice: 12.95,
        offerPrice: 12.95,
        unbxdId: null,
      },
    ],
  };

  const props1 = {
    ...props,
    isErrorMessageDisplayed: true,
  };

  beforeEach(() => {
    wrapper = shallow(<ProductAddToBagVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with error messages', () => {
    wrapper = shallow(<ProductAddToBagVanilla {...props1} />);
    expect(wrapper).toMatchSnapshot();
  });
});
