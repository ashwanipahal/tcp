/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import SOCIAL_LOAD from '../social.constants';
import { savesocialAccount, currentSocialInfo } from './Social.actions';
import {
  getSocialAccountsInformation,
  saveSocialAccountsInfo,
} from '../../../../../services/abstractors/account';

export function* getsocialAccounts(action) {
  try {
    const res = yield call(getSocialAccountsInformation, action);
    /* istanbul ignore else */
    if (res) {
      yield put(currentSocialInfo(res));
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* savesocialAccounts({ payload }) {
  try {
    const body = {
      token: payload.socialAccInfo.accessToken,
      accountName: payload.socialAccInfo.facebook,
      userId: payload.socialAccInfo.userId,
    };

    const res = yield call(saveSocialAccountsInfo, body);
    /* istanbul ignore else */
    if (res) {
      yield put(savesocialAccount(res));
    }
  } catch (err) {
    console.log('err', err);
  }
}
export function* SocialAccountSaga() {
  yield takeLatest(SOCIAL_LOAD.SOCIAL_LOAD, getsocialAccounts);
  yield takeLatest(SOCIAL_LOAD.SOCIAL_ACCOUNT_SAVE, savesocialAccounts);
}

export default SocialAccountSaga;
