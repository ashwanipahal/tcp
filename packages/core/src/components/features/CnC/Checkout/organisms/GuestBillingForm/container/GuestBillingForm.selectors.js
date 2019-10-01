import { formValueSelector, getFormSyncErrors } from 'redux-form';
import { createSelector } from 'reselect';
import CARD_RANGES from '../../../../../account/AddEditCreditCard/container/AddEditCreditCard.constants';
import CheckoutSelectors from '../../../container/Checkout.selector';

const { getBillingValues } = CheckoutSelectors;

const getCardNumber = state => {
  const selector = formValueSelector('checkoutBilling');
  return selector(state, 'cardNumber');
};

const getCardType = createSelector(
  [getCardNumber, getBillingValues],
  (formCardNumber, billingData) => {
    if ((formCardNumber || '').length === 0) {
      return null;
    }
    const cardNumber = formCardNumber;
    if (cardNumber.startsWith('*') && billingData && billingData.billing) {
      const {
        billing: { cardType },
      } = billingData;
      return cardType;
    }
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

const getSameAsShippingValue = state => {
  const selector = formValueSelector('checkoutBilling');
  return selector(state, 'sameAsShipping');
};

export { getCardType, getSyncError, getPaymentMethodId, getSameAsShippingValue };
