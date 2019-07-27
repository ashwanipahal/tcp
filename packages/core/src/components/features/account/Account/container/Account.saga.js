import { call, takeLatest, put } from 'redux-saga/effects';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setAccountNavigationList, showLoader } from './Account.actions';
import accountNavigationAbstractor from '../../../../../services/abstractors/account/AccountNavigation/index';

export function* getAccountNavigationList() {
  try {
     yield put(showLoader());
    const contact = yield call(
      accountNavigationAbstractor.getMock
    //   ,
    //   'AccountNavigation',
    //   {
    //   brand: 'TCP',
    //   country: 'USA',
    //   channel: 'Desktop',
    // }
    );
    yield put(setAccountNavigationList(contact));
  } catch (err) {
    yield null;
  }
}

export function* AccountSaga() {
  const cachedAccountNavigationList = validateReduxCache(getAccountNavigationList);
  yield takeLatest(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedAccountNavigationList);
}

export default AccountSaga;
