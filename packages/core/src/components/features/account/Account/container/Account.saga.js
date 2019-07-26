import { call, takeLatest, put } from 'redux-saga/effects';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setAccountNavigationList, showLoader } from './Account.actions';
import accountNavigationAbstractor from '../../../../../services/abstractors/account/AccountNavigation/index';

export function* getAccountNavigationList() {
  try {
     yield put(showLoader());
    const contact = yield call(
      accountNavigationAbstractor.getData,
      'AccountNavigation',
      {
      brand: 'TCP',
      country: 'USA',
      channel: 'Desktop',
    });

    console.log("furkan ------------------");
    console.log(contact);
    console.log("furkan ------------------");
    yield put(setAccountNavigationList(contact));
  } catch (err) {
    yield null;
  }
}

export function* AccountSaga() {
  const cachedAddressList = validateReduxCache(getAccountNavigationList);
  yield takeLatest(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedAddressList);
}

export default AccountSaga;
