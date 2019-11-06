import { put } from 'redux-saga/effects';
import CHECKOUT_ACTIONS from '../container/Checkout.action';

import { handleServerSideErrorAPI } from '../container/Checkout.saga';

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
