import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';

import EMAIL_SIGNUP_CONSTANTS from './SmsSignupModal.constants';
import { smsSignupStatus } from './SmsSignupModal.actions';

export function* subscribeSms({ payload }) {
  try {
    const res = yield call(emailSignupAbstractor.subscribeSms, payload);
    yield put(smsSignupStatus({ subscription: res }));
  } catch (err) {
    logger.error(err);
  }
}

function* SmsSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT, subscribeSms);
}

export default SmsSignupSaga;
