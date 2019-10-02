// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import BAGPAGE_SELECTORS from '../../BagPage/container/BagPage.selectors';
import { removeCartItem, updateCartItem, getProductSKUInfo } from './CartItemTile.actions';
import CartItemTile from '../molecules/CartItemTile/views/CartItemTile.view';
import { getCartOrderList, getEditableProductInfo } from './CartItemTile.selectors';
import {
  getSaveForLaterSwitch,
  getSflMaxCount,
} from '../../SaveForLater/container/SaveForLater.selectors';
import { getPersonalDataState } from '../../../account/User/container/User.selectors';

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
  isShowSaveForLater: any,
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
  isShowSaveForLater,
  sflMaxCount,
  isGenricGuest,
  addItemToSflList,
  setCartItemsSflError,
  sflItemsCount,
  isBagPageSflSection,
  startSflItemDelete,
  startSflDataMoveToBag,
  currencySymbol,
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
    isShowSaveForLater={isShowSaveForLater}
    sflMaxCount={sflMaxCount}
    isGenricGuest={isGenricGuest}
    addItemToSflList={addItemToSflList}
    setCartItemsSflError={setCartItemsSflError}
    sflItemsCount={sflItemsCount}
    isBagPageSflSection={isBagPageSflSection}
    startSflItemDelete={startSflItemDelete}
    startSflDataMoveToBag={startSflDataMoveToBag}
    currencySymbol={currencySymbol}
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
    addItemToSflList: payload => {
      dispatch(BAG_PAGE_ACTIONS.addItemToSflList(payload));
    },
    setCartItemsSflError: payload => {
      dispatch(BAG_PAGE_ACTIONS.setCartItemsSflError(payload));
    },
    startSflItemDelete: payload => {
      dispatch(BAG_PAGE_ACTIONS.startSflItemDelete(payload));
    },
    startSflDataMoveToBag: payload => {
      dispatch(BAG_PAGE_ACTIONS.startSflDataMoveToBag(payload));
    },
  };
};

export function mapStateToProps(state) {
  return {
    editableProductInfo: getEditableProductInfo(state),
    isShowSaveForLater: getSaveForLaterSwitch(state),
    sflMaxCount: parseInt(getSflMaxCount(state)),
    isGenricGuest: getPersonalDataState(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state) || '$',
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
