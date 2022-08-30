import {
  getCardType,
  getSyncError,
  getPaymentMethodId,
  getSameAsShippingValue,
} from '../container/GuestBillingForm.selectors';
import { fromJS } from '../../../../../../../../../../node_modules/immutable';

describe('GuestBillingFormSelectors', () => {
  it('#getCardType if no previous billing info is present', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {
            cardNumber: '41111111111',
          },
        },
      },
      Checkout: fromJS({
        values: {
          billing: {},
        },
      }),
    };
    expect(getCardType(state)).toEqual('VISA');
  });
  it('#getCardType if previous billing info is present and form field is null', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {
            cardNumber: '',
          },
        },
      },
      Checkout: fromJS({
        values: {
          billing: {
            cardNumber: '******11111',
            cardType: 'VISA',
          },
        },
      }),
    };
    expect(getCardType(state)).toEqual(null);
  });
  it('#getCardType if no card number is entered', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {},
        },
      },
      Checkout: fromJS({
        values: {
          billing: {
            cardNumber: '******11111',
            cardType: 'VISA',
          },
        },
      }),
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
  it('#getPaymentMethodId', () => {
    const state = {
      form: {
        checkoutBilling: {
          values: {
            sameAsShipping: true,
          },
        },
      },
    };
    expect(getSameAsShippingValue(state)).toEqual(true);
  });
});
