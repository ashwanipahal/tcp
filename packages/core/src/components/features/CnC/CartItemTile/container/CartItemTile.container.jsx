// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { getOrderDetails, removeCartItem } from './CartItemTile.actions';
import CartItemTile from '../views/CartItemTile.view';
import { getCartOrderList } from './CartItemTile.selectors';

// @flow

type Props = {
  getOrderDetails: void,
  removeCartItem: void,
  cartItems: any,
};

const CartItemTileContainer = ({ getOrderDetails, cartItems, removeCartItem }) => (
  <CartItemTile
    getOrderDetails={getOrderDetails}
    cartItems={cartItems}
    removeCartItem={removeCartItem}
  />
);
function mapDispatchToProps(dispatch) {
  return {
    getOrderDetails: () => {
      dispatch(getOrderDetails());
    },
    removeCartItem: orderItemId => {
      console.log(orderItemId);
      dispatch(removeCartItem(orderItemId));
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
