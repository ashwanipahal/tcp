import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
import checkoutSelectors from '../../../../../container/Checkout.selector';

/**
 * @function getBillingCardDetails
 * @param {Object} state
 * @description This selector transform the state from the following
 *  Checkout --> values --> billing --> billing into card details required by component
 * @returns {Object}
 */
/* istanbul ignore next */
const getBillingCardDetails = state => {
  const billingDetails = checkoutSelectors.getBillingValues(state);
  const cardDetails = billingDetails && billingDetails.billing;
  if (!cardDetails) {
    return null;
  }
  return {
    cardNumber: cardDetails.cardNumber && cardDetails.cardNumber.slice(-4),
    ccType: cardDetails.cardType,
    ccBrand: cardDetails.cardType,
  };
};

const getReviewLabels = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.review;

/**
 * @function getReviewPageLabels
 * @param {Object} state
 * @description This selector provides the state of the review page labels.
 * @returns {Object}
 */
const getReviewPageLabels = createSelector(
  getReviewLabels,
  reviewLabels => {
    const labels = {};
    const labelKeys = [
      'lbl_review_billingSectionTitle',
      'lbl_review_paymentMethod',
      'lbl_review_billingAddress',
      'lbl_review_appliedGiftCards',
      'lbl_review_paymentMethodEndingIn',
      'lbl_review_appliedGiftCardEndingIn',
      'lbl_review_appliedGiftCardRemainingBal',
      'lbl_review_appliedGiftCardsNone',
      'lbl_review_giftCardHeadsup',
      'lbl_review_giftCardMessage',
      'lbl_review_billingEdit',
      'lbl_review_save_venmo',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(reviewLabels, key);
    });
    return labels;
  }
);

export default {
  getBillingCardDetails,
  getReviewPageLabels,
};
