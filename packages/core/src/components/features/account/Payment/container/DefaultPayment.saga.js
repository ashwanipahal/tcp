import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { getCardList, setDefaultPaymentSuccess, setDefaultPaymentError } from './Payment.actions';
import { clearGetAddressListTTl } from '../../AddressBook/container/AddressBook.actions';

export function* setDefaultPayment({ payload }) {
  try {
    const { relURI, method } = endpoints.setDefaultPayment;
    const baseURI = endpoints.setDefaultPayment.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        isRest: true,
      },
      method
    );
    if (res.body) {
      yield put(getCardList({ ignoreCache: true }));
      yield put(clearGetAddressListTTl());
      yield put(setDefaultPaymentSuccess());
    } else yield put(setDefaultPaymentError());
  } catch (err) {
    yield put(setDefaultPaymentError(err));
  }
}

export function* DefaultPaymentSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT, setDefaultPayment);
}

export default DefaultPaymentSaga;
