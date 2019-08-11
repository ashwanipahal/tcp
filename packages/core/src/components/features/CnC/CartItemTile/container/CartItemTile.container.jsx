// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { removeCartItem, updateCartItem, getProductSKUInfo } from './CartItemTile.actions';
import CartItemTile from '../molecules/CartItemTile/views/CartItemTile.view';
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

export const CartItemTileContainer = ({
  labels,
  productDetail,
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
  editableProductInfo,
}) => (
  <CartItemTile
    labels={labels}
    productDetail={productDetail}
    removeCartItem={removeCartItem}
    updateCartItem={updateCartItem}
    getProductSKUInfo={getProductSKUInfo}
    editableProductInfo={editableProductInfo}
  />
);
export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getOrderDetails: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
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
};

export function mapStateToProps(state) {
  return {
    editableProductInfo: getEditableProductInfo(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
