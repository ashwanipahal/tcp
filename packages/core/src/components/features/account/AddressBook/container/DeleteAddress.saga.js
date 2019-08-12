import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
  setDeleteModalMountedState,
} from './AddressBook.actions';
import { deleteAddressApi } from '../../../../../services/abstractors/account';

export function* deleteAddress({ payload }) {
  try {
    const res = yield call(deleteAddressApi, payload);
    if (res.statusCode === 200) {
      yield put(updateAddressListOnDelete(res.body || ''));
      yield put(setDeleteModalMountedState({ state: false }));
    } else {
      yield put(updateAddressListOnDeleteErr(res.error));
    }
  } catch (err) {
    yield put(updateAddressListOnDeleteErr(err));
  }
}

export function* DeleteAddressSaga() {
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.DELETE_ADDRESS, deleteAddress);
}

export default DeleteAddressSaga;
