import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getIsBossEnabled,
  getIsBopisEnabled,
  getIsBossClearanceProductEnabled,
  getIsBopisClearanceProductEnabled,
  getIsRadialInventoryEnabled,
  getIsBossAppEnabled,
} from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { getIsMiniBagOpen } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { isMobileApp } from '@tcp/core/src/utils';
import { setClickAnalyticsData } from '@tcp/core/src/analytics/actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import BAGPAGE_SELECTORS from '../../BagPage/container/BagPage.selectors';
import {
  removeCartItem,
  updateCartItem,
  getProductSKUInfo,
  openPickupModalWithValuesFromBag,
  clearToggleCartItemError,
  clearToggleBossBopisCartItemError,
} from './CartItemTile.actions';
import CartItemTile from '../molecules/CartItemTile/views/CartItemTile.view';
import {
  getEditableProductInfo,
  getCartToggleError,
  getCartBossBopisToggleError,
} from './CartItemTile.selectors';
import {
  getSaveForLaterSwitch,
  getSflMaxCount,
} from '../../SaveForLater/container/SaveForLater.selectors';
import { getPersonalDataState } from '../../../account/User/container/User.selectors';
import {
  openQuickViewWithValues,
  updateAppTypeWithParams,
} from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import CONSTANTS from '../../Checkout/Checkout.constants';
import { getCurrencyAttributes } from '../../../browse/ProductDetail/container/ProductDetail.selectors';

/* eslint-disable no-shadow */
export const CartItemTileContainer = ({
  labels,
  productDetail,
  removeCartItem,
  updateCartItem,
  isMiniBagOpen,
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
  toggleBossBopisError,
  clearToggleError,
  currencyExchange,
  pickupStoresInCart,
  autoSwitchPickupItemInCart,
  navigation,
  updateAppTypeHandler,
  disableProductRedirect,
  setClickAnalyticsData,
  closeMiniBag,
}) => (
  <CartItemTile
    labels={labels}
    productDetail={productDetail}
    removeCartItem={removeCartItem}
    updateCartItem={updateCartItem}
    isMiniBagOpen={isMiniBagOpen}
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
    toggleBossBopisError={toggleBossBopisError}
    clearToggleError={clearToggleError}
    currencyExchange={currencyExchange}
    pickupStoresInCart={pickupStoresInCart}
    autoSwitchPickupItemInCart={autoSwitchPickupItemInCart}
    navigation={navigation}
    updateAppTypeHandler={updateAppTypeHandler}
    disableProductRedirect={disableProductRedirect}
    setClickAnalyticsData={setClickAnalyticsData}
    closeMiniBag={closeMiniBag}
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

const createBossBopisTogglePayload = ({
  itemId,
  quantity,
  skuId,
  itemPartNumber,
  variantNo,
  orderItemType,
  targetOrderType,
  orderId,
  store,
  storeId,
}) => {
  return {
    apiPayload: {
      orderId: `${orderId}`,
      orderItem: [
        {
          orderItemId: itemId,
          xitem_catEntryId: skuId,
          quantity: `${quantity}`,
          variantNo,
          itemPartNumber,
        },
      ],
      x_storeLocId: storeId,
      x_orderitemtype: !store ? CONSTANTS.ORDER_ITEM_TYPE.ECOM : orderItemType, // source type of Item
      x_updatedItemType: targetOrderType, // target type of Item
    },
    updateActionType: 'UpdatePickUpItem',
    fromTogglingBossBopis: true,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getOrderDetails: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
    },
    removeCartItem: orderItemId => {
      dispatch(removeCartItem(orderItemId));
    },
    updateCartItem: (itemId, skuId, quantity, itemPartNumber, variantNo, isMiniBagOpen) => {
      dispatch(
        updateCartItem({ itemId, skuId, quantity, itemPartNumber, variantNo, isMiniBagOpen })
      );
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
    autoSwitchPickupItemInCart: payload => {
      dispatch(updateCartItem(createBossBopisTogglePayload(payload)));
    },
    clearToggleError: () => {
      dispatch(clearToggleCartItemError());
      dispatch(clearToggleBossBopisCartItemError());
    },
    updateAppTypeHandler: payload => {
      dispatch(updateAppTypeWithParams(payload));
    },
    setClickAnalyticsData: payload => {
      dispatch(setClickAnalyticsData(payload));
    },
  };
};

export function mapStateToProps(state) {
  const isMobile = isMobileApp();
  const { isBossEnabledAppTCP, isBossEnabledAppGYM } = getIsBossAppEnabled(state);
  return {
    editableProductInfo: getEditableProductInfo(state),
    isShowSaveForLater: getSaveForLaterSwitch(state),
    sflMaxCount: parseInt(getSflMaxCount(state), 10),
    isGenricGuest: getPersonalDataState(state),
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
    toggleBossBopisError: getCartBossBopisToggleError(state),
    currencyExchange: [getCurrencyAttributes(state)],
    pickupStoresInCart: BAGPAGE_SELECTORS.getCartStores(state),
    isMiniBagOpen: getIsMiniBagOpen(state),
  };
}

CartItemTileContainer.propTypes = {
  productDetail: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  getProductSKUInfo: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  editableProductInfo: PropTypes.shape({}).isRequired,
  removeCartItem: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isPlcc: PropTypes.string.isRequired,
  pageView: PropTypes.string,
  toggleEditAllowance: PropTypes.func.isRequired,
  isEditAllowed: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
  isGenricGuest: PropTypes.shape({}).isRequired,
  sflItemsCount: PropTypes.number,
  sflMaxCount: PropTypes.number.isRequired,
  addItemToSflList: PropTypes.func.isRequired,
  setCartItemsSflError: PropTypes.func.isRequired,
  isBagPageSflSection: PropTypes.bool,
  startSflItemDelete: PropTypes.func.isRequired,
  startSflDataMoveToBag: PropTypes.func.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  setShipToHome: PropTypes.func.isRequired,
  toggleError: PropTypes.shape({}),
  toggleBossBopisError: PropTypes.shape({
    errorMessage: PropTypes.string,
  }),
  clearToggleError: PropTypes.func.isRequired,
  currencyExchange: PropTypes.shape([]),
  pickupStoresInCart: PropTypes.shape({}).isRequired,
  autoSwitchPickupItemInCart: PropTypes.func.isRequired,
  disableProductRedirect: PropTypes.bool,
  setClickAnalyticsData: PropTypes.func.isRequired,
  closeMiniBag: PropTypes.func,
  inheritedStyles: PropTypes.string,
  itemIndex: PropTypes.number,
  openedTile: PropTypes.number,
  setSelectedProductTile: PropTypes.func.isRequired,
  swipedElement: PropTypes.shape({}).isRequired,
  updateAppTypeHandler: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  setSwipedElement: PropTypes.func,
  isBopisClearanceProductEnabled: PropTypes.bool.isRequired,
  isBossClearanceProductEnabled: PropTypes.bool.isRequired,
  isBossEnabledTCP: PropTypes.bool.isRequired,
  isBossEnabledGYM: PropTypes.bool.isRequired,
  isBopisEnabledTCP: PropTypes.bool.isRequired,
  isBopisEnabledGYM: PropTypes.bool.isRequired,
  isRadialInventoryEnabled: PropTypes.bool.isRequired,
  isMiniBagOpen: PropTypes.bool.isRequired,
};

CartItemTileContainer.defaultProps = {
  inheritedStyles: '',
  itemIndex: 0,
  openedTile: 0,
  setSwipedElement: () => {},
  closeMiniBag: () => {},
  navigation: {},
  pageView: '',
  isEditAllowed: true,
  sflItemsCount: 0,
  isBagPageSflSection: false,
  toggleError: null,
  toggleBossBopisError: null,
  currencyExchange: null,
  disableProductRedirect: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileContainer);
