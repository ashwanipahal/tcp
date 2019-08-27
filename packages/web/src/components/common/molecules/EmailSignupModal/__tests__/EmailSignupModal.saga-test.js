import { put, takeLatest, call } from 'redux-saga/effects';
import { subscribeEmailAddress } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import EmailSignupSaga, { subscribeEmail, verifyEmail } from '../container/EmailSignupModal.saga';
import { setEmailValidationStatus } from '../container/EmailSignupModal.actions';
import EMAILSIGNUP_CONSTANTS from '../container/EmailSignupModal.constants';

describe('subscribeEmail', () => {
  let subscribeEmailGen;
  const email = 'abcd@gmail.com';
  const successString = 'success';
  beforeEach(() => {
    subscribeEmailGen = subscribeEmail(email, successString);
  });

  it('should dispatch subscribeEmail action for success resposnse', () => {
    const callDescriptor = subscribeEmailGen.next().value;
    expect(callDescriptor).toEqual(call(subscribeEmailAddress, email, successString));
  });
});

describe('verifyEmail', () => {
  let subscribeEmailGen;
  beforeEach(() => {
    subscribeEmailGen = verifyEmail({ payload: 'abcd@gmail.com' });
    subscribeEmailGen.next();
  });

  it('should dispatch verifyEmail action for success response', () => {
    const putDescriptor = subscribeEmailGen.next('valid').value;
    expect(putDescriptor).toEqual(put(setEmailValidationStatus({ validEmail: 'valid' })));
  });
});

describe('EmailSignupModalSaga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = EmailSignupSaga();
    const takeLatestDescriptor1 = generator.next().value;
    expect(takeLatestDescriptor1).toEqual(
      takeLatest(EMAILSIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT, subscribeEmail)
    );
    const takeLatestDescriptor2 = generator.next().value;
    expect(takeLatestDescriptor2).toEqual(
      takeLatest(EMAILSIGNUP_CONSTANTS.VALIDATE_EMAIL, verifyEmail)
    );
  });
});
