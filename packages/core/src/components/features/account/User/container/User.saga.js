import { call, takeLatest, put } from 'redux-saga/effects';
import CONSTANTS from '../User.constants';
import { setUserInfo } from './User.actions';
import { getProfile } from '../../../../../services/abstractors/account';
import { validateReduxCache } from '../../../../../utils/cache.util';

export function* getUserInfoSaga() {
  try {
    const response = yield call(getProfile, {
      pageId: 'myAccount',
    });
    yield put(setUserInfo(response));
  } catch (err) {
    console.log('Error: error in fetching user profile information');
  }
}

export function* UserSaga() {
  const cachedUserInfo = validateReduxCache(getUserInfoSaga);
  yield takeLatest(CONSTANTS.GET_USER_INFO, cachedUserInfo);
}

export default UserSaga;
