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

  it('renders correctly with bag page sfl section', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny',
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
    const component = shallow(<CartItemTile {...props} isBagPageSflSection />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemTile common should call handle removeSflItem', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans ',
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
      startSflItemDelete: jest.fn(),
      startSflDataMoveToBag: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().removeSflItem();
  });

  it('CartItemTile common should call handle moveToBagSflItem', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys  Jeans ',
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
      startSflItemDelete: jest.fn(),
      startSflDataMoveToBag: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().moveToBagSflItem();
  });

  it('CartItemTile common should call handle callEditMethod', () => {
    const props = {
      productDetail: {
        itemInfo: {
          isGiftItem: false,
          fit: 'regular',
          itemId: '123',
          itemUnitPrice: 23,
          price: 25,
          qty: 1,
          color: 'blue',
        },
        miscInfo: {
          badge: '',
          availability: 'UNAVAILABLE',
          orderItemType: 'BOPIS',
          store: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
        },
      },
      onPickUpOpenClick: jest.fn(),
      pageView: 'myBag',
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().callEditMethod();
  });
});
