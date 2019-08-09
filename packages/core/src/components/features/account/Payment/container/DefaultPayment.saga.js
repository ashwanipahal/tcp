import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import { getCardList, setDefaultPaymentSuccess, setDefaultPaymentError } from './Payment.actions';
import { clearGetAddressListTTL } from '../../AddressBook/container/AddressBook.actions';
import { setDefaultPaymentApi } from '../../../../../services/abstractors/account';

export function* setDefaultPayment({ payload }) {
  try {
    const res = yield call(setDefaultPaymentApi, payload);
    if (res.body) {
      yield put(getCardList({ ignoreCache: true }));
      yield put(clearGetAddressListTTL());
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
