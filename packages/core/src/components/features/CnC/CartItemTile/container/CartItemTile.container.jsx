// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import {
  getOrderDetails,
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
} from './CartItemTile.actions';
import CartItemTile from '../views/CartItemTile.view';
import { getCartOrderList, getEditableProductInfo } from './CartItemTile.selectors';

// @flow

type Props = {
  getOrderDetails: void,
  removeCartItem: void,
  cartItems: any,
  updateCartItem: any,
  getProductSKUInfo: any,
  editableProductInfo: any,
};

const CartItemTileContainer = ({
  getOrderDetails,
  cartItems,
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
  editableProductInfo,
}) => (
  <CartItemTile
    getOrderDetails={getOrderDetails}
    cartItems={cartItems}
    removeCartItem={removeCartItem}
    updateCartItem={updateCartItem}
    getProductSKUInfo={getProductSKUInfo}
    editableProductInfo={editableProductInfo}
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
    getProductSKUInfo: productNumber => {
      dispatch(getProductSKUInfo(productNumber));
    },
  };
}

function mapStateToProps(state) {
  return {
    cartItems: getCartOrderList(state),
    editableProductInfo: getEditableProductInfo(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
