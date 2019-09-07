import { formValueSelector } from 'redux-form';
/* eslint-disable extra-rules/no-commented-out-code */
import { isMobileApp, getViewportInfo } from '@tcp/core/src/utils';
import constants from './CreditCard.constants';

const getCreditCardLabels = state => state.Labels.checkout.billing;

const getOnFileCardKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileCardKey');
};

const getPaymentMethodId = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'paymentMethodId');
};

function getIsMobile() {
  if (isMobileApp()) return true;
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  return getViewportInfo().isMobile;
}

const getCVVCodeInfoContentId = state => {
  let cvvCodeCID;
  /* istanbul ignore else */
  if (state.Labels.checkout.billing && Array.isArray(state.Labels.checkout.billing.referred)) {
    state.Labels.checkout.billing.referred.forEach(label => {
      /* istanbul ignore else */
      if (label.name === constants.CREDIT_CARD_CVV_INFO_LABEL) cvvCodeCID = label.contentId;
    });
  }
  return cvvCodeCID;
};
const getCVVCodeRichTextSelector = state => {
  return state.BillingPaymentReducer && state.BillingPaymentReducer.get('cvvCodeInfoContent');
};
export default {
  getCreditCardLabels,
  getOnFileCardKey,
  getIsMobile,
  getPaymentMethodId,
  getCVVCodeInfoContentId,
  getCVVCodeRichTextSelector,
};
