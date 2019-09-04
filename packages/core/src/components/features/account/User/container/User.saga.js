import { all, call, takeLatest, put } from 'redux-saga/effects';
import { submitUserSurvey } from '@tcp/core/src/services/abstractors/account/UpdateProfileInfo';
import { updateProfileSuccess } from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.actions';
import { setCountry, setCurrency, setLanguage } from '../../../../../reduxStore/actions';
import CONSTANTS from '../User.constants';
import { setUserInfo } from './User.actions';
import { getProfile } from '../../../../../services/abstractors/account';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId, routerPush } from '../../../../../utils';
import { API_CONFIG } from '../../../../../services/config';
import { setAddressList } from '../../AddressBook/container/AddressBook.actions';

export function* getUserInfoSaga() {
  try {
    const response = yield call(getProfile, {
      pageId: 'myAccount',
    });
    const siteId = getSiteId();
    const { CA_CONFIG_OPTIONS: apiConfig, sites } = API_CONFIG;

    yield all([
      put(setUserInfo(response)),
      put(setAddressList(response.contactList)),
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

function* setSurveyAnswersSaga(data) {
  try {
    yield call(submitUserSurvey, data);
    yield call(getUserInfoSaga);
    yield put(updateProfileSuccess('successMessage'));
  } catch (err) {
    yield null;
  }
}

export function* UserSaga() {
  const cachedUserInfo = validateReduxCache(getUserInfoSaga);
  yield takeLatest(CONSTANTS.GET_USER_INFO, cachedUserInfo);
  yield takeLatest(CONSTANTS.SET_SURVEY_ANSWERS, setSurveyAnswersSaga);
}

export default UserSaga;
