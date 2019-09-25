import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import endpoints from '@tcp/core/src/service/endpoint';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';

import EMAIL_SIGNUP_CONSTANTS from './SmsSignupModal.constants';
import { smsSignupStatus } from './SmsSignupModal.actions';

export function* subscribeSms({ payload }) {
  try {
    const { baseURI, relURI, method } = endpoints.addSmsSignup;

    const res = yield call(emailSignupAbstractor.subscribeSms, baseURI, relURI, payload, method);
    yield put(smsSignupStatus({ subscription: res }));
  } catch (err) {
    logger.error(err);
  }
}

function* SmsSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT, subscribeSms);
}

export default SmsSignupSaga;
