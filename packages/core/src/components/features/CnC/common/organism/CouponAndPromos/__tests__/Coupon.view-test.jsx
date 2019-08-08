import React from 'react';
import { shallow } from 'enzyme';
import CouponView from '../views/Coupon.view';

describe('CartItemTile Component', () => {
  let component;
  const Props = {
    getOrderDetails: jest.fn(),
    removeCartItem: jest.fn(),
    cartItems: [
      {
        productInfo: {
          generalProductId: '1234080',
          productPartNumber: '3001569_1301',
          skuId: '1234475',
          itemPartNumber: '00193511087773',
          variantNo: '3001569004',
          name: 'Girls Uniform Short Sleeve Ruffle Pique Polo',
          imagePath: '/wcsstore/GlobalSAS/images/tcp/products/500/3001569_1301.jpg',
          upc: '00193511087773',
          size: 'L (10/12)',
          pdpUrl: '/us/p/Girls-Uniform-Short-Sleeve-Ruffle-Pique-Polo-3001569-1301',
        },
        itemInfo: {
          quantity: 3,
          itemId: '3001545564',
          itemPoints: 78,
          listPrice: 38.85,
          offerPrice: 38.85,
          wasPrice: 12.95,
          salePrice: 12.95,
        },
        miscInfo: {
          clearanceItem: false,
          isOnlineOnly: false,
          isBopisEligible: true,
          isBossEligible: true,
          badge: '',
          store: null,
          storeId: null,
          storeAddress: null,
          storePhoneNumber: null,
          storeTodayOpenRange: null,
          storeTomorrowOpenRange: null,
          availability: 'OK',
          vendorColorDisplayId: '3001569_1301',
          bossStartDate: null,
          bossEndDate: null,
          storeItemsCount: 0,
          orderItemType: 'ECOM',
        },
      },
    ],
    updateCartItem: jest.fn(),
    getProductSKUInfo: jest.fn(),
    editableProductInfo: {},
  };

  beforeEach(() => {
    component = shallow(<CouponView {...Props} />);
  });

  it('CartItemTile should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CartItemTile should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
