import CHECKOUT_SELECTORS, { getSendOrderUpdate } from '../container/Checkout.selector';

describe('Checkout Selectors', () => {
  const FormState = {
    checkoutShipping: {
      values: {
        smsSignUp: { sendOrderUpdate: true, phoneNumber: 2012345678 },
        shipmentMethods: { shippingMethodId: '123' },
        saveToAddressBook: true,
        onFileAddressKey: '3456',
        address: {
          addressId: '56789',
          phoneNumber: 2012345678,
        },
        defaultShipping: true,
      },
    },
    checkoutPickup: {
      values: {
        pickUpContact: { phoneNumber: 2012345678 },
        smsSignUp: { sendOrderUpdate: true, phoneNumber: 2012345678 },
      },
    },
  };
  it('#getAddressPhoneNo', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getAddressPhoneNo(state)).toEqual(2012345678);
  });
  it('#getDefaultShipping', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getDefaultShipping(state)).toEqual(true);
  });
  it('#getSendOrderUpdate', () => {
    const state = {
      form: FormState,
    };
    expect(getSendOrderUpdate(state)).toEqual(true);
  });
  it('#getSmsNumberForOrderUpdates', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getSmsNumberForOrderUpdates(state)).toEqual(2012345678);
  });
  it('#getCurrentPickupFormNumber', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getCurrentPickupFormNumber(state)).toEqual(2012345678);
  });
});
