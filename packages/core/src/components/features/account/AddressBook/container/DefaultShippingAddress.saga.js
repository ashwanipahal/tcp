import { call, put, takeLatest } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import {
  setDefaultShippingAddressSuccess,
  setDefaultShippingAddressFailure,
} from './DefaultShippingAddress.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';

export function* updateDefaultShippingAddress({ payload }) {
  try {
    const { relURI, method } = endpoints.setDefaultShippingAddress;
    const baseURI = endpoints.setDefaultShippingAddress.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        nickName: payload.nickName,
      },
      method
    );
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
