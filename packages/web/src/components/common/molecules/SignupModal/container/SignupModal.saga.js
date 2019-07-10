import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '@tcp/core/src/service/endpoint';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/SignupModal';
import EMAIL_SIGNUP_CONSTANTS from './SignupModal.constants';
import { validateEmail, emailSignupStatus } from './SignupModal.actions';

function* subscribeEmail(email, status) {
  try {
    const { baseURI, relURI, method } = endpoints.addEmailSignup;
    const params = {
      payload: JSON.stringify({
        storeId: 10151,
        catalogId: 10551,
        langId: '-1',
        emailaddr: email,
        URL: 'email-confirmation',
        response: `${status}:::false:false`,
        registrationType: '10',
      }),
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const res = yield call(emailSignupAbstractor.getData, { baseURI, relURI, params, method });
    if (res.body.redirecturl.indexOf('/email-confirmation') !== -1) {
      yield put(emailSignupStatus({ signupSuccess: true }));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* verifyEmail({ payload }) {
  try {
    const { baseURI, relURI, method } = endpoints.emailVerfication;
    const newRelURI = `${relURI}&address=${payload}`;
    const params = {};
    const isEmailValid = yield call(
      emailSignupAbstractor.verifyData,
      baseURI,
      newRelURI,
      params,
      method
    );
    yield put(validateEmail({ validEmail: isEmailValid }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* EmailSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_STATUS, subscribeEmail);
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.EMAIL_VALIDATION_STATUS, verifyEmail);
}

export default EmailSignupSaga;
