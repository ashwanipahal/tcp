import React from 'react';
import { shallow } from 'enzyme';
import CartItem from '../organisms/CartItem';

describe('CartItem Component', () => {
  let component;
  const props = {
    deleteCartItem: jest.fn(),
    editableProductInfo: {},
    getProductSKUInfo: jest.fn(),
    handleSubmit: jest.fn(),
    item: {
      itemInfo: {
        itemid: '3001545564',
        itemPoints: 26,
        listPrice: 12.95,
        offerPrice: 12.95,
        quantity: 1,
        salePrice: 12.95,
        wasPrice: 12.95,
      },
      miscInfo: {},
      productInfo: {
        size: 'S (5/6)',
        color: {
          name: 'RENEW BLUE',
        },
        fit: 'regular',
        productPartNumber: '3001569_160',
      },
    },
  };

  const state = {
    isEdit: true,
  };

  beforeEach(() => {
    component = shallow(<CartItem {...props} {...state} />);
  });

  it('CartItem should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CartItem should render correctly', () => {
    component.find('.edit-cart').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
