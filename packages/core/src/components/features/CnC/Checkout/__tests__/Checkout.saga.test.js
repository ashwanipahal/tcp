import { put } from 'redux-saga/effects';
import CHECKOUT_ACTIONS from '../container/Checkout.action';

import { handleServerSideErrorAPI } from '../container/Checkout.saga.util';
import {
  submitEmailSignup,
  validateAndSubmitEmailSignup,
} from '../container/CheckoutExtended.saga.util';

describe('CheckoutBilling saga', () => {
  it('handleServerSideErrorAPI', () => {
    const CheckoutSaga = handleServerSideErrorAPI({ response: { body: { errors: [] } } });
    CheckoutSaga.next();
    const putDescriptor = CheckoutSaga.next({}).value;
    expect(putDescriptor).toEqual(
      put(CHECKOUT_ACTIONS.setServerErrorCheckout({ errorMessage: undefined, component: 'PAGE' }))
    );
  });
});

describe('EmailSignup', () => {
  it('submitEmailSignup', () => {
    const emailAddress = 'test@123.com';
    const submitEmailSignupSaga = submitEmailSignup(emailAddress, {
      emailSignUpTCP: true,
      emailSignUpGYM: false,
    });
    submitEmailSignupSaga.next();
    submitEmailSignupSaga.next(true);
    expect(submitEmailSignupSaga.next(true).value).toEqual(
      validateAndSubmitEmailSignup(emailAddress, undefined, true, false)
    );
  });
});
