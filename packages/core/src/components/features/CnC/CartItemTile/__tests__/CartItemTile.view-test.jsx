import React from 'react';
import { shallow } from 'enzyme';
import CartItemTile from '../views/CartItemTile.view';

describe('CartItemTile Component', () => {
  let component;
  const Props = {
    getOrderDetails: jest.fn(),
    removeCartItem: jest.fn(),
    cartItems: [],
    updateCartItem: jest.fn(),
    getProductSKUInfo: jest.fn(),
    editableProductInfo: {},
  };

  beforeEach(() => {
    component = shallow(<CartItemTile {...Props} />);
  });

  it('CartItemTile should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CartItemTile should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
