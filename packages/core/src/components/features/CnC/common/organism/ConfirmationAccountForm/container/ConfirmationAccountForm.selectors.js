import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
import ConfirmationSelectors from '../../../../Confirmation/container/Confirmation.selectors';

const { getOrderConfirmation } = ConfirmationSelectors;
/**
 * re-select selector to provide create account success value
 */
const getCreateAccountSuccess = createSelector(
  getOrderConfirmation,
  orderConfirmation => orderConfirmation && orderConfirmation.createAccountSuccess
);

/**
 * @function getPasswordLabels
 * @param {Object} state
 * @returns {Object} Provides password labels slice from bigger portion of labels state.
 */
const getPasswordLabels = state =>
  state.Labels && state.Labels.global && state.Labels.global.password;

/**
 * @function getRegistrationLabels
 * @param {Object} state
 * @returns {Object} Provides registration labels slice from bigger portion of labels state.
 */

const getRegistrationLabels = state =>
  state.Labels && state.Labels.global && state.Labels.global.registration;

/**
 * @function getConfirmationLabels
 * @param {Object} state
 * @returns {Object} Provides confirmation labels slice from bigger portion of labels state.
 */
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
