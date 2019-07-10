import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import { setAddressList } from './AddressBook.actions';
import { getAddressListData } from '../../../../../services/abstractors/features/account';

export function* getAddressList() {
  try {
    const contact = yield call(getAddressListData);
    yield put(setAddressList(contact));
  } catch (err) {
    yield null;
  }
}

export function* AddressBookSaga() {
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, getAddressList);
}

export default AddressBookSaga;
