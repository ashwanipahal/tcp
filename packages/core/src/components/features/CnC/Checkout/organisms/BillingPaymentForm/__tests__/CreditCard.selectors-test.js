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

  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        checkout: { billing: {} },
      },
    };
    expect(CreditCardSelector.getCreditCardLabels(state)).toMatchObject({});
  });
  it('#getErrorMessages should return Labels', () => {
    const state = {
      Labels: {
        global: {},
      },
    };
    expect(getErrorMessages(state)).toMatchObject({});
  });

  it('#getCVVCodeInfoContentId should return content ID', () => {
    const state = {
      Labels: {
        checkout: {
          billing: {
            referred: [
              {
                name: 'cvv_info',
                contentId: '66b73859-0893-4abe-9d0d-dc3d58fa2782',
              },
            ],
          },
        },
      },
    };
    expect(CreditCardSelector.getCVVCodeInfoContentId(state)).toEqual(
      '66b73859-0893-4abe-9d0d-dc3d58fa2782'
    );
  });
  it('#getCVVContent should return selected note content', () => {
    expect(CreditCardSelector.getFormValidationErrorMessages).toBeDefined();
  });
});
