import { call, put, takeLatest } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import {
  setDefaultShippingAddressSuccess,
  setDefaultShippingAddressFailure,
} from './DefaultShippingAddress.actions';
import { defaultShippingAddressApi } from '../../../../../services/abstractors/account';

export function* updateDefaultShippingAddress({ payload }) {
  try {
    const res = yield call(defaultShippingAddressApi, payload);
    yield put(setDefaultShippingAddressSuccess(res.body));
  } catch (err) {
    yield put(setDefaultShippingAddressFailure(err));
  }
}

export function* SetDefaultShippingAddressSaga() {
  yield takeLatest(
    ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    updateDefaultShippingAddress
  );
}
