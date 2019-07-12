import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setAddressList, showLoader } from './AddressBook.actions';
import { getAddressListData } from '../../../../../services/abstractors/features/account';

export function* getAddressList() {
  try {
    yield put(showLoader());
    const contact = yield call(getAddressListData);
    yield put(setAddressList(contact));
  } catch (err) {
    yield null;
  }
}

export function* AddressBookSaga() {
  const cachedAddressList = validateReduxCache(getAddressList);
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, cachedAddressList);
}

export default AddressBookSaga;
