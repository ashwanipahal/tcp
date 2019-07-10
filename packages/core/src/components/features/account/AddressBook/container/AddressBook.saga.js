import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import fetchData from '../../../../../service/API';
import { setAddressList } from './AddressBook.actions';
import endpoints from '../../../../../service/endpoint';
import CHECKOUT_PAGE from '../../../../../constants/pages.constants';

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
        fromPage: CHECKOUT_PAGE,
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
  const cachedAddressList = validateReduxCache(getAddressList);
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, cachedAddressList);
}

export default AddressBookSaga;
