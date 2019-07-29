import {
  ADDEDITCREDITCARD_REDUCER_KEY,
  PAYMENT_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import { fromJS, List } from 'immutable';
import constants from '../AddEditCreditCard.constants';
import {
  getAddEditCreditCardSuccess,
  getAddEditCreditCardError,
  getCardNumber,
  getCreditCardId,
  getCreditCardById,
  getOnFileAddressKey,
  getCardType,
} from '../AddEditCreditCard.selectors';

describe('AddEditCreditCard selectors', () => {
  it('getAddEditCreditCardSuccess should return response if available', () => {
    const state = {
      [ADDEDITCREDITCARD_REDUCER_KEY]: fromJS({
        response: {
          creditCardId: '12345',
        },
      }),
    };

    expect(getAddEditCreditCardSuccess(state)).toEqual(
      state[ADDEDITCREDITCARD_REDUCER_KEY].get('response')
    );
  });

  it('getAddEditCreditCardError should return errorMessage if available', () => {
    const state = {
      [ADDEDITCREDITCARD_REDUCER_KEY]: fromJS({
        errorMessage: 'error Message',
      }),
    };

    expect(getAddEditCreditCardError(state)).toEqual(
      state[ADDEDITCREDITCARD_REDUCER_KEY].get('errorMessage')
    );
  });

  it('getCreditCardId should return creditCardId from the route props', () => {
    const state = {};
    const props = {
      router: {
        query: {
          creditCardId: '12345',
        },
      },
    };

    expect(getCreditCardId(state, props)).toEqual('12345');
  });

  it('getCreditCardId should return null if creditCardId is not available', () => {
    const state = {};
    const props = {
      router: {
        query: {},
      },
    };

    expect(getCreditCardId(state, props)).toBeFalsy();
  });

  it('getCardNumber should return current cardNumber', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: {
            cardNumber: '12345',
          },
        },
      },
    };

    expect(getCardNumber(state)).toEqual(state.form[constants.FORM_NAME].values.cardNumber);
  });

  it('getOnFileAddressKey should return current onFileAddressKey', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          values: {
            onFileAddressKey: '12345',
          },
        },
      },
    };

    expect(getOnFileAddressKey(state)).toEqual(
      state.form[constants.FORM_NAME].values.onFileAddressKey
    );
  });

  it('getCreditCardById should return creditCard object based on the creditCardId', () => {
    const state = {
      [PAYMENT_REDUCER_KEY]: fromJS({
        cardList: null,
      }),
    };

    const props = {
      router: {
        query: {
          creditCardId: '1111',
        },
      },
    };
    state[PAYMENT_REDUCER_KEY] = state[PAYMENT_REDUCER_KEY].set(
      'cardList',
      List([
        {
          creditCardId: '1111',
          ccType: 'COMPASSVISA',
        },
      ])
    );

    expect(getCreditCardById(state, props)).toEqual({
      creditCardId: '1111',
      ccType: 'COMPASSVISA',
    });
  });

  it('getCreditCardById should return null if creditCard Id is not present', () => {
    const state = {
      [PAYMENT_REDUCER_KEY]: fromJS({
        cardList: null,
      }),
    };

    const props = {
      router: {
        query: {},
      },
    };
    state[PAYMENT_REDUCER_KEY] = state[PAYMENT_REDUCER_KEY].set(
      'cardList',
      List([
        {
          creditCardId: '1111',
          ccType: 'COMPASSVISA',
        },
      ])
    );

    expect(getCreditCardById(state, props)).toBeNull();
  });

  describe('#getCardType', () => {
    const state = {
      form: {
        [constants.FORM_NAME]: {
          anyTouched: true,
          values: {
            cardNumber: '411111111111',
          },
        },
      },
      [PAYMENT_REDUCER_KEY]: fromJS({
        cardList: null,
      }),
    };
    state[PAYMENT_REDUCER_KEY] = state[PAYMENT_REDUCER_KEY].set(
      'cardList',
      List([
        {
          creditCardId: '1111',
          ccType: 'COMPASSVISA',
          ccBrand: 'mc',
        },
      ])
    );
    const props = {
      router: {
        query: {
          creditCardId: '1111',
        },
      },
    };
    it('should return VISA if condition matched', () => {
      expect(getCardType(state, props)).toEqual('VISA');
    });

    it('should return null if card number is empty', () => {
      const updatedState = Object.assign({}, state, {
        form: {
          [constants.FORM_NAME]: {
            anyTouched: true,
            values: {
              cardNumber: '',
            },
          },
        },
      });
      expect(getCardType(updatedState, props)).toBeNull();
    });

    it('should return existing cardType in case of editing', () => {
      state.form[constants.FORM_NAME].values.cardNumber = '************121';
      expect(getCardType(state, props)).toEqual('MC');
    });
  });
});
