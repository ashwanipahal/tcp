// @flow
import { call, put, takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import SHIPPING_ADDRESS_CONSTANTS from '../DefaultShippingAddress.constants';
import {
  setDefaultShippingAddressSuccess,
  setDefaultShippingAddressFailure,
} from './DefaultShippingAddress.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';

export function* updateDefaultShippingAddress({ payload }): Saga<Void> {
  try {
    const { baseURI, relURI, method } = endpoints.setDefaultShippingAddress;
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

export function* SetDefaultShippingAddressSaga(): Saga<void> {
  yield takeLatest(
    SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    updateDefaultShippingAddress
  );
}
