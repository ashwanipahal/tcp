import { call, takeLatest, put } from 'redux-saga/effects';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import utils from '../../../../../utils';
import { setAccountNavigationList, showLoader } from './Account.actions';
import accountNavigationAbstractor from '../../../../../services/abstractors/account/AccountNavigation/index';

export function* getAccountNavigationList() {
  const siteId = utils.getSiteId();
  try {
    yield put(showLoader());
    const accountNav = yield call(accountNavigationAbstractor.getData, 'AccountNavigation', {
      brand: 'TCP',
      country: `${siteId}`,
      channel: 'Desktop',
    });
    yield put(setAccountNavigationList(accountNav));
  } catch (err) {
    yield null;
  }
}

export function* AccountSaga() {
  const cachedAccountNavigationList = validateReduxCache(getAccountNavigationList);
  yield takeLatest(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedAccountNavigationList);
}

export default AccountSaga;
