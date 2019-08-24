import {
  getSmsSignUpFields,
  getSendOrderUpdate,
  getShippingLabels,
  getSmsSignUpLabels,
  getAddressFields,
  getAddressPhoneNo,
} from '../ShippingPage.selectors';

describe('#Shipping Page Selectors', () => {
  it('#getShippingLabels', () => {
    const LabelsState = {
      checkout: {
        shipping: {
          lbl_shipping_header: 'shipping',
          lbl_shipping_sectionHeader: 'shipping details',
        },
      },
    };
    const state = {
      Labels: LabelsState,
    };
    expect(getShippingLabels(state)).toEqual({
      header: 'shipping',
      sectionHeader: 'shipping details',
    });
  });

  it('#getSmsSignUpLabels', () => {
    const LabelsState = {
      global: {
        smsSignup: {
          lbl_smsSignup_smsSignupText: 'smsSignupText',
          lbl_smsSignup_privacyPolicy: 'privacyPolicy',
          lbl_smsSignup_orderUpdates: 'order updates',
        },
      },
    };
    const state = {
      Labels: LabelsState,
    };
    expect(getSmsSignUpLabels(state)).toEqual({
      smsSignupText: 'smsSignupText',
      privacyPolicy: 'privacyPolicy',
      orderUpdates: 'order updates',
    });
  });

  it('#getSmsSignUpFields', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            smsSignUp: {
              sendOrderUpdate: false,
            },
          },
        },
      },
    };

    expect(getSmsSignUpFields(state)).toEqual(state.form.checkoutShipping.values.smsSignUp);
  });

  it('#getAddressFields', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            address: {
              phoneNumber: 12324,
            },
          },
        },
      },
    };

    expect(getAddressFields(state)).toEqual(state.form.checkoutShipping.values.address);
  });

  it('#getSendOrderUpdate', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            smsSignUp: {
              sendOrderUpdate: false,
            },
          },
        },
      },
    };

    expect(getSendOrderUpdate(state)).toEqual(false);
  });
  it('#getAddressPhoneNo', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            address: {
              phoneNumber: 12324,
            },
          },
        },
      },
    };

    expect(getAddressPhoneNo(state)).toEqual(12324);
  });
});
