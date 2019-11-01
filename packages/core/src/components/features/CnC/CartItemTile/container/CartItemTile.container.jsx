// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import {
  getIsBossEnabled,
  getIsBopisEnabled,
  getIsBossClearanceProductEnabled,
  getIsBopisClearanceProductEnabled,
  getIsRadialInventoryEnabled,
  getIsBossAppEnabled,
} from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { isMobileApp } from '@tcp/core/src/utils';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import BAGPAGE_SELECTORS from '../../BagPage/container/BagPage.selectors';
import {
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
  openPickupModalWithValuesFromBag,
  clearToggleCartItemError,
} from './CartItemTile.actions';
import CartItemTile from '../molecules/CartItemTile/views/CartItemTile.view';
import {
  getCartOrderList,
  getEditableProductInfo,
  getCartToggleError,
  getCurrencyExchange,
} from './CartItemTile.selectors';
import {
  getSaveForLaterSwitch,
  getSflMaxCount,
} from '../../SaveForLater/container/SaveForLater.selectors';
import { getPersonalDataState } from '../../../account/User/container/User.selectors';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import CONSTANTS from '../../Checkout/Checkout.constants';

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
  onQuickViewOpenClick,
  isBossEnabledTCP,
  isBossEnabledGYM,
  isBopisEnabledTCP,
  isBopisEnabledGYM,
  isBossClearanceProductEnabled,
  isBopisClearanceProductEnabled,
  isRadialInventoryEnabled,
  onPickUpOpenClick,
  orderId,
  setShipToHome,
  toggleError,
  clearToggleError,
  currencyExchange,
  pickupStoresInCart,
  navigation,
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
    onQuickViewOpenClick={onQuickViewOpenClick}
    isBossEnabledTCP={isBossEnabledTCP}
    isBossEnabledGYM={isBossEnabledGYM}
    isBopisEnabledTCP={isBopisEnabledTCP}
    isBopisEnabledGYM={isBopisEnabledGYM}
    isBossClearanceProductEnabled={isBossClearanceProductEnabled}
    isBopisClearanceProductEnabled={isBopisClearanceProductEnabled}
    isRadialInventoryEnabled={isRadialInventoryEnabled}
    onPickUpOpenClick={onPickUpOpenClick}
    orderId={orderId}
    setShipToHome={setShipToHome}
    toggleError={toggleError}
    clearToggleError={clearToggleError}
    currencyExchange={currencyExchange}
    pickupStoresInCart={pickupStoresInCart}
    navigation={navigation}
  />
);

const createSetShipToHomePayload = (orderItemId, orderItemType) => {
  return {
    apiPayload: {
      orderId: '.',
      orderItem: [
        {
          orderItemId,
        },
      ],
      x_storeLocId: '',
      x_orderitemtype: orderItemType,
      x_updatedItemType: CONSTANTS.ORDER_ITEM_TYPE.ECOM,
    },
    updateActionType: 'UpdatePickUpItem',
    fromToggling: true,
  };
};

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
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
    onPickUpOpenClick: payload => {
      dispatch(openPickupModalWithValuesFromBag(payload));
    },
    setShipToHome: (orderItemId, orderItemType) => {
      dispatch(updateCartItem(createSetShipToHomePayload(orderItemId, orderItemType)));
    },
    clearToggleError: () => {
      dispatch(clearToggleCartItemError());
    },
  };
};

export function mapStateToProps(state) {
  const isMobile = isMobileApp();
  const { isBossEnabledAppTCP, isBossEnabledAppGYM } = getIsBossAppEnabled(state);
  return {
    editableProductInfo: getEditableProductInfo(state),
    isShowSaveForLater: getSaveForLaterSwitch(state),
    sflMaxCount: parseInt(getSflMaxCount(state)),
    isGenricGuest: getPersonalDataState(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state) || '$',
    isBossEnabledTCP: isMobile
      ? isBossEnabledAppTCP
      : getIsBossEnabled(state, CARTPAGE_CONSTANTS.BRANDS.TCP),
    isBossEnabledGYM: isMobile
      ? isBossEnabledAppGYM
      : getIsBossEnabled(state, CARTPAGE_CONSTANTS.BRANDS.GYM),
    isBopisEnabledTCP: getIsBopisEnabled(state, CARTPAGE_CONSTANTS.BRANDS.TCP),
    isBopisEnabledGYM: getIsBopisEnabled(state, CARTPAGE_CONSTANTS.BRANDS.GYM),
    isBossClearanceProductEnabled: getIsBossClearanceProductEnabled(state),
    isBopisClearanceProductEnabled: getIsBopisClearanceProductEnabled(state),
    isRadialInventoryEnabled: getIsRadialInventoryEnabled(state),
    orderId: BAGPAGE_SELECTORS.getCurrentOrderId(state) || '',
    toggleError: getCartToggleError(state),
    orderId: BAGPAGE_SELECTORS.getCurrentOrderId(state),
    currencyExchange: getCurrencyExchange(state),
    pickupStoresInCart: BAGPAGE_SELECTORS.getCartStores(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
