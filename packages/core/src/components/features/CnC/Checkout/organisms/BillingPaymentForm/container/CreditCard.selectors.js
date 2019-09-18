import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import constants from './CreditCard.constants';

const getOnFileCardKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileCardKey');
};

const getPaymentMethodId = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'paymentMethodId');
};

export const getErrorMessages = state => {
  return state.Labels.global;
};

const getFormValidationErrorMessages = createSelector(
  getErrorMessages,
  global => global && global.formValidation
);

export default {
  getOnFileCardKey,
  getPaymentMethodId,
  getFormValidationErrorMessages,
};
