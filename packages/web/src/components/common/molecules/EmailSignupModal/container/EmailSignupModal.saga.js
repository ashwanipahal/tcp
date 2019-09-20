import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { subscribeEmailAddress } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga.util';
import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';
import { setEmailValidationStatus } from './EmailSignupModal.actions';

export function* subscribeEmail(emailObj, status) {
  return yield call(subscribeEmailAddress, emailObj, status);
}

export function* verifyEmail({ payload }) {
  try {
    const emailValidationState = yield call(emailSignupAbstractor.verifyEmail, payload);
    yield put(setEmailValidationStatus({ validEmail: emailValidationState }));
  } catch (err) {
    logger.error(err);
  }
}

function* EmailSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT, subscribeEmail);
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL, verifyEmail);
}

export default EmailSignupSaga;
