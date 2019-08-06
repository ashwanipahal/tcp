import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setCouponList, showLoader } from './Coupon.actions';
import { getCouponListData } from '../../../../../services/abstractors/CnC';

const sampleData = [
  {
    id: 'R5VALIDFS1',
    status: 'applied',
    isExpiring: false,
    title: 'Applied',
    detailsOpen: false,
    expirationDate: '7/17/20',
    effectiveDate: '5/9/13',
    details: null,
    legalText: '',
    isStarted: true,
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '2020-07-17T18:29:00.001Z',
  },
  {
    id: 'DOLLAROFFDENIM2',
    status: 'available',
    isExpiring: false,
    title: 'Avai-DOLLAROFFDENIM3',
    detailsOpen: false,
    expirationDate: '7/20/21',
    effectiveDate: '4/21/19',
    details: null,
    legalText: '',
    isStarted: true,
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '2021-07-20T18:29:00.001Z',
  },
  {
    id: 'FSBOPIS3',
    status: 'available',
    isExpiring: false,
    title: 'Free Shipping at $50 (FSBOPIS)',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '3/29/17',
    details: null,
    legalText: '',
    isStarted: true,
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '9999-22-31T18:29:59.999Z',
  },
  {
    id: 'PAYPALTEST256',
    status: 'available',
    isExpiring: false,
    title: 'Sample Paypal3',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '2/16/17',
    details: null,
    legalText: 'Sample Payp2al4',
    isStarted: true,
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '9989-12-31T18:29:59.999Z',
  },
  {
    id: 'DOLLAROFFDENIM7',
    status: 'available',
    isExpiring: false,
    title: 'DOLLARO3FFDENIM34',
    detailsOpen: false,
    expirationDate: '7/20/21',
    effectiveDate: '4/21/19',
    details: null,
    legalText: '',
    isStarted: true,
    error:
      'Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.',
    promotionType: 'public',
    expirationDateTimeStamp: '2021-07-20T18:29:00.001Z',
  },
  {
    id: 'FSBOPIS5',
    status: 'available',
    isExpiring: false,
    title: 'Free Shipping at $50 (FSBO6PIS3)',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '3/29/17',
    details: null,
    legalText: '',
    isStarted: true,
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '9999-12-31T18:29:59.999Z',
  },
  {
    id: 'PAYPALTE3ST25',
    status: 'available',
    isExpiring: false,
    title: 'Sample Paypa2l',
    detailsOpen: false,
    expirationDate: '12/31/99',
    effectiveDate: '2/16/17',
    details: null,
    legalText: 'Sample 5Paypal',
    isStarted: true,
    error: '',
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
