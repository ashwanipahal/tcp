import { call, select, put } from 'redux-saga/effects';
import {
  submitShippingSectionData,
  submitVerifiedAddressData,
} from '../container/CheckoutShipping.saga';
import { isCanada } from '../../../../../utils/utils';
import { setShippingLoadingState } from '../container/Checkout.action';

describe('CheckoutShipping saga', () => {
  it('CheckoutShipping', () => {
    const CheckoutShippingSaga = submitShippingSectionData(
      {
        payload: { method: {}, smsInfo: {}, shipTo: {} },
      },
      () => {}
    );
    CheckoutShippingSaga.next();
    expect(CheckoutShippingSaga.next().value).toEqual(select(isCanada));
    CheckoutShippingSaga.next();
    CheckoutShippingSaga.next(false);
    CheckoutShippingSaga.next();

    CheckoutShippingSaga.next();
    CheckoutShippingSaga.next();
    CheckoutShippingSaga.next();
    CheckoutShippingSaga.next(true);
    expect(CheckoutShippingSaga.next(false).value).toEqual(put(setShippingLoadingState(false)));
  });

  it('CheckoutShipping submitVerifiedAddressData', () => {
    const callBack = () => {};
    const CheckoutShippingSaga = submitVerifiedAddressData(
      {
        payload: { submitData: { shipTo: {} }, shippingAddress: {} },
      },
      callBack
    );
    expect(CheckoutShippingSaga.next().value).toEqual(
      call(
        submitShippingSectionData,
        {
          payload: {
            shipTo: {
              address: {
                addressLine1: undefined,
                addressLine2: undefined,
                zipCode: undefined,
              },
              phoneNumber: undefined,
            },
          },
        },
        callBack
      )
    );
  });
});
