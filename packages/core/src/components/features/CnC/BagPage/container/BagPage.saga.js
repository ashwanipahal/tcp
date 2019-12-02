/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import {
  setLoaderState,
  setSectionLoaderState,
} from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import CONSTANTS, { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import {
  getOrderDetailsData,
  getCartData,
  getUnqualifiedItems,
  removeItem,
  getProductInfoForTranslationData,
  startPaypalCheckoutAPI,
  paypalAuthorizationAPI,
  getServerErrorMessage,
} from '../../../../../services/abstractors/CnC';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import {
  checkoutSetCartData,
  getSetIsPaypalPaymentSettings,
  getSetCheckoutStage,
  toggleCheckoutRouting,
} from '../../Checkout/container/Checkout.action';
import BAG_SELECTORS from './BagPage.selectors';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import {
  getUserLoggedInState,
  getPersonalDataState,
} from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import checkoutSelectors, {
  isRemembered,
  isExpressCheckout,
} from '../../Checkout/container/Checkout.selector';
import { isMobileApp, isCanada, routerPush } from '../../../../../utils';

import {
  addItemToSflList,
  getSflItems,
  updateSflItem,
} from '../../../../../services/abstractors/CnC/SaveForLater';
import { removeCartItem } from '../../CartItemTile/container/CartItemTile.actions';
import { imageGenerator } from '../../../../../services/abstractors/CnC/CartItemTile';
import { getUserInfo } from '../../../account/User/container/User.actions';
import {
  getIsInternationalShipping,
  getIsRadialInventoryEnabled,
  getRecalcOrderPointsInterval,
  getCurrentSiteLanguage,
} from '../../../../../reduxStore/selectors/session.selectors';
import {
  closeMiniBag,
  updateCartManually,
} from '../../../../common/organisms/Header/container/Header.actions';
import getBopisInventoryDetails from '../../../../../services/abstractors/common/bopisInventory/bopisInventory';
import { filterBopisProducts, updateBopisInventory } from '../../CartItemTile/utils/utils';
import { getUserInfoSaga } from '../../../account/User/container/User.saga';
// eslint-disable-next-line
import {
  handleServerSideErrorAPI,
  getRouteToCheckoutStage,
} from '../../Checkout/container/Checkout.saga.util';
import startSflItemDelete, { routeForAppCartCheckout } from './BagPage.saga.util';
import { addToCartEcom } from '../../AddedToBag/container/AddedToBag.saga';

const { getOrderPointsRecalcFlag } = utility;

export const filterProductsBrand = (arr, searchedValue) => {
  const obj = [];
  const filterArray = arr.filter(value => {
    return value.productInfo.itemBrand === searchedValue;
  });
  filterArray.forEach(item => {
    obj.push(item.productInfo.productPartNumber);
  });
  return obj;
};

const getProductsTypes = orderItems => {
  let tcpProducts = [];
  let gymProducts = [];
  if (orderItems) {
    tcpProducts = filterProductsBrand(orderItems, 'TCP');
    gymProducts = filterProductsBrand(orderItems, 'GYM');
  }
  return { tcpProducts, gymProducts };
};

export function* getTranslatedProductInfo(cartInfo) {
  let tcpProductsResults;
  let gymProductsResults;
  try {
    const productypes = getProductsTypes(
      (cartInfo.orderDetails && cartInfo.orderDetails.orderItems) || cartInfo
    );
    const gymProdpartNumberList = productypes.gymProducts;
    const tcpProdpartNumberList = productypes.tcpProducts;
    if (tcpProdpartNumberList.length) {
      tcpProductsResults = yield call(
        getProductInfoForTranslationData,
        tcpProdpartNumberList.join(),
        'TCP'
      );
    }
    if (gymProdpartNumberList.length) {
      gymProductsResults = yield call(
        getProductInfoForTranslationData,
        gymProdpartNumberList.join(),
        'GYM'
      );
    }
    gymProductsResults = (gymProductsResults && gymProductsResults.body.response.products) || [];
    tcpProductsResults = (tcpProductsResults && tcpProductsResults.body.response.products) || [];

    return [...gymProductsResults, ...tcpProductsResults];
  } catch (err) {
    console.log('err', err);
    return [];
  }
}

function createMatchObject(res, translatedProductInfo) {
  res.forEach(orderItemInfo => {
    const orderItem = orderItemInfo;
    translatedProductInfo.forEach(item => {
      if (orderItem.productInfo.productPartNumber === item.prodpartno) {
        orderItem.productInfo.name = item.product_name;
        orderItem.productInfo.color.name = item.TCPColor;
      }
    });
  });
}

function* shouldTranslate(translation) {
  const currentLanguage = yield select(getCurrentSiteLanguage);
  const allowLanguageTranslation = currentLanguage !== 'en';
  return translation && allowLanguageTranslation;
}

export function* getOrderDetailSaga(payload) {
  const { payload: { after } = {} } = payload;
  try {
    yield put(updateCartManually(true));
    yield put(BAG_PAGE_ACTIONS.setBagPageLoading());
    const res = yield call(getOrderDetailsData);
    if (yield call(shouldTranslate, true)) {
      const translatedProductInfo = yield call(getTranslatedProductInfo, res);
      if (!translatedProductInfo.error) {
        createMatchObject(res.orderDetails.orderItems, translatedProductInfo);
      }
    }
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
    yield put(toggleCheckoutRouting(true));
    if (after) {
      yield call(after);
    }
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

function* updateBopisItems(res, isCartPage) {
  const bopisItems = filterBopisProducts(res.orderDetails.orderItems);
  if (bopisItems.length && isCartPage) {
    const bopisInventoryResponse = yield call(getBopisInventoryDetails, bopisItems);
    res.orderDetails = {
      ...res.orderDetails,
      orderItems: updateBopisInventory(res.orderDetails.orderItems, bopisInventoryResponse),
    };
  }
}

export function* getCartDataSaga(payload = {}) {
  try {
    // yield put(setLoaderState(false));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    const { payload: { isRecalculateTaxes, isCheckoutFlow, isCartPage } = {} } = payload;
    const { payload: { onCartRes, recalcRewards, translation = false } = {} } = payload;
    const { payload: { isCartNotRequired, updateSmsInfo, excludeCartItems = true } = {} } = payload;
    const recalcOrderPointsInterval = yield select(getRecalcOrderPointsInterval);
    const recalcOrderPoints = getOrderPointsRecalcFlag(recalcRewards, recalcOrderPointsInterval);
    const isRadialInvEnabled = yield select(getIsRadialInventoryEnabled);
    const cartProps = { excludeCartItems, recalcRewards: recalcOrderPoints, isRadialInvEnabled };
    yield put(BAG_PAGE_ACTIONS.setBagPageLoading());
    const res = yield call(getCartData, {
      calcsEnabled: isCartPage || isRecalculateTaxes,
      ...cartProps,
    });
    if (yield call(shouldTranslate, translation)) {
      const translatedProductInfo = yield call(getTranslatedProductInfo, res);
      if (!translatedProductInfo.error) {
        createMatchObject(res.orderDetails.orderItems, translatedProductInfo);
      }
    }

    yield updateBopisItems(res, isCartPage);
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails, excludeCartItems));

    if (res.orderDetails.orderItems.length > 0) {
      const personalData = yield select(getPersonalDataState);
      if (!personalData || !personalData.get('userId')) {
        yield put(getUserInfo());
      }
    }
    if (isCheckoutFlow) {
      yield put(checkoutSetCartData({ res, isCartNotRequired, updateSmsInfo }));
    } else {
      yield put(toggleCheckoutRouting(true));
    }
    yield put(BAG_PAGE_ACTIONS.setCouponsData(res.coupons));
    if (onCartRes) {
      yield call(onCartRes, res);
    }
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

export function* fetchModuleX({ payload = [] }) {
  try {
    let result = yield all(payload.map(uuid => call(getModuleX, uuid)));
    result = result.map((val, index) => ({ ...val, name: payload[index] }));
    yield put(BAG_PAGE_ACTIONS.setModuleX(result));
  } catch (err) {
    yield null;
  }
}

function* navigateToCheckout(stage, navigation, navigationActions, isPayPalFlow = false) {
  yield put(getSetCheckoutStage(stage));
  const navigateAction = navigationActions.navigate({
    routeName: CONSTANTS.CHECKOUT_ROOT,
    params: {
      isPayPalFlow,
    },
  });
  navigation.dispatch(navigateAction);
}

/**
 * routeForCartCheckout component. This is responsible for routing our web to specific page of checkout journey.
 * @param {Boolean} recalc query parameter for recalculation of points
 * @param {Object} navigation for navigating in mobile app
 * @param {Boolean} closeModal for closing addedtoBag modal in app
 */
export function* routeForCartCheckout(recalc, navigation, closeModal, navigationActions) {
  yield call(getUserInfoSaga);
  const { hasVenmoReviewPageRedirect, getIsOrderHasPickup } = checkoutSelectors;
  const orderHasPickup = yield select(getIsOrderHasPickup);
  const IsInternationalShipping = yield select(getIsInternationalShipping);
  const isExpressCheckoutEnabled = yield select(isExpressCheckout);
  const hasVenmoReviewPage = yield select(hasVenmoReviewPageRedirect);
  if (isMobileApp()) {
    yield call(
      routeForAppCartCheckout,
      recalc,
      navigation,
      closeModal,
      navigationActions,
      orderHasPickup
    );
  } else if (!IsInternationalShipping) {
    yield put(closeMiniBag());
    yield call(
      getRouteToCheckoutStage,
      { recalc },
      hasVenmoReviewPage || isExpressCheckoutEnabled,
      true
    );
  } else {
    utility.routeToPage(CHECKOUT_ROUTES.internationalCheckout);
  }
}

export function* checkoutCart(recalc, navigation, closeModal, navigationActions) {
  const isVenmoPaymentInProgress = yield select(checkoutSelectors.isVenmoPaymentInProgress);
  const isLoggedIn = yield select(getUserLoggedInState);
  if (!isLoggedIn && !isVenmoPaymentInProgress) {
    yield put(setSectionLoaderState({ addedToBagLoaderState: false, section: 'addedtobag' }));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    yield put(setLoaderState(false));
    return yield put(setCheckoutModalMountedState({ state: true }));
  }
  return yield call(routeForCartCheckout, recalc, navigation, closeModal, navigationActions);
}

function* confirmStartCheckout() {
  // this.store.dispatch(setVenmoData({ error: null })); // Clear Venmo error message
  // if (cartStoreView.getIsEditingSomeItem(state)) {
  //   // editing an item, display warning modal
  //   confirmationsResult = confirmationsResult.then(() =>
  //     generalOperator.openConfirmationModal(CONFIRM_MODAL_IDS.EDITING, null, null)
  //   );
  // }

  const [OOSCount, unavailableCount] = yield all(
    [BAG_SELECTORS.getOOSCount, BAG_SELECTORS.getUnavailableCount].map(val => select(val))
  );
  if (OOSCount > 0 || unavailableCount > 0) {
    yield put(setSectionLoaderState({ addedToBagLoaderState: false, section: 'addedtobag' }));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    yield put(setLoaderState(false));
    yield put(BAG_PAGE_ACTIONS.openCheckoutConfirmationModal());
    return yield true;
  }
  return false;
}

function* renderMobileLoader() {
  if (isMobileApp()) yield put(setLoaderState(true));
}

function* renderBagPageCheckoutLoader(isMiniBag, isAddedToBag) {
  if (!isAddedToBag && !isMiniBag) {
    yield put(setLoaderState(true));
  }
}
export function* startCartCheckout({
  payload: {
    isEditingItem,
    navigation,
    closeModal,
    navigationActions,
    isMiniBag,
    isAddedToBag,
  } = {},
} = {}) {
  try {
    yield call(renderMobileLoader);
    if (isEditingItem) {
      yield put(BAG_PAGE_ACTIONS.openCheckoutConfirmationModal(isEditingItem));
    } else {
      if (isMiniBag) {
        yield put(setSectionLoaderState({ miniBagLoaderState: true, section: 'minibag' }));
      }
      if (isAddedToBag) {
        yield put(setSectionLoaderState({ addedToBagLoaderState: true, section: 'addedtobag' }));
      }
      yield call(renderBagPageCheckoutLoader);
      // this.store.dispatch(setVenmoPaymentInProgress(false));
      let res = yield call(getUnqualifiedItems);
      res = res || [];
      yield all(
        res.map(({ orderItemId, isOOS }) =>
          isOOS
            ? put(BAG_PAGE_ACTIONS.setItemOOS(orderItemId))
            : put(BAG_PAGE_ACTIONS.setItemUnavailable(orderItemId))
        )
      );
      yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
      const oOSModalOpen = yield call(confirmStartCheckout);
      if (!oOSModalOpen) {
        yield call(checkoutCart, false, navigation, closeModal, navigationActions);
      }
    }
    yield put(setLoaderState(false));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    yield put(setSectionLoaderState({ addedToBagLoaderState: false, section: 'addedtobag' }));
  } catch (e) {
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    yield put(setSectionLoaderState({ addedToBagLoaderState: false, section: 'addedtobag' }));
    yield put(setLoaderState(false));
    yield call(handleServerSideErrorAPI, e, 'CHECKOUT');
  }
}

export function* startPaypalCheckout({ payload }) {
  const { resolve, reject, isBillingPage } = payload;
  try {
    const orderId = yield select(BAG_SELECTORS.getCurrentOrderId);
    const fromPage = isBillingPage ? 'OrderBillingView' : 'AjaxOrderItemDisplayView';
    const res = yield call(startPaypalCheckoutAPI, orderId, fromPage);
    if (res) {
      yield put(getSetIsPaypalPaymentSettings(res));
      resolve(res.paypalInContextToken);
    }
  } catch (e) {
    reject(e);
  }
}

export function* startPaypalNativeCheckout({ payload }) {
  try {
    const { isBillingPage } = payload;
    yield put(getSetIsPaypalPaymentSettings(null));
    const orderId = yield select(BAG_SELECTORS.getCurrentOrderId);
    const fromPage = isBillingPage ? 'OrderBillingView' : 'AjaxOrderItemDisplayView';
    const res = yield call(startPaypalCheckoutAPI, orderId, fromPage);
    if (res) {
      yield put(getSetIsPaypalPaymentSettings(res));
    }
  } catch (e) {
    yield call(handleServerSideErrorAPI, e, 'CHECKOUT');
  }
}

export function* authorizePayPalPayment({ payload: { navigation, navigationActions } = {} } = {}) {
  try {
    const { tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId } = yield select(
      checkoutSelectors.getPaypalPaymentSettings
    );
    const params = [tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId];
    const res = yield call(paypalAuthorizationAPI, ...params);

    if (res) {
      if (isMobileApp()) {
        yield call(
          navigateToCheckout,
          CONSTANTS.REVIEW_DEFAULT_PARAM,
          navigation,
          navigationActions,
          true
        );
      } else {
        utility.routeToPage(CHECKOUT_ROUTES.reviewPagePaypal);
      }
    }
  } catch (e) {
    yield call(handleServerSideErrorAPI, e, 'CHECKOUT');
    if (!isMobileApp()) {
      yield put(closeMiniBag());
      yield put(BAG_PAGE_ACTIONS.setIsPaypalBtnHidden(true));
      routerPush('/bag', '/bag');
    }
  }
}
// export function* authorizePayPalPayment() {
//   try {
//     const { tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId } = yield select(
//       checkoutSelectors.getPaypalPaymentSettings
//     );
//     const params = [tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId];
//     const res = yield call(paypalAuthorizationAPI, ...params);
//     if (res) {
//       utility.routeToPage(CHECKOUT_ROUTES.reviewPagePaypal);
//     }
//   } catch (e) {
//     yield call(handleServerSideErrorAPI, e, 'CHECKOUT');
//   }
// }

export function* removeUnqualifiedItemsAndCheckout({ navigation } = {}) {
  yield put(setLoaderState(true));
  const unqualifiedItemsIds = yield select(BAG_SELECTORS.getUnqualifiedItemsIds);
  if (unqualifiedItemsIds && unqualifiedItemsIds.size > 0) {
    yield call(removeItem, unqualifiedItemsIds);
    yield call(getCartDataSaga);
  }
  yield put(BAG_PAGE_ACTIONS.closeCheckoutConfirmationModal());
  yield call(checkoutCart, true, navigation);
}

export function* addItemToSFL({
  payload: { itemId, catEntryId, afterHandler, isMiniBag } = {},
} = {}) {
  if (isMiniBag) {
    yield put(setSectionLoaderState({ miniBagLoaderState: true, section: 'minibag' }));
  } else {
    yield put(setLoaderState(true));
  }
  const isRememberedUser = yield select(isRemembered);
  const isRegistered = yield select(getUserLoggedInState);
  const countryCurrency = yield select(BAG_SELECTORS.getCurrentCurrency);
  const isCanadaSIte = isCanada();
  try {
    const res = yield call(
      addItemToSflList,
      catEntryId,
      isRememberedUser,
      isRegistered,
      imageGenerator,
      countryCurrency,
      isCanadaSIte
    );
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
    if (afterHandler) {
      afterHandler();
    }
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(resErr));
    } else {
      yield put(BAG_PAGE_ACTIONS.setCartItemsSFL(true));
      yield put(removeCartItem({ itemId }));
    }
  } catch (err) {
    yield put(setSectionLoaderState(false, 'minibag'));
    yield put(setLoaderState(false));
    const errorsMapping = yield select(BAG_SELECTORS.getErrorMapping);
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(getServerErrorMessage(err, errorsMapping)));
  }
}

export function* getSflDataSaga() {
  try {
    const currencyCode = yield select(BAG_SELECTORS.getCurrentCurrency);
    const isCanadaSite = isCanada();
    const res = yield call(getSflItems, imageGenerator, currencyCode, isCanadaSite);
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

export function* setModifiedSflData(data) {
  try {
    if (yield call(shouldTranslate, true)) {
      const translatedProductInfo = yield call(getTranslatedProductInfo, data.payload);
      if (!translatedProductInfo.error) {
        createMatchObject(data.payload, translatedProductInfo);
      }
    }
    yield put(BAG_PAGE_ACTIONS.setTranslatedSflData(data.payload));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}
export function* setSflItemUpdate(payload) {
  try {
    const isRememberedUser = yield select(isRemembered);
    const isRegistered = yield select(getUserLoggedInState);
    const currencyCode = yield select(BAG_SELECTORS.getCurrentCurrency);
    const isCanadaSite = isCanada();
    const {
      payload: { oldSkuId, newSkuId, callBack },
    } = payload;
    const res = yield call(
      updateSflItem,
      oldSkuId,
      newSkuId,
      isRememberedUser,
      isRegistered,
      imageGenerator,
      currencyCode,
      isCanadaSite
    );
    if (callBack) {
      callBack();
    }
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

export function* startSflItemMoveToBag({ payload }) {
  try {
    yield put(setLoaderState(true));
    const { itemId } = payload;
    const addToCartData = {
      skuInfo: {
        skuId: itemId,
      },
      quantity: 1,
      fromMoveToBag: true,
    };
    yield call(addToCartEcom, { payload: addToCartData });
    yield call(getCartDataSaga, {
      payload: {
        isRecalculateTaxes: true,
        recalcRewards: true,
        translation: true,
        excludeCartItems: false,
      },
    });
    yield call(startSflItemDelete, { payload });
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(err));
  }
}

export function* BagPageSaga() {
  yield takeLatest(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
  yield takeLatest(
    BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
    removeUnqualifiedItemsAndCheckout
  );
  yield takeLatest(BAGPAGE_CONSTANTS.ROUTE_FOR_CART_CHECKOUT, routeForCartCheckout);
  yield takeLatest(BAGPAGE_CONSTANTS.ADD_ITEM_SAVE_FOR_LATER, addItemToSFL);
  yield takeLatest(BAGPAGE_CONSTANTS.START_BAG_CHECKOUT, startCartCheckout);
  yield takeLatest(BAGPAGE_CONSTANTS.START_PAYPAL_CHECKOUT, startPaypalCheckout);
  yield takeLatest(BAGPAGE_CONSTANTS.AUTHORIZATION_PAYPAL_CHECKOUT, authorizePayPalPayment);
  yield takeLatest(BAGPAGE_CONSTANTS.GET_SFL_DATA, getSflDataSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.SFL_ITEMS_DELETE, startSflItemDelete);
  yield takeLatest(BAGPAGE_CONSTANTS.SFL_ITEMS_MOVE_TO_BAG, startSflItemMoveToBag);
  yield takeLatest(BAGPAGE_CONSTANTS.START_PAYPAL_NATIVE_CHECKOUT, startPaypalNativeCheckout);
  yield takeLatest(BAGPAGE_CONSTANTS.SET_SFL_DATA, setModifiedSflData);
  yield takeLatest(BAGPAGE_CONSTANTS.UPDATE_SFL_ITEM, setSflItemUpdate);
}

export default BagPageSaga;
