import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import fetchData from '../../../../../service/API';
import { setAddressList } from './AddressBook.actions';
import endpoints from '../../../../../service/endpoint';

export function* getAddressList() {
  try {
    const { relURI, method } = endpoints.getAddressList;
    const baseURI = endpoints.getAddressList.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        fromPage: 'checkout',
      },
      method
    );
    if (res.body) {
      yield put(setAddressList(res.body.contact || []));
    }
    yield null;
  } catch (err) {
    yield null;
  }
}

export function* AddressBookSaga() {
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, getAddressList);
}

export default AddressBookSaga;
