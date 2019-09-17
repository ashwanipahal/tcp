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
  it('#getCVVContent should return selected note content', () => {
    expect(CreditCardSelector.getFormValidationErrorMessages).toBeDefined();
  });
});
