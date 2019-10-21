import React from 'react';
import { shallow } from 'enzyme';
import CartItemTile from '../views/CartItemTile.view.native';

describe('CartItemTile common component', () => {
  it('renders correctly', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
          color: 'red',
        },
        productInfo: { skuId: '123', productPartNumber: 123 },
        miscInfo: {
          badge: '',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
      onQuickViewOpenClick: jest.fn(),
    };
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with Save for later enabled', () => {
    const props = {
      productDetail: {
        productInfo: { skuId: '123' },
        itemInfo: {
          name: 'Boys Basic',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
        },
        miscInfo: {
          badge: '',
          availability: 'OK',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };
    const component = shallow(<CartItemTile {...props} isShowSaveForLater />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with bag page sfl section', () => {
    const props = {
      productDetail: {
        productInfo: { skuId: '123' },
        itemInfo: {
          name: 'Boys Basic Skinny Jeans',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
        },
        miscInfo: {
          badge: '',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };
    const component = shallow(<CartItemTile {...props} isBagPageSflSection />);
    expect(component).toMatchSnapshot();
  });
});
