import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '@tcp/core/src/service/endpoint';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';
import { emailSignupStatus, setEmailValidationStatus } from './EmailSignupModal.actions';

export function* subscribeEmail(emailObj, status) {
  try {
    const { baseURI, relURI, method } = endpoints.addEmailSignup;
    const params = {
      payload: JSON.stringify({
        storeId: 10151,
        catalogId: 10551,
        langId: '-1',
        emailaddr: emailObj.payload,
        URL: 'email-confirmation',
        response: `${status}:::false:false`,
        registrationType: '10',
      }),
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const res = yield call(emailSignupAbstractor.subscribeEmail, baseURI, relURI, params, method);
    yield put(emailSignupStatus({ subscription: res }));
  } catch (err) {
    console.log(err);
  }
}

export function* verifyEmail({ payload }) {
  try {
    const emailValidationState = yield call(emailSignupAbstractor.verifyEmail, payload);
    yield put(setEmailValidationStatus({ validEmail: emailValidationState }));
  } catch (err) {
    console.log(err);
  }
}

function* EmailSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT, subscribeEmail);
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL, verifyEmail);
}

export default EmailSignupSaga;
