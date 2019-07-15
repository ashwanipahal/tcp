import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '@tcp/core/src/service/endpoint';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import EMAIL_SIGNUP_CONSTANTS from './SmsSignupModal.constants';
import { smsSignupStatus } from './SmsSignupModal.actions';

export function* subscribeSms({ payload }) {
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
    yield put(smsSignupStatus({ signupSuccess: res }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* SmsSignupSaga() {
  yield takeLatest(EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT, subscribeSms);
}

export default SmsSignupSaga;
