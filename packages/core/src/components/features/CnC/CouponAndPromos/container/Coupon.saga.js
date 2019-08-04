import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setCouponList, showLoader } from './Coupon.actions';
import { getCouponListData } from '../../../../../services/abstractors/CnC';

export function* getCouponList() {
  try {
    yield put(showLoader());
    const contact = yield call(getCouponListData);
    yield put(setCouponList(contact));
  } catch (err) {
    yield null;
  }
}

export function* CouponSaga() {
  const cachedCouponList = validateReduxCache(getCouponList);
  yield takeLatest(COUPON_CONSTANTS.GET_ADDRESS_LIST, cachedCouponList);
}

export default CouponSaga;
