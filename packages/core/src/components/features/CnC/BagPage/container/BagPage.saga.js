import { call, takeLatest, put, all } from 'redux-saga/effects';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { getOrderDetailsData, getCartData } from '../../../../../services/abstractors/CnC';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';

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

export function* BagPageSaga() {
  yield takeLatest(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
}

export default BagPageSaga;
