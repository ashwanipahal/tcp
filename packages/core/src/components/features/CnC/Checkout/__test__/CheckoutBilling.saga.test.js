import { call } from 'redux-saga/effects';
import submitBilling, {
  submitBillingData,
  submitVenmoBilling,
  updatePaymentInstruction,
  updateVenmoPaymentInstruction,
  getAddressData,
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

  it('submitVenmoBillingData Method', () => {
    const isMobileApp = () => false;
    const CheckoutReviewSaga = submitVenmoBilling({});
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(call(updateVenmoPaymentInstruction));
    expect(isMobileApp()).toBeFalsy();
  });

  it('getAddressData Method', () => {
    const CheckoutReviewSaga = getAddressData({ address: { onFileAddressKey: '12345' } });
    CheckoutReviewSaga.next();
    const shippingDetails = CheckoutReviewSaga.next().value;
    expect(shippingDetails.onFileAddressId).toEqual(undefined);
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

  it('updateVenmoPaymentInstruction Method', () => {
    const CheckoutReviewSaga = updateVenmoPaymentInstruction();
    const grandTotal = CheckoutReviewSaga.next(101).value; // select Grand Total
    CheckoutReviewSaga.next(); // select getShippingDestinationValues
    const isVenmoSaveSelected = CheckoutReviewSaga.next(false).value; // select isVenmoPaymentSaveSelected
    const venmoData = {
      nonce: 'fake-venmo-nonce-data',
      deviceData: 'venmoDeviceDataKey',
      details: { username: 'test-user' },
    };
    const response = CheckoutReviewSaga.next(venmoData).value; // select getVenmoData
    const requestData = {
      billingAddressId: '12345',
      cardType: 'VENMO',
      cc_brand: 'VENMO',
      cardNumber: 'test-user', // Venmo User Id, for all the scenario's it will have user information from the venmo, for dev, added test-user
      isDefault: 'false',
      orderGrandTotal: grandTotal,
      applyToOrder: true,
      monthExpire: '',
      yearExpire: '',
      setAsDefault: false,
      saveToAccount: false,
      venmoDetails: {
        userId: 'test-user',
        saveVenmoTokenIntoProfile: isVenmoSaveSelected,
        nonce: response.nonce,
        venmoDeviceData: response.deviceData,
      },
    };
    CheckoutReviewSaga.next(requestData);
    expect(CheckoutReviewSaga.next().done).toBeTruthy();
  });
});
