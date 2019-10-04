import { formValueSelector, getFormSyncErrors } from 'redux-form';
import { createSelector } from 'reselect';
import constants from './CreditCard.constants';
import CARD_RANGES from '../../../../../account/AddEditCreditCard/container/AddEditCreditCard.constants';
import CheckoutSelectors from '../../../container/Checkout.selector';

const { getBillingValues, getShippingDestinationValues } = CheckoutSelectors;

const getOnFileCardKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileCardKey');
};

const getPaymentMethodId = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'paymentMethodId');
};

const getCardNumber = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'cardNumber');
};

export const getErrorMessages = state => {
  return state.Labels.global;
};

const getFormValidationErrorMessages = createSelector(
  getErrorMessages,
  global => global && global.formValidation
);

const getSyncError = state => {
  return {
    syncError: getFormSyncErrors(constants.FORM_NAME)(state),
  };
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

const getSameAsShippingValue = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'sameAsShipping');
};

const getEditFormSameAsShippingValue = state => {
  const selector = formValueSelector(constants.EDIT_FORM_NAME);
  return selector(state, 'sameAsShipping');
};

const getSaveToAccountValue = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'saveToAccount');
};

const getShippingOnFileAddressKey = createSelector(
  getShippingDestinationValues,
  shippingData => {
    return shippingData && shippingData.onFileAddressKey;
  }
);

const getShippingOnFileAddressId = createSelector(
  getShippingDestinationValues,
  shippingData => {
    return shippingData && shippingData.onFileAddressId;
  }
);

const getSelectedOnFileAddressId = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileAddressId');
};

const getEditFormSelectedOnFileAddressId = state => {
  const selector = formValueSelector(constants.EDIT_FORM_NAME);
  return selector(state, 'onFileAddressId');
};

export default {
  getOnFileCardKey,
  getPaymentMethodId,
  getFormValidationErrorMessages,
  getSyncError,
  getCardType,
  getSameAsShippingValue,
  getSaveToAccountValue,
  getShippingOnFileAddressKey,
  getSelectedOnFileAddressId,
  getShippingOnFileAddressId,
  getEditFormSameAsShippingValue,
  getEditFormSelectedOnFileAddressId,
};
