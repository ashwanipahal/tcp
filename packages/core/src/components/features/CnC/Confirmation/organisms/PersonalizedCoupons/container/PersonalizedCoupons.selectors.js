import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';

/**
 * getConfirmationLabels
 * @param {Object} state
 * @description This selector provides the state of the confirmation category labels
 */
const getConfirmationLabels = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.orderConfirmation;

/**
 * @function getConfirmationCouponLabels
 * @param {Object} state
 * @description This selector provides the state of the confirmation page coupons labels.
 * @returns {Object}
 */
const getConfirmationCouponLabels = createSelector(
  getConfirmationLabels,
  confirmationLabels => {
    return {
      heading1: getLabelValue(confirmationLabels, 'lbl_odmCoupons_heading_1'),
      heading2: getLabelValue(confirmationLabels, 'lbl_odmCoupons_heading_2'),
      webCode: getLabelValue(confirmationLabels, 'lbl_odmCoupons_webCode'),
      validTill: getLabelValue(confirmationLabels, 'lbl_odmCoupons_validTill'),
      nowThrough: getLabelValue(confirmationLabels, 'lbl_odmCoupons_nowThrough'),
      detailsLink: getLabelValue(confirmationLabels, 'lbl_odmCoupons_detailsLink'),
    };
  }
);

export default {
  getConfirmationCouponLabels,
};
