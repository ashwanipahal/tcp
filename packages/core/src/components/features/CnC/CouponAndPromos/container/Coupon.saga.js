import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setCouponList, showLoader } from './Coupon.actions';
import { getCouponListData } from '../../../../../services/abstractors/CnC';

const sampleData = [
  {
    id: 'GYMONLY1235',
    status: 'available',
    isExpiring: false,
    title: '$10 off $60',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '7/31/19',
    details: null,
    legalText: '$10 off $50 ONLY',
    isStarted: true,
    imageThumbUrl: '/wcsstore/static/images/saving-icon-thumb.svg',
    imageUrl: 'saving-logo.png',
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '9999-12-31T18:29:59.999Z',
  },
  {
    id: 'GYMONLY12322',
    status: 'available',
    isExpiring: false,
    title: '$10 off $50 Gy1 ONLY',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '7/31/19',
    details: null,
    legalText: '$10 off $50 Gymbor2 ONLY',
    isStarted: true,
    imageThumbUrl: '/wcsstore/static/images/saving-icon-thumb.svg',
    imageUrl: 'saving-logo.png',
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '9999-12-31T18:29:59.999Z',
  },
];

export function* getCouponList() {
  try {
    yield put(showLoader());
    const a = '1';
    const b = '2';
    const contact = a === b ? yield call(getCouponListData) : sampleData;
    yield put(setCouponList(contact));
  } catch (err) {
    yield null;
  }
}

export function* CouponSaga() {
  const cachedCouponList = validateReduxCache(getCouponList);
  yield takeLatest(COUPON_CONSTANTS.GET_COUPON_LIST, cachedCouponList);
}

export default CouponSaga;
