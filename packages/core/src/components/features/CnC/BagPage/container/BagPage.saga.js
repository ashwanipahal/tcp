/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import CONSTANTS, { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import {
  getOrderDetailsData,
  getCartData,
  getUnqualifiedItems,
  removeItem,
  getProductInfoForTranslationData,
} from '../../../../../services/abstractors/CnC';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import { checkoutSetCartData } from '../../Checkout/container/Checkout.action';
import BAG_SELECTORS from './BagPage.selectors';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import checkoutSelectors from '../../Checkout/container/Checkout.selector';
import { isMobileApp } from '../../../../../utils';

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
  const productypes = getProductsTypes(cartInfo.orderDetails.orderItems);
  const gymProdpartNumberList = productypes.gymProducts;
  const tcpProdpartNumberList = productypes.tcpProducts;
  let tcpProductsResults;
  let gymProductsResults;
  if (tcpProdpartNumberList.length) {
    tcpProductsResults = yield call(getProductInfoForTranslationData, tcpProdpartNumberList.join());
  }

  if (gymProdpartNumberList.length) {
    gymProductsResults = yield call(getProductInfoForTranslationData, gymProdpartNumberList.join());
  }
  gymProductsResults = (gymProductsResults && gymProductsResults.body.response.products) || [];
  tcpProductsResults = (tcpProductsResults && tcpProductsResults.body.response.products) || [];

  return [...gymProductsResults, ...tcpProductsResults];
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

export function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);

    createMatchObject(res, translatedProductInfo);
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
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
    const isCanada = false; // TODO to get current country
    const res = yield call(getCartData, {
      calcsEnabled: isCartPage || isRecalculateTaxes,
      excludeCartItems: false,
      recalcRewards: recalcOrderPoints,
      isCanada,
      isRadialInvEnabled,
    });
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);
    // yield getFinalTranslatedOrderDetails( res.orderDetails.orderItems ,getTranslatedProductInfo.body.response.products);

    createMatchObject(res, translatedProductInfo);

    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
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

export function* routeForCartCheckout(recalc, navigation) {
  const orderHasPickup = yield select(checkoutSelectors.getIsOrderHasPickup);
  if (isMobileApp()) {
    if (orderHasPickup) {
      navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP);
    } else {
      navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING);
    }
  } else if (orderHasPickup) {
    utility.routeToPage(CHECKOUT_ROUTES.pickupPage, { recalc });
  } else {
    utility.routeToPage(CHECKOUT_ROUTES.shippingPage, { recalc });
  }
}

export function* checkoutCart(recalc, navigation) {
  const isLoggedIn = yield select(getUserLoggedInState);
  if (!isLoggedIn) {
    return yield put(setCheckoutModalMountedState({ state: true }));
  }
  return yield call(routeForCartCheckout, recalc, navigation);
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

export function* startCartCheckout({ payload: { isEditingItem, navigation } = {} } = {}) {
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
      yield call(checkoutCart, false, navigation);
    }
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

export function* BagPageSaga() {
  yield takeLatest(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
  yield takeLatest(BAGPAGE_CONSTANTS.START_BAG_CHECKOUT, startCartCheckout);
  yield takeLatest(
    BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
    removeUnqualifiedItemsAndCheckout
  );
  yield takeLatest(BAGPAGE_CONSTANTS.ROUTE_FOR_CART_CHECKOUT, routeForCartCheckout);
}

export default BagPageSaga;
