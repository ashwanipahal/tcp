import React from 'react';
import { shallow } from 'enzyme';
import { ProductsGridItemVanilla } from '../views/ProductsGridItem';

describe('ProductsGridItem component', () => {
  it('should renders correctly', () => {
    const props = {
      currencyExchange: [
        {
          exchangevalue: 1,
        },
      ],
      isMobile: false,

      item: {
        productInfo: {},
        miscInfo: {},

        colorsMap: [
          {
            color: { name: '' },
            colorProductId: '',
            miscInfo: {},
          },
        ],
        imagesByColor: {},
        sqnNmbr: 123,
      },
      sqnNmbr: 123,
      isPLPredesign: false,
      siblingProperties: false,
      loadedProductCount: 12,
      onQuickViewOpenClick: jest.fn(),
      onPickUpOpenClick: jest.fn(),
      onQuickBopisOpenClick: jest.fn(),
      onAddItemToFavorites: jest.fn(),

      currencySymbol: '',
      className: '',

      isShowVideoOnPlp: false,
      isMatchingFamily: false,
      isKeepAliveKillSwitch: false,
      unbxdId: '',

      isCanada: false,
      isPlcc: false,

      isOnModelImgDisplay: true,
      isInternationalShipping: false,
    };
    const component = shallow(<ProductsGridItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
