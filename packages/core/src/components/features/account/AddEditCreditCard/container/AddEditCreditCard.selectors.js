import { createSelector } from 'reselect';
import { formValueSelector, isPristine } from 'redux-form';
import { ADDEDITCREDITCARD_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import constants from './AddEditCreditCard.constants';
import { getCreditDebitCards } from '../../Payment/container/Payment.selectors';

export const getAddEditCreditCardResponse = state => {
  return state[ADDEDITCREDITCARD_REDUCER_KEY];
};

export const getAddEditCreditCardSuccess = createSelector(
  getAddEditCreditCardResponse,
  resp => resp && resp.get('response')
);

export const getAddEditCreditCardError = createSelector(
  getAddEditCreditCardResponse,
  resp => resp && resp.get('errorMessage')
);

export const getCardNumber = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'cardNumber');
};

export const getCreditCardId = (state, props) => {
  return (props.router && props.router.query && props.router.query.creditCardId) || false;
};

export const getCreditCardById = createSelector(
  [getCreditDebitCards, getCreditCardId],
  (creditCardList, creditCardId) => {
    return creditCardId
      ? creditCardList.find(card => card.creditCardId.toString() === creditCardId)
      : null;
  }
);

export const getOnFileAddressKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileAddressKey');
};

export const checkIfFormPristine = state => isPristine(constants.FORM_NAME)(state);

export const getCardType = createSelector(
  [getCardNumber, getCreditCardById, checkIfFormPristine],
  (formCardNumber, creditCard, isFormPristine) => {
    const cardNumber = isFormPristine ? creditCard && creditCard.accountNo : formCardNumber;
    if ((cardNumber || '').length === 0) {
      return null;
    }

    // look up based on cardNumber
    const type = Object.keys(constants.CREDIT_CARDS_BIN_RANGES).filter(range => {
      const rangeCount = constants.CREDIT_CARDS_BIN_RANGES[range].length;
      for (let i = 0; i < rangeCount; i += i + 1) {
        const { from, to } = constants.CREDIT_CARDS_BIN_RANGES[range][i];
        const prefixLength = from.toString().length;
        const prefix = cardNumber.substr(0, prefixLength);

        if (prefix >= from && prefix <= to) {
          return true;
        }
      }
      return false;
    });

    if (type.length > 0) {
      return constants.ACCEPTED_CREDIT_CARDS[type[0]];
    }

    const cardType = creditCard ? creditCard.ccBrand || creditCard.ccType : null;

    if (cardNumber.substr(0, 1) === '*' && cardType) {
      // if not editing
      return cardType.toUpperCase();
    }

    return null;
  }
);
