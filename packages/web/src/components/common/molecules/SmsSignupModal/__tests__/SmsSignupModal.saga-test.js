import { put, takeLatest } from 'redux-saga/effects';
import SmsSignupSaga, { subscribeSms } from '../container/SmsSignupModal.saga';
import { smsSignupStatus } from '../container/SmsSignupModal.actions';
import SMSSIGNUP_CONSTANTS from '../container/SmsSignupModal.constants';

describe('subscribeSms', () => {
  let subscribeSmsGen;
  beforeEach(() => {
    subscribeSmsGen = subscribeSms({ payload: '64545645455' });
    subscribeSmsGen.next();
  });

  it('should dispatch subscribeSms action for success resposnse', () => {
    const putDescriptor = subscribeSmsGen.next(true).value;
    expect(putDescriptor).toEqual(put(smsSignupStatus({ subscription: true })));
  });
});

describe('SmsSignupModalSaga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = SmsSignupSaga();
    const takeLatestDescriptor1 = generator.next().value;
    expect(takeLatestDescriptor1).toEqual(
      takeLatest(SMSSIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT, subscribeSms)
    );
  });
});
