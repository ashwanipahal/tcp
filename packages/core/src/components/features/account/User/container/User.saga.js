import { all, call, takeLatest, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { submitUserSurvey } from '@tcp/core/src/services/abstractors/account/UpdateProfileInfo';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { updateProfileSuccess } from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.actions';
import { setCountry, setLanguage, setBossBopisFlags } from '../../../../../reduxStore/actions';
import CONSTANTS from '../User.constants';
import { setUserInfo, setIsRegisteredUserCallDone } from './User.actions';
import { getProfile } from '../../../../../services/abstractors/account';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId, routerPush } from '../../../../../utils';
import { API_CONFIG } from '../../../../../services/config';
import { setAddressList } from '../../AddressBook/container/AddressBook.actions';

export function* getUserInfoSaga() {
  yield put(setLoaderState(true));
  try {
    const response = yield call(getProfile, {
      pageId: 'myAccount',
      source: 'login',
    });
    const siteId = getSiteId();
    const { CA_CONFIG_OPTIONS: apiConfig, sites } = API_CONFIG;
    const { country, language, bossBopisFlags } = response;
    const dataSetActions = [];
    if (country) {
      dataSetActions.push(put(setCountry(country)));
    }
    dataSetActions.push(
      put(setUserInfo(response)),
      put(setAddressList(response.contactList, true)),
      put(setBossBopisFlags(bossBopisFlags)),
      put(setIsRegisteredUserCallDone())
    );
    yield all(dataSetActions);
    if (language) {
      yield put(setLanguage(language));
    }

    if (country === sites.ca.toUpperCase() && siteId !== apiConfig.siteId) {
      routerPush(window.location, '/home', null, siteId);
    }
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(setIsRegisteredUserCallDone());
    logger.error('Error: error in fetching user profile information');
  }
}

function* setSurveyAnswersSaga(data) {
  yield put(setLoaderState(true));
  try {
    yield call(submitUserSurvey, data);
    yield call(getUserInfoSaga);
    yield put(updateProfileSuccess('successMessage'));
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
    yield null;
  }
}

export function* UserSaga() {
  const cachedUserInfo = validateReduxCache(getUserInfoSaga);
  yield takeLatest(CONSTANTS.GET_USER_INFO, cachedUserInfo);
  yield takeLatest(CONSTANTS.SET_SURVEY_ANSWERS, setSurveyAnswersSaga);
}

export default UserSaga;
