import { call, takeLatest, put, all } from 'redux-saga/effects';
import { getAPIConfig } from '@tcp/core/src/utils';
import { defaultChannel } from '@tcp/core/src/services/api.constants';
import { getNavigationData } from '@tcp/core/src/services/abstractors/common/subNavigation';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId } from '../../../../../utils';
import { setAccountNavigationList, showLoader, setSubNavigationData } from './Account.actions';
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

export function* getSubnavigation({ payload }) {
  try {
    const { brand, country } = getAPIConfig();
    const results = yield all(
      payload.map(subNavKey => call(getNavigationData, subNavKey, brand, country, defaultChannel))
    );
    yield all(results.map(res => put(setSubNavigationData(res))));
  } catch (err) {
    yield null;
  }
}

export function* AccountSaga() {
  const cachedAccountNavigationList = validateReduxCache(getAccountNavigationList);
  yield takeLatest(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedAccountNavigationList);
  yield takeLatest(ACCOUNT_CONSTANTS.GET_SUB_NAVIGATION, getSubnavigation);
}

export default AccountSaga;
