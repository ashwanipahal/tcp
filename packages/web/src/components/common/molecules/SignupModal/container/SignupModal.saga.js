import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '@tcp/core/src/service/endpoint';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/SignupModal';
import EMAIL_SIGNUP_CONSTANTS from './SignupModal.constants';
import {
  emailSignupStatus,
  setEmailValidationStatus,
  smsSignupStatus,
} from './SignupModal.actions';

function* subscribeEmail(email, status) {
  console.log('in generator function');
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
    const res = yield call(emailSignupAbstractor.subscribeEmail, baseURI, relURI, params, method);
    console.log('res', res);
    yield put(emailSignupStatus({ signupSuccess: res }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* subscribeSms({ payload }) {
  console.log('in generator function subscribeSms');
  try {
    const { baseURI, relURI, method } = endpoints.addSmsSignup;
    const params = {
      payload: JSON.stringify({
        acquisition_id: 'ikhNl0Te', // TODO - change the acquisition id as per env
        mobile_phone: {
          mdn: payload.replace(/\D/g, ''),
        },
        custom_fields: {
          src_cd: '1',
          sub_src_cd: 'sms_footer',
        },
      }),
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const res = yield call(emailSignupAbstractor.subscribeSms, baseURI, relURI, params, method);
    console.log('res', res);
    yield put(smsSignupStatus({ signupSuccess: res }));
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
      emailSignupAbstractor.verifyEmail,
      baseURI,
      newRelURI,
      params,
      method
    );
    yield put(setEmailValidationStatus({ validEmail: isEmailValid }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* EmailSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT, subscribeEmail);
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL, verifyEmail);
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT, subscribeSms);
}

export default EmailSignupSaga;
