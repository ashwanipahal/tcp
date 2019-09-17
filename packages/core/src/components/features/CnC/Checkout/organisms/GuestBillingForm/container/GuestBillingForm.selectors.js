import { formValueSelector, getFormSyncErrors } from 'redux-form';
import { createSelector } from 'reselect';
import CARD_RANGES from '../../../../../account/AddEditCreditCard/container/AddEditCreditCard.constants';

const getCardNumber = state => {
  const selector = formValueSelector('checkoutBilling');
  return selector(state, 'cardNumber');
};

const getCardType = createSelector(
  [getCardNumber],
  formCardNumber => {
    if ((formCardNumber || '').length === 0) {
      return null;
    }
    const cardNumber = formCardNumber;
    // look up based on cardNumber
    const type = Object.keys(CARD_RANGES.CREDIT_CARDS_BIN_RANGES).filter(range => {
      const rangeCount = CARD_RANGES.CREDIT_CARDS_BIN_RANGES[range].length;
      for (let i = 0; i < rangeCount; i += 1) {
        const { from, to } = CARD_RANGES.CREDIT_CARDS_BIN_RANGES[range][i];
        const prefixLength = from.toString().length;
        const prefix = cardNumber.substr(0, prefixLength);

        if (prefix >= from && prefix <= to) {
          return true;
        }
      }
      return false;
    });

    if (type.length > 0) {
      return CARD_RANGES.ACCEPTED_CREDIT_CARDS[type[0]];
    }

    return null;
  }
);

const getSyncError = state => {
  return {
    syncError: getFormSyncErrors('checkoutBilling')(state),
  };
};

const getPaymentMethodId = state => {
  const selector = formValueSelector('checkoutBilling');
  return selector(state, 'paymentMethodId');
};

export { getCardType, getSyncError, getPaymentMethodId };
