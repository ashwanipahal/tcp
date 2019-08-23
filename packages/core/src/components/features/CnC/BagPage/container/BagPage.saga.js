/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import {
  getOrderDetailsData,
  getCartData,
  getUnqualifiedItems,
  removeItem,
} from '../../../../../services/abstractors/CnC';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import BAG_SELECTORS from './BagPage.selectors';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { routerPush } from '../../../../../utils';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

export function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}
export function* getCartDataSaga(isRecalculateTaxes) {
  try {
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
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
    yield put(BAG_PAGE_ACTIONS.setCouponsData(res.coupons));
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

export function* checkoutCart(recalc) {
  const isLoggedIn = yield select(getUserLoggedInState);
  if (!isLoggedIn) {
    return yield put(setCheckoutModalMountedState({ state: true }));
  }
  return yield call(routerPush, '/checkout', '/checkout', { recalc });
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

export function* startCartCheckout() {
  // this.store.dispatch(setVenmoPaymentInProgress(false));
  let res = yield call(getUnqualifiedItems);
  res = res || [];
  yield all(res.map(item => put(BAG_PAGE_ACTIONS.setItemOOS(item))));
  const oOSModalOpen = yield call(confirmStartCheckout);
  if (!oOSModalOpen) {
    yield call(checkoutCart);
  }
}

export function* removeUnqualifiedItemsAndCheckout() {
  const unqualifiedItemsIds = yield select(BAG_SELECTORS.getUnqualifiedItemsIds);
  if (unqualifiedItemsIds && unqualifiedItemsIds.size > 0) {
    yield call(removeItem, unqualifiedItemsIds);
    yield call(getCartDataSaga);
  }
  yield call(checkoutCart, true);
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
}

export default BagPageSaga;
