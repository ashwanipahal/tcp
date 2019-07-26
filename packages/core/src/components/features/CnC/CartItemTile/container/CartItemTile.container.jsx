// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { getOrderDetails, removeCartItem, updateCartItem } from './CartItemTile.actions';
import CartItemTile from '../views/CartItemTile.view';
import { getCartOrderList } from './CartItemTile.selectors';

// @flow

type Props = {
  getOrderDetails: void,
  removeCartItem: void,
  cartItems: any,
  updateCartItem: any,
};

const CartItemTileContainer = ({ getOrderDetails, cartItems, removeCartItem, updateCartItem }) => (
  <CartItemTile
    getOrderDetails={getOrderDetails}
    cartItems={cartItems}
    removeCartItem={removeCartItem}
    updateCartItem={updateCartItem}
  />
);
function mapDispatchToProps(dispatch) {
  return {
    getOrderDetails: () => {
      dispatch(getOrderDetails());
    },
    removeCartItem: orderItemId => {
      dispatch(removeCartItem(orderItemId));
    },
    updateCartItem: (itemId, skuId, quantity, itemPartNumber, variantNo) => {
      dispatch(updateCartItem({ itemId, skuId, quantity, itemPartNumber, variantNo }));
    },
  };
}

function mapStateToProps(state) {
  return {
    cartItems: getCartOrderList(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
