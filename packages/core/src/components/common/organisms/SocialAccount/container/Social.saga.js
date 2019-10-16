/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import SOCIAL_CONSTANTS from '../social.constants';
import { setSocialAccount, showPointModalDetails } from './Social.actions';
import {
  getSocialAccountsInformation,
  saveSocialAccountsInfo,
} from '../../../../../services/abstractors/account';

export function* getsocialAccounts(action) {
  try {
    const res = yield call(getSocialAccountsInformation, action);
    /* istanbul ignore else */
    if (res) {
      yield put(setSocialAccount(res));
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* savesocialAccounts({ payload }) {
  try {
    const body = {
      token: payload.socialAccInfo.accessToken,
      accountName:
        payload.socialAccInfo.facebook ||
        payload.socialAccInfo.instagram ||
        payload.socialAccInfo.twitter,
      userId: payload.socialAccInfo.userId,
    };

    const isConnected = payload.socialAccInfo.isconnected;

    const res = yield call(saveSocialAccountsInfo, body);
    /* istanbul ignore else */
    if (res) {
      yield put(setSocialAccount(res));
    }

    if (isConnected) {
      yield put(showPointModalDetails({ state: !isConnected }));
    }
  } catch (err) {
    console.log('err', err);
  }
}
export function* SocialAccountSaga() {
  yield takeLatest(SOCIAL_CONSTANTS.GET_SOCIAL_LOAD, getsocialAccounts);
  yield takeLatest(SOCIAL_CONSTANTS.SAVE_SOCIAL_LOAD, savesocialAccounts);
}

export default SocialAccountSaga;
