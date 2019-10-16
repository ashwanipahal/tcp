/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select, delay } from 'redux-saga/effects';
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
} from '../../../../../services/abstractors/CnC';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import {
  checkoutSetCartData,
  getSetIsPaypalPaymentSettings,
} from '../../Checkout/container/Checkout.action';
import BAG_SELECTORS from './BagPage.selectors';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import {
  getUserLoggedInState,
  getPersonalDataState,
} from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import checkoutSelectors, { isRemembered } from '../../Checkout/container/Checkout.selector';
import { isMobileApp, isCanada } from '../../../../../utils';

import {
  addItemToSflList,
  getSflItems,
} from '../../../../../services/abstractors/CnC/SaveForLater';
import { removeCartItem } from '../../CartItemTile/container/CartItemTile.actions';
import { imageGenerator } from '../../../../../services/abstractors/CnC/CartItemTile';
import { getUserInfo } from '../../../account/User/container/User.actions';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import {
  closeMiniBag,
  updateCartManually,
} from '../../../../common/organisms/Header/container/Header.actions';
import { addToCartEcom } from '../../AddedToBag/container/AddedToBag.actions';

// external helper function
const PAYPAL_REDIRECT_PARAM = 'isPaypalPostBack';

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
  return {
    tcpProducts,
    gymProducts,
  };
};

export function* getTranslatedProductInfo(cartInfo) {
  let tcpProductsResults;
  let gymProductsResults;
  try {
    const productypes = getProductsTypes(cartInfo.orderDetails.orderItems);
    const gymProdpartNumberList = productypes.gymProducts;
    const tcpProdpartNumberList = productypes.tcpProducts;
    if (tcpProdpartNumberList.length) {
      tcpProductsResults = yield call(
        getProductInfoForTranslationData,
        tcpProdpartNumberList.join()
      );
    }
    if (gymProdpartNumberList.length) {
      gymProductsResults = yield call(
        getProductInfoForTranslationData,
        gymProdpartNumberList.join()
      );
    }
    gymProductsResults = (gymProductsResults && gymProductsResults.body.response.products) || [];
    tcpProductsResults = (tcpProductsResults && tcpProductsResults.body.response.products) || [];

    return [...gymProductsResults, ...tcpProductsResults];
  } catch (err) {
    gymProductsResults = [];
    tcpProductsResults = [];
    return [...gymProductsResults, ...tcpProductsResults];
  }
}

function createMatchObject(res, translatedProductInfo) {
  res.orderDetails.orderItems.forEach(orderItemInfo => {
    const orderItem = orderItemInfo;
    translatedProductInfo.forEach(item => {
      if (orderItem.productInfo.productPartNumber === item.prodpartno) {
        orderItem.productInfo.name = item.product_name;
        orderItem.productInfo.color.name = item.TCPColor;
      }
    });
  });
}

export function* getOrderDetailSaga(payload) {
  const { payload: { after } = {} } = payload;
  try {
    yield put(updateCartManually(true));
    const res = yield call(getOrderDetailsData);
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);

    createMatchObject(res, translatedProductInfo);
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));

    if (after) {
      yield call(after);
    }
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

export function* getCartDataSaga(payload = {}) {
  try {
    const {
      payload: {
        isRecalculateTaxes,
        isCheckoutFlow,
        isCartNotRequired,
        updateSmsInfo,
        onCartRes,
      } = {},
    } = payload;
    const isCartPage = true;
    // const recalcOrderPointsInterval = 3000; // TODO change it to coming from AB test
    const recalcOrderPoints = false; // TODO getOrderPointsRecalcFlag(recalcRewards, recalcOrderPointsInterval);
    const isRadialInvEnabled = true; // TODO to get current country
    const isCanadaSIte = false; // TODO to get current country
    const res = yield call(getCartData, {
      calcsEnabled: isCartPage || isRecalculateTaxes,
      excludeCartItems: false,
      recalcRewards: recalcOrderPoints,
      isCanadaSIte,
      isRadialInvEnabled,
    });
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);
    if (!translatedProductInfo.error) {
      createMatchObject(res, translatedProductInfo);
    }
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
    if (res.orderDetails.orderItems.length > 0) {
      const personalData = yield select(getPersonalDataState);
      if (!personalData || !personalData.get('userId')) {
        yield put(getUserInfo());
      }
    }
    if (isCheckoutFlow) {
      yield put(checkoutSetCartData({ res, isCartNotRequired, updateSmsInfo }));
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

/**
 * routeForCartCheckout component. This is responsible for routing our web to specific page of checkout journey.
 * @param {Boolean} recalc query parameter for recalculation of points
 * @param {Object} navigation for navigating in mobile app
 * @param {Boolean} closeModal for closing addedtoBag modal in app
 */
export function* routeForCartCheckout(recalc, navigation, closeModal, navigationActions) {
  const { hasVenmoReviewPageRedirect, getIsOrderHasPickup } = checkoutSelectors;
  const orderHasPickup = yield select(getIsOrderHasPickup);
  const IsInternationalShipping = yield select(getIsInternationalShipping);
  if (isMobileApp()) {
    if (orderHasPickup) {
      const navigateAction = navigationActions.navigate({
        routeName: CONSTANTS.CHECKOUT_ROOT,
        params: {},
        action: navigationActions.navigate({
          routeName: CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP,
          params: {
            routeTo: CONSTANTS.PICKUP_DEFAULT_PARAM,
          },
        }),
      });
      navigation.dispatch(navigateAction);
    } else {
      const navigateAction = navigationActions.navigate({
        routeName: CONSTANTS.CHECKOUT_ROOT,
        params: {},
        action: navigationActions.navigate({
          routeName: CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING,
          params: {
            routeTo: CONSTANTS.SHIPPING_DEFAULT_PARAM,
          },
        }),
      });
      navigation.dispatch(navigateAction);
    }
    if (closeModal) {
      closeModal();
    }
  } else if (!IsInternationalShipping) {
    yield put(closeMiniBag());
    const hasVenmoReviewPage = yield select(hasVenmoReviewPageRedirect);
    if (hasVenmoReviewPage) {
      utility.routeToPage(CHECKOUT_ROUTES.reviewPage, { recalc });
      return;
    }
    if (orderHasPickup) {
      utility.routeToPage(CHECKOUT_ROUTES.pickupPage, { recalc });
    } else {
      utility.routeToPage(CHECKOUT_ROUTES.shippingPage, { recalc });
    }
  } else {
    utility.routeToPage(CHECKOUT_ROUTES.internationalCheckout, { recalc });
  }
}

export function* checkoutCart(recalc, navigation, closeModal, navigationActions) {
  const isVenmoPaymentInProgress = yield select(checkoutSelectors.isVenmoPaymentInProgress);
  const isLoggedIn = yield select(getUserLoggedInState);
  if (!isLoggedIn && !isVenmoPaymentInProgress) {
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
    yield put(BAG_PAGE_ACTIONS.openCheckoutConfirmationModal());
    return yield true;
  }
  return false;
}

export function* startCartCheckout({
  payload: { isEditingItem, navigation, closeModal, navigationActions } = {},
} = {}) {
  if (isEditingItem) {
    yield put(BAG_PAGE_ACTIONS.openCheckoutConfirmationModal(isEditingItem));
  } else {
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
    const oOSModalOpen = yield call(confirmStartCheckout);
    if (!oOSModalOpen) {
      yield call(checkoutCart, false, navigation, closeModal, navigationActions);
    }
  }
}

export function* startPaypalCheckout({ payload }) {
  const { resolve, reject } = payload;
  try {
    const orderId = yield select(BAG_SELECTORS.getCurrentOrderId);
    // const fromPage = false ? 'AjaxOrderItemDisplayView' : 'OrderBillingView';
    const fromPage = 'AjaxOrderItemDisplayView';
    const res = yield call(startPaypalCheckoutAPI, orderId, fromPage);
    if (res) {
      yield put(getSetIsPaypalPaymentSettings(res));
      resolve(res.paypalInContextToken);
    }
  } catch (e) {
    reject(e);
  }
}

export function* startPaypalNativeCheckout() {
  const orderId = yield select(BAG_SELECTORS.getCurrentOrderId);
  // const fromPage = false ? 'AjaxOrderItemDisplayView' : 'OrderBillingView';
  const fromPage = 'AjaxOrderItemDisplayView';
  const res = yield call(startPaypalCheckoutAPI, orderId, fromPage);
  if (res) {
    yield put(getSetIsPaypalPaymentSettings(res));
  }
}

export function* authorizePayPalPayment({ payload: { navigation, navigationActions } = {} } = {}) {
  const { tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId } = yield select(
    checkoutSelectors.getPaypalPaymentSettings
  );
  const res = yield call(
    paypalAuthorizationAPI,
    tcpOrderId,
    centinelRequestPage,
    centinelPayload,
    centinelOrderId
  );
  if (res) {
    if (isMobileApp()) {
      const navigateAction = navigationActions.navigate({
        routeName: CONSTANTS.CHECKOUT_ROOT,
        params: {},
        action: navigationActions.navigate({
          routeName: CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_REVIEW,
          params: {
            routeTo: CONSTANTS.REVIEW_DEFAULT_PARAM,
          },
        }),
      });
      navigation.dispatch(navigateAction);
    } else {
      utility.routeToPage(CHECKOUT_ROUTES.reviewPage, {
        queryValues: { [PAYPAL_REDIRECT_PARAM]: 'true' },
      });
    }
    // redirect
  }
}

export function* removeUnqualifiedItemsAndCheckout({ navigation } = {}) {
  const unqualifiedItemsIds = yield select(BAG_SELECTORS.getUnqualifiedItemsIds);
  if (unqualifiedItemsIds && unqualifiedItemsIds.size > 0) {
    yield call(removeItem, unqualifiedItemsIds);
    yield call(getCartDataSaga);
  }
  yield put(BAG_PAGE_ACTIONS.closeCheckoutConfirmationModal());
  yield call(checkoutCart, true, navigation);
}

export function* addItemToSFL({
  payload: { itemId, catEntryId, userInfoRequired, afterHandler } = {},
} = {}) {
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
      if (userInfoRequired) {
        yield put(getUserInfo());
      }
      yield put(removeCartItem({ itemId }));
    }
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(err));
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

export function* startSflItemDelete({ payload: { catEntryId } = {} } = {}) {
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
      isCanadaSIte,
      true
    );
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(resErr));
    } else {
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(true));
      yield delay(BAGPAGE_CONSTANTS.ITEM_SFL_SUCCESS_MSG_TIMEOUT);
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(false));
    }
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(err));
  }
}

export function* startSflItemMoveToBag({ payload }) {
  try {
    const { itemId } = payload;
    const addToCartData = {
      skuInfo: {
        skuId: itemId,
      },
      quantity: 1,
      fromMoveToBag: true,
    };
    yield put(addToCartEcom(addToCartData));
    yield put(BAG_PAGE_ACTIONS.getCartData());
    // yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(BAG_PAGE_ACTIONS.startSflItemDelete(payload));
  } catch (err) {
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
}

export default BagPageSaga;
