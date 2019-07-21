import { createSelector } from 'reselect';
import { formValueSelector, isPristine } from 'redux-form';
import { ADDEDITCREDITCARD_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import constants from './AddEditCreditCard.constants';
import { getCreditDebitCards } from '../../Payment/container/Payment.selectors';

const MONTH_SHORT_FORMAT = {
  JAN: 'Jan',
  FEB: 'Feb',
  MAR: 'Mar',
  APR: 'Apr',
  MAY: 'May',
  JUN: 'Jun',
  JUL: 'Jul',
  AUG: 'Aug',
  SEP: 'Sep',
  OCT: 'Oct',
  NOV: 'Nov',
  DEC: 'Dec',
};

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

export const getCreditCardExpirationOptionMap = () => {
  const expMonthOptionsMap = [
    { id: '', displayName: 'YYYY' },
    { id: '1', displayName: MONTH_SHORT_FORMAT.JAN },
    { id: '2', displayName: MONTH_SHORT_FORMAT.FEB },
    { id: '3', displayName: MONTH_SHORT_FORMAT.MAR },
    { id: '4', displayName: MONTH_SHORT_FORMAT.APR },
    { id: '5', displayName: MONTH_SHORT_FORMAT.MAY },
    { id: '6', displayName: MONTH_SHORT_FORMAT.JUN },
    { id: '7', displayName: MONTH_SHORT_FORMAT.JUL },
    { id: '8', displayName: MONTH_SHORT_FORMAT.AUG },
    { id: '9', displayName: MONTH_SHORT_FORMAT.SEP },
    { id: '10', displayName: MONTH_SHORT_FORMAT.OCT },
    { id: '11', displayName: MONTH_SHORT_FORMAT.NOV },
    { id: '12', displayName: MONTH_SHORT_FORMAT.DEC },
  ];

  const expYearOptionsMap = [];
  const nowYear = new Date().getFullYear();
  expYearOptionsMap.push({
    id: '',
    displayName: 'MMM',
  });
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }

  return {
    monthsMap: expMonthOptionsMap,
    yearsMap: expYearOptionsMap,
  };
};
