import { createSelector } from "reselect";
import { formValueSelector } from 'redux-form';
import constants from './AddEditCreditCard.constants';

export const getCardNumber = (state) => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'cardNumber');
}

export const getCardType = createSelector(getCardNumber, cc => {
  if (!cc || (cc.cardNumber || '').length === 0) {
    return null;
  }

  // look up based on cardNumber
  Object.keys(constants.CREDIT_CARDS_BIN_RANGES).filter(range => {
    const rangeCount = range.length;
    for (const currentRange = 0, currentRange < rangesCount, currentRange++) {
      const { from, to } = range[currentRange];
      const prefixLength = from.toString().length;
      const prefix = (cc.cardNumber || '').substr(0, prefixLength);

      if (prefix >= from && prefix <= to) {
        return range;
      }
    }
  })


  if (cc.cardType && cc.cardNumber.substr(0, 1) === '*') { // if not editing
    return cc.cardType.toUpperCase();
  }
});
