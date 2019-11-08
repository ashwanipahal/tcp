import { call, put } from 'redux-saga/effects';
// eslint-disable-next-line import/no-unresolved
import submitBilling, {
  submitBillingData,
  submitVenmoBilling,
  updatePaymentInstruction,
  updateVenmoPaymentInstruction,
  getAddressData,
  addressIdToString,
} from '../container/CheckoutBilling.saga';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import { isMobileApp } from '../../../../../utils';
import CONSTANTS from '../Checkout.constants';
import { getSetIsBillingVisitedActn } from '../container/Checkout.action';
import { getCardList } from '../../../account/Payment/container/Payment.saga';
// import utility from '../util/utility';

describe('CheckoutBilling saga', () => {
  it('CheckoutBilling', () => {
    const CheckoutReviewSaga = submitBilling({ payload: { address: {} } });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();

    CheckoutReviewSaga.next(false);
    expect(CheckoutReviewSaga.next(false).value).toEqual(call(getAddressList));
    expect(CheckoutReviewSaga.next().value).toEqual(call(getCardList));
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
        {}
      )
    );
    expect(CheckoutReviewSaga.next(false).value).toEqual(put(getSetIsBillingVisitedActn(true)));
  });

  it('submitBillingData with CardId', () => {
    const CheckoutReviewSaga = submitBillingData(
      { address: { sameAsShipping: false }, onFileCardId: '21331232' },
      { addressKey: '12345', addressId: '12345', billingAddressId: '54321' }
    );
    CheckoutReviewSaga.next(); // select isGuest
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ onFileAddressKey: '234' });
    expect(CheckoutReviewSaga.next(false).value).not.toEqual(undefined);
  });

  it('submitBillingData with onFileAddressKey and not guest user', () => {
    const CheckoutReviewSaga = submitBillingData(
      { address: { sameAsShipping: false, onFileAddressKey: '54321' } },
      { addressKey: '12345', addressId: '12345', billingAddressId: '54321' }
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ onFileAddressKey: '234' });
    expect(CheckoutReviewSaga.next(false).value).not.toEqual(undefined);
  });

  it('submitVenmoBilling Method', () => {
    const CheckoutReviewSaga = submitVenmoBilling({});
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(call(updateVenmoPaymentInstruction));
    const navigate = jest.fn();
    const navigation = {
      navigate,
    };
    const routeToPage = jest.fn();
    const utility = { routeToPage };
    const spyUtility = jest.spyOn(utility, 'routeToPage');
    if (!isMobileApp()) {
      expect(spyUtility).not.toBeCalled();
    } else if (navigation) {
      expect(navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_REVIEW)).toBeCalled();
    }
  });

  it('getAddressData Method', () => {
    const CheckoutReviewSaga = getAddressData({ address: { onFileAddressKey: '12345' } });
    CheckoutReviewSaga.next();
    const shippingDetails = CheckoutReviewSaga.next().value;
    expect(shippingDetails.onFileAddressId).toEqual(undefined);
  });

  it('addressIdToString Method', () => {
    const addressIdMethod = addressIdToString(12345);
    expect(addressIdMethod).toEqual('12345');
  });

  it('addressIdToString Method without address', () => {
    const addressIdMethod = addressIdToString();
    expect(addressIdMethod).toEqual(null);
  });

  it('updatePaymentInstruction with first variation', () => {
    const func = () => {};
    const CheckoutReviewSaga = updatePaymentInstruction(
      { address: { sameAsShipping: true }, cardNumber: '1234' },
      undefined,
      undefined,
      {},
      func
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ billing: {}, paymentId: '123' });
    CheckoutReviewSaga.next();

    CheckoutReviewSaga.next({ body: {} });
    expect(CheckoutReviewSaga.next(false).value).toEqual(undefined);
  });

  it('updatePaymentInstruction with second variation', () => {
    const func = () => {};
    const CheckoutReviewSaga = updatePaymentInstruction(
      { address: { sameAsShipping: true }, cardNumber: '1234' },
      undefined,
      undefined,
      {},
      func
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ billing: {} });
    CheckoutReviewSaga.next();

    expect(CheckoutReviewSaga.next(false).value).toEqual(undefined);
  });

  it('updatePaymentInstruction with third variation', () => {
    const func = () => {};
    const CheckoutReviewSaga = updatePaymentInstruction(
      {
        address: { sameAsShipping: true },
        cardNumber: '1234',
        onFileCardId: '243434',
        accountNo: '232322',
        cvv: 323,
        monthExpire: '',
        yearExpire: '',
        setAsDefault: false,
        saveToAccount: false,
      },
      { accountNo: '232322', billingAddressId: '43423423', ccBrand: 'VISA' },
      undefined,
      {},
      func
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next({ billing: {}, paymentId: '123' });
    expect(CheckoutReviewSaga.next(false).value).not.toEqual(undefined);
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
    CheckoutReviewSaga.next();
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
