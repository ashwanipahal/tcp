import { call, takeLatest, put } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { clearCardListTTL } from '../../Payment/container/Payment.actions';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
  setDeleteModalMountedState,
} from './AddressBook.actions';
import { deleteAddressApi } from '../../../../../services/abstractors/account';

export function* deleteAddress({ payload }) {
  yield put(setLoaderState(true));
  try {
    const res = yield call(deleteAddressApi, payload);
    yield put(setLoaderState(false));
    if (res.statusCode === 200) {
      yield put(updateAddressListOnDelete(res.body || ''));
      yield put(clearCardListTTL());
      yield put(setDeleteModalMountedState({ state: false }));
    } else {
      yield put(updateAddressListOnDeleteErr(res.error));
    }
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(updateAddressListOnDeleteErr(err));
  }
}

export function* DeleteAddressSaga() {
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.DELETE_ADDRESS, deleteAddress);
}

export default DeleteAddressSaga;
