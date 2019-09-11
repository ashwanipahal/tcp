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
  isEditAllowed: any,
  toggleEditAllowance: any,
  isPlcc: any,
};

export const CartItemTileContainer = ({
  labels,
  productDetail,
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
  editableProductInfo,
  pageView,
  className,
  isEditAllowed,
  toggleEditAllowance,
  inheritedStyles,
  isPlcc,
  itemIndex,
  openedTile,
  setSelectedProductTile,
  setSwipedElement,
  swipedElement,
}) => (
  <CartItemTile
    labels={labels}
    productDetail={productDetail}
    removeCartItem={removeCartItem}
    updateCartItem={updateCartItem}
    getProductSKUInfo={getProductSKUInfo}
    editableProductInfo={editableProductInfo}
    pageView={pageView}
    className={className}
    toggleEditAllowance={toggleEditAllowance}
    isEditAllowed={isEditAllowed}
    inheritedStyles={inheritedStyles}
    isPlcc={isPlcc}
    itemIndex={itemIndex}
    openedTile={openedTile}
    setSelectedProductTile={setSelectedProductTile}
    setSwipedElement={setSwipedElement}
    swipedElement={swipedElement}
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
    getProductSKUInfo: payload => {
      dispatch(getProductSKUInfo(payload));
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
