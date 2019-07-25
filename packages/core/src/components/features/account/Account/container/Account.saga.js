import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setAddressList, showLoader } from './Account.actions';
import accountNavigationAbstractor from '../../../../../services/abstractors/account/AccountNavigation/index';

export function* getAddressList() {
  try {
    console.log("ali------------------------------------------");
    console.log("ali------------------------------------------");
     yield put(showLoader());
    const contact = yield call(accountNavigationAbstractor.getData('AccountNavigation', {
      brand: 'TCP',
      country: 'USA',
      channel: 'Desktop',
    }));

    console.log("furkan ------------------");
    console.log(contact);
    console.log("furkan ------------------");
    yield put(setAddressList(contact));
  } catch (err) {
    yield null;
  }
}

export function* AccountSaga() {
  const cachedAddressList = validateReduxCache(getAddressList);
  yield takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, cachedAddressList);
}

export default AccountSaga;
