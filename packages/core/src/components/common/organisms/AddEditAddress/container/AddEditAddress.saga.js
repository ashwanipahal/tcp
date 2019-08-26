import { call, put, takeLatest, select } from 'redux-saga/effects';
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

  try {
    const res = yield call(addAddress, updatedPayload);
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
    let error = {};
    if (err instanceof Error) {
      error = err.message;
    }
    return yield put(addAddressFail(error));
  }
}

export function* updateAddressPut({ payload }) {
  try {
    const res = yield call(updateAddress, payload);
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
    let error = {};
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
