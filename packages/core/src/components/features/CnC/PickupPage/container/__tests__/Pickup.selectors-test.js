import {
  getSendOrderUpdate,
  getSmsSignUpLabels,
  getAlternateFormFields,
} from '../Pickup.selectors';

describe('#pickup Page Selectors', () => {
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

  it('#getAlternateFormFields', () => {
    const state = {
      form: {
        checkoutPickup: {
          values: {
            pickUpAlternate: {
              hasAlternatePickup: false,
            },
          },
        },
      },
    };

    expect(getAlternateFormFields(state)).toEqual(state.form.checkoutPickup.values.pickUpAlternate);
  });
  it('#getSendOrderUpdate', () => {
    const state = {
      form: {
        checkoutPickup: {
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
});
