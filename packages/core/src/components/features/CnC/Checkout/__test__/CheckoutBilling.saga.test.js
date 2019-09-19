import { call } from 'redux-saga/effects';
import submitBilling, {
  submitBillingData,
  updatePaymentInstruction,
} from '../container/CheckoutBilling.saga';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';

describe('CheckoutBilling saga', () => {
  it('CheckoutBilling', () => {
    const CheckoutReviewSaga = submitBilling({ payload: { address: {} } });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();

    expect(CheckoutReviewSaga.next(false).value).toEqual(
      call(
        submitBillingData,
        { address: {}, phoneNumber: '' },
        {
          address1: undefined,
          address2: undefined,
          city: undefined,
          country: undefined,
          firstName: undefined,
          lastName: undefined,
          state: undefined,
          zip: undefined,
        },
        undefined
      )
    );
    expect(CheckoutReviewSaga.next(false).value).toEqual(call(getAddressList));
  });
  it('submitBillingData', () => {
    const CheckoutReviewSaga = submitBillingData({ address: { sameAsShipping: true } }, {});
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ onFileAddressKey: '234' });

    expect(CheckoutReviewSaga.next({ body: {} }).value).toEqual(
      call(
        updatePaymentInstruction,
        { address: { sameAsShipping: true } },
        undefined,
        undefined,
        {},
        undefined
      )
    );
    expect(CheckoutReviewSaga.next(false).value).toEqual(undefined);
  });
  it('updatePaymentInstruction', () => {
    const func = () => {};
    const CheckoutReviewSaga = updatePaymentInstruction(
      { address: { sameAsShipping: true }, cardNumber: '1234' },
      undefined,
      undefined,
      {},
      func
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ billing: {}, paymentId: '123' });
    CheckoutReviewSaga.next();

    expect(CheckoutReviewSaga.next({ body: {} }).value).toEqual(
      call(func, false, true, true, false, false)
    );
    expect(CheckoutReviewSaga.next(false).value).toEqual(undefined);
  });
  it('updatePaymentInstruction', () => {
    const func = () => {};
    const CheckoutReviewSaga = updatePaymentInstruction(
      { address: { sameAsShipping: true }, cardNumber: '1234' },
      undefined,
      undefined,
      {},
      func
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ billing: {} });
    CheckoutReviewSaga.next();

    expect(CheckoutReviewSaga.next({ body: {} }).value).toEqual(
      call(func, false, true, true, false, false)
    );
    expect(CheckoutReviewSaga.next(false).value).toEqual(undefined);
  });
});
