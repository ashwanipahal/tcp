import { call, put, takeLatest, select } from 'redux-saga/effects';
import constants from './AddEditAddress.constants';
import { addAddressSuccess, addAddressFail,setLoadingState } from './AddEditAddress.actions';
import {
  setAddressBookNotification,
  clearGetAddressListTTL,
} from '../../../../features/account/AddressBook/container/AddressBook.actions';
import { addAddress, updateAddress } from '../../../../../services/abstractors/account';
import { getUserEmail } from '../../../../features/account/User/container/User.selectors';

export function* addAddressGet({ payload }, addToAddressBook = true) {
  const userEmail = yield select(getUserEmail);
  const updatedPayload = { ...payload, ...{ email: userEmail } };

  yield put(setLoadingState({ isLoading: true }));
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
    if (!addToAddressBook) {
      yield put(setLoadingState({ isLoading: false }));
      throw err;
    }
    yield put(setLoadingState({ isLoading: false }));
    let error = {};
    /* istanbul ignore else */
    error = err;
    return yield put(addAddressFail(error.response.body.errors[0]));
  }
}

export function* updateAddressPut({ payload }, fromCheckout) {
  const userEmail = yield select(getUserEmail);
  const updatedPayload = { ...payload, ...{ email: userEmail } };
  yield put(setLoadingState({ isLoading: true }));
  try {
    const res = yield call(
      updateAddress,
      updatedPayload,
      fromCheckout && fromCheckout.profileUpdate
    );
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
    yield put(setLoadingState({ isLoading: false }));
    return yield put(addAddressFail(res.body));
  } catch (err) {
    let error = {};
    if (err instanceof Error) {
      error = err.response.body;
    }
    yield put(setLoadingState({ isLoading: false }));
    return yield put(addAddressFail(error));
  }
}

export function* AddEditAddressSaga() {
  yield takeLatest(constants.ADD_USER_ADDRESS_REQ, addAddressGet);
  yield takeLatest(constants.UPDATE_USER_ADDRESS_REQ, updateAddressPut);
}

export default AddEditAddressSaga;
