import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
import { getOrderConfirmation } from '../../../../Confirmation/container/Confirmation.selectors';

const getCreateAccountSuccess = createSelector(
  getOrderConfirmation,
  orderConfirmation => orderConfirmation.get('createAccountSuccess')
);

const getPasswordLabels = state =>
  state.Labels && state.Labels.global && state.Labels.global.password;

const getRegistrationLabels = state =>
  state.Labels && state.Labels.global && state.Labels.global.registration;

const getConfirmationLabels = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.orderConfirmation;

/**
 * @function getReviewPageLabels
 * @param {Object} state
 * @description This selector provides the state of the review page labels.
 * @returns {Object}
 */
const getCreateAccountLabels = createSelector(
  getConfirmationLabels,
  getRegistrationLabels,
  (confirmationLabels, registrationLabels) => {
    const labels = {};
    const labelKeys = [
      'lbl_createAccount_emailAddress',
      'lbl_createAccount_password',
      'lbl_createAccount_confirmPassword',
      'lbl_createAccount_firstName',
      'lbl_createAccount_lastName',
      'lbl_createAccount_phoneNumber',
      'lbl_createAccount_zipCode',
      'lbl_createAccount_createAccount',
      'lbl_createAccount_termsConditions',
      'lbl_createAccount_termsConditions_1',
      'lbl_createAccount_show',
      'lbl_createAccount_hide',
      'lbl_createAccount_succcessMsg',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(registrationLabels, key);
    });
    labels.lbl_createAccount_heading = getLabelValue(
      confirmationLabels,
      'lbl_createAccount_heading'
    );
    return labels;
  }
);

export default {
  getCreateAccountLabels,
  getCreateAccountSuccess,
  getPasswordLabels,
};
