import React from 'react';
import { shallow } from 'enzyme';
import { CartItemTileContainer, mapDispatchToProps } from '../container/CartItemTile.container';
import CartItemTile from '../views/CartItemTile.view';

describe('CartItemTile Container', () => {
  const cartItems = {};
  const editableProductInfo = {};
  it('should render CartItemTile view section', () => {
    const tree = shallow(
      <CartItemTileContainer
        getOrderDetails={jest.fn()}
        removeCartItem={jest.fn()}
        cartItems={cartItems}
        updateCartItem={jest.fn()}
        getProductSKUInfo={jest.fn()}
        editableProductInfo={editableProductInfo}
      />
    );
    expect(tree.is(CartItemTile)).toBeTruthy();
  });
  const mapDispatchToPropsConstant = '#mapDispatchToProps';
  describe(mapDispatchToPropsConstant, () => {
    it('should return an action getOrderDetails which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getOrderDetails();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
  describe(mapDispatchToPropsConstant, () => {
    it('should return an action removeCartItem which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.removeCartItem();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
  describe(mapDispatchToPropsConstant, () => {
    it('should return an action updateCartItem which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.updateCartItem();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
  describe(mapDispatchToPropsConstant, () => {
    it('should return an action getProductSKUInfo which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getProductSKUInfo();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
