import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
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

const getCVVCodeInfoContentId = state => {
  let cvvCodeCID;
  if (state.Labels.checkout.billing && Array.isArray(state.Labels.checkout.billing.referred)) {
    state.Labels.checkout.billing.referred.forEach(label => {
      if (label.name === constants.CREDIT_CARD_CVV_INFO_LABEL) cvvCodeCID = label.contentId;
    });
  }
  return cvvCodeCID;
};

const getCVVCodeRichTextSelector = state => {
  const rContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getCVVCodeInfoContentId(state)
  );
  return rContent && rContent.richText;
};
export const getErrorMessages = state => {
  return state.Labels.global;
};

const getFormValidationErrorMessages = createSelector(
  getErrorMessages,
  global => global && global.formValidation
);

export default {
  getCreditCardLabels,
  getOnFileCardKey,
  getPaymentMethodId,
  getCVVCodeInfoContentId,
  getCVVCodeRichTextSelector,
  getFormValidationErrorMessages,
};
