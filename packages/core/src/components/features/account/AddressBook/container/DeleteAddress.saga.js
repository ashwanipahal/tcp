import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
  setDeleteModalMountedState,
} from './AddressBook.actions';

export function* deleteAddress({ payload }) {
  try {
    const { relURI, method } = endpoints.deleteAddress;
    const baseURI = endpoints.deleteAddress.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        nickName: payload.nickName,
      },
      method
    );
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
