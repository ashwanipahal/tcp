import { call, takeLatest, put } from 'redux-saga/effects';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId } from '../../../../../utils';
import { setAccountNavigationList, showLoader } from './Account.actions';
import accountNavigationAbstractor from '../../../../../services/abstractors/account/AccountNavigation/index';

export function* getAccountNavigationList() {
  const siteId = getSiteId();
  let queryParams = '';
  if (siteId === ACCOUNT_CONSTANTS.ACCOUNT_SITE_US) {
    queryParams = {
      brand: ACCOUNT_CONSTANTS.ACCOUNT_BRAND_US,
      country: ACCOUNT_CONSTANTS.ACCOUNT_COUNTRY_US,
      channel: ACCOUNT_CONSTANTS.ACCOUNT_CHANNEL_US,
    };
  }
  if (siteId === ACCOUNT_CONSTANTS.ACCOUNT_SITE_CA) {
    queryParams = {
      brand: ACCOUNT_CONSTANTS.ACCOUNT_BRAND_CA,
      country: ACCOUNT_CONSTANTS.ACCOUNT_COUNTRY_CA,
      channel: ACCOUNT_CONSTANTS.ACCOUNT_CHANNEL_CA,
    };
  }
  try {
    yield put(showLoader());
    const accountNav = yield call(
      accountNavigationAbstractor.getData,
      'AccountNavigation',
      queryParams
    );
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
