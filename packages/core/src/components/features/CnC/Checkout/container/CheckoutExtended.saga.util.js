import { call, put, select } from 'redux-saga/effects';
import { isGymboree, isCanada } from '@tcp/core/src/utils/utils';
import logger from '../../../../../utils/loggerInstance';
import { isGuest } from './Checkout.selector';
import emailSignupAbstractor from '../../../../../services/abstractors/common/EmailSmsSignup/EmailSmsSignup';
import { emailSignupStatus } from './Checkout.action';
import constants from '../Checkout.constants';
import briteVerifyStatusExtraction from '../../../../../services/abstractors/common/briteVerifyStatusExtraction';

export function* subscribeEmailAddress(emailObj, status, field1) {
  const { payload } = emailObj;
  let brandGYM = !!(isGymboree() || payload.isEmailOptInSecondBrand);
  let brandTCP = !!(!isGymboree() || payload.isEmailOptInSecondBrand);
  if (payload.source === 'checkout') {
    const { brandGYM: GYM, brandTCP: TCP } = payload;
    brandGYM = GYM;
    brandTCP = TCP;
  }

  try {
    const payloadObject = {
      emailaddr: payload.signup,
      URL: 'email-confirmation',
      response: `${status}:::false:false`,
      registrationType: constants.EMAIL_REGISTRATION_TYPE_CONSTANT,
      brandTCP,
      brandGYM,
    };

    if (field1) {
      payloadObject.field1 = field1;
    }

    const res = yield call(emailSignupAbstractor.subscribeEmail, payloadObject);
    yield put(emailSignupStatus({ subscription: res }));
  } catch (err) {
    logger.error(err);
  }
}

export function* validateAndSubmitEmailSignup(emailAddress, field1, brandTCP, brandGYM) {
  if (emailAddress) {
    const statusCode = call(briteVerifyStatusExtraction, emailAddress);
    yield subscribeEmailAddress(
      { payload: { signup: emailAddress, source: 'checkout', brandGYM, brandTCP } },
      statusCode,
      field1
    );
  }
}

export function* submitEmailSignup(emailAddress, formData) {
  const isGuestUser = yield select(isGuest);
  const isCaSite = yield call(isCanada);
  if (
    isGuestUser &&
    isCaSite &&
    emailAddress &&
    (formData.emailSignUpTCP || formData.emailSignUpGYM)
  ) {
    yield validateAndSubmitEmailSignup(
      emailAddress,
      undefined,
      formData.emailSignUpTCP,
      formData.emailSignUpGYM
    );
  }
}
