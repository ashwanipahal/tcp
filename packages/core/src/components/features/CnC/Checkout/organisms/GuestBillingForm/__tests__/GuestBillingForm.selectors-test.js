import {
  getCardType,
  getSyncError,
  getPaymentMethodId,
} from '../container/GuestBillingForm.selectors';

describe('GuestBillingFormSelectors', () => {
  it('#getCardType', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {
            cardNumber: '41111111111',
          },
        },
      },
    };
    expect(getCardType(state)).toEqual('VISA');
  });
  it('#getCardType if no card number is entered', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {},
        },
      },
    };
    expect(getCardType(state)).toEqual(null);
  });
  it('#getSyncError', () => {
    const state = {
      form: {
        checkoutBilling: {
          syncErrors: {
            cardNumber: 'Please Enter valid card number',
          },
        },
      },
    };
    expect(getSyncError(state)).toEqual({
      syncError: {
        cardNumber: 'Please Enter valid card number',
      },
    });
  });
  it('#getPaymentMethodId', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {
            paymentMethodId: 'CreditCard',
          },
        },
      },
    };
    expect(getPaymentMethodId(state)).toEqual('CreditCard');
  });
});
