import React from 'react';
import { shallow } from 'enzyme';
import CartItemTile, { CartItemTileVanilla } from '../views/CartItemTile.view';

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
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('CartItemTile common should call handle getBossBopisDetailsForMiniBag', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans pant',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
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
    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().getBossBopisDetailsForMiniBag(props.productDetail);
  });
  it('CartItemTile common should call handle handleMoveItemtoSaveList', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans shirt',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemId: '123',
        },
        miscInfo: {
          badge: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
        },
      },
      addItemToSflList: jest.fn(),
      setCartItemsSflError: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().handleMoveItemtoSaveList();
  });
});
