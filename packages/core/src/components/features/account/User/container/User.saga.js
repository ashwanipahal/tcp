import { all, call, takeLatest, put } from 'redux-saga/effects';
import { setCountry, setCurrency, setLanguage } from '../../../../../reduxStore/actions';
import CONSTANTS from '../User.constants';
import { setUserInfo } from './User.actions';
import { getProfile } from '../../../../../services/abstractors/account';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId, routerPush } from '../../../../../utils';
import { API_CONFIG } from '../../../../../services/config';

export function* getUserInfoSaga() {
  try {
    const response = yield call(getProfile, {
      pageId: 'myAccount',
    });
    const siteId = getSiteId();
    const { CA_CONFIG_OPTIONS: apiConfig, sites } = API_CONFIG;

    yield all([
      put(setUserInfo(response)),
      put(setCountry(response.country)),
      put(setCurrency(response.currency)),
      put(setLanguage(response.language)),
    ]);
    const { country } = response;
    if (country === sites.ca.toUpperCase() && siteId !== apiConfig.siteId) {
      routerPush(window.location, '/home', null, siteId);
    }
  } catch (err) {
    console.log('Error: error in fetching user profile information');
  }
}

export function* UserSaga() {
  const cachedUserInfo = validateReduxCache(getUserInfoSaga);
  yield takeLatest(CONSTANTS.GET_USER_INFO, cachedUserInfo);
}

export default UserSaga;
