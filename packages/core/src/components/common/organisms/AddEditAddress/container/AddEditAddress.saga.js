import { call, put, takeLatest, select } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader';
import constants from './AddEditAddress.constants';
import { addAddressSuccess, addAddressFail } from './AddEditAddress.actions';
import {
  setAddressBookNotification,
  clearGetAddressListTTL,
} from '../../../../features/account/AddressBook/container/AddressBook.actions';
import { addAddress, updateAddress } from '../../../../../services/abstractors/account';
import { getUserEmail } from '../../../../features/account/User/container/User.selectors';

export function* addAddressGet({ payload }, addToAddressBook = true) {
  const userEmail = yield select(getUserEmail);
  const updatedPayload = { ...payload, ...{ email: userEmail } };
  yield put(setLoaderState(true));
  try {
    const res = yield call(addAddress, updatedPayload);
    yield put(setLoaderState(false));
    if (!addToAddressBook) {
      return res;
    }
    if (res) {
      yield put(
        setAddressBookNotification({
          status: 'success',
        })
      );
      yield put(clearGetAddressListTTL());
      return yield put(addAddressSuccess(res.body));
    }
    return yield put(addAddressFail(res.body));
  } catch (err) {
    if (!addToAddressBook) {
      yield put(setLoaderState(false));
      throw err;
    }
    yield put(setLoaderState(false));
    let error = {};
    /* istanbul ignore else */
    error = err;
    return yield put(addAddressFail(error.response.body.errors[0]));
  }
}

export function* updateAddressPut({ payload }, fromCheckout) {
  const userEmail = yield select(getUserEmail);
  const updatedPayload = { ...payload, ...{ email: userEmail } };
  yield put(setLoaderState(true));
  try {
    const res = yield call(
      updateAddress,
      updatedPayload,
      fromCheckout && fromCheckout.profileUpdate
    );
    yield put(setLoaderState(false));
    if (res) {
      yield put(
        setAddressBookNotification({
          status: 'success',
        })
      );
      yield put(clearGetAddressListTTL());
      const putRes = yield put(addAddressSuccess(res.body));
      if (fromCheckout) {
        return res.body;
      }
      return putRes;
    }
    return yield res.body;
  } catch (err) {
    let error = {};
    yield put(setLoaderState(false));
    if (err instanceof Error) {
      error = err.response.body;
    }
    return yield put(addAddressFail(error));
  }
}

export function* AddEditAddressSaga() {
  yield takeLatest(constants.ADD_USER_ADDRESS_REQ, addAddressGet);
  yield takeLatest(constants.UPDATE_USER_ADDRESS_REQ, updateAddressPut);
}

export default AddEditAddressSaga;
