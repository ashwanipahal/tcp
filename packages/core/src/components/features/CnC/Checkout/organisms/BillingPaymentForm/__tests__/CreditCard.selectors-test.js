import { fromJS } from 'immutable';
import constants from '../container/CreditCard.constants';
import CreditCardSelector, { getErrorMessages } from '../container/CreditCard.selectors';

describe('Credit Card selectors', () => {
  it('getCardNumber should return current cardNumber', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: {
            onFileCardKey: '12345',
          },
        },
      },
    };
    expect(CreditCardSelector.getOnFileCardKey(state)).toEqual(
      state.form[constants.FORM_NAME].values.onFileCardKey
    );
  });

  it('getCardNumber should return ', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: {
            paymentMethodId: '12345',
          },
        },
      },
    };
    expect(CreditCardSelector.getPaymentMethodId(state)).toEqual(
      state.form[constants.FORM_NAME].values.paymentMethodId
    );
  });
  it('#getErrorMessages should return Labels', () => {
    const state = {
      Labels: {
        global: {},
      },
    };
    expect(getErrorMessages(state)).toMatchObject({});
  });
  it('#getCardType if no previous billing info is present', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
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
    expect(CreditCardSelector.getCardType(state)).toEqual('VISA');
  });
  it('#getCardType if previous billing info is present and form field is null', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
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
    expect(CreditCardSelector.getCardType(state)).toEqual(null);
  });
  it('#getCardType if no card number is entered', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
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
    expect(CreditCardSelector.getCardType(state)).toEqual(null);
  });
  it('#getCVVContent should return selected note content', () => {
    expect(CreditCardSelector.getFormValidationErrorMessages).toBeDefined();
  });
  it('#getSyncError', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          syncErrors: {
            cardNumber: 'Please Enter valid card number',
          },
        },
      },
    };
    expect(CreditCardSelector.getSyncError(state)).toEqual({
      syncError: {
        cardNumber: 'Please Enter valid card number',
      },
    });
  });
  it('#getSameAsShippingValue', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: { sameAsShipping: true },
        },
      },
    };
    expect(CreditCardSelector.getSameAsShippingValue(state)).toEqual(true);
  });
  it('#getSaveToAccountValue', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: { saveToAccount: true },
        },
      },
    };
    expect(CreditCardSelector.getSaveToAccountValue(state)).toEqual(true);
  });
  it('#getShippingOnFileAddressKey', () => {
    const state = {
      Checkout: fromJS({
        values: {
          shipping: {
            onFileAddressKey: 'asdf',
          },
        },
      }),
      User: fromJS({ personalData: {} }),
    };
    expect(CreditCardSelector.getShippingOnFileAddressKey(state)).toEqual('asdf');
  });
  it('#getShippingOnFileAddressId', () => {
    const state = {
      Checkout: fromJS({
        values: {
          shipping: {
            onFileAddressId: 'asdf',
          },
        },
      }),
      User: fromJS({ personalData: {} }),
    };
    expect(CreditCardSelector.getShippingOnFileAddressId(state)).toEqual('asdf');
  });
  it('#getSelectedOnFileAddressId', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: { onFileAddressId: 'asdfg' },
        },
      },
    };
    expect(CreditCardSelector.getSelectedOnFileAddressId(state)).toEqual('asdfg');
  });
});
