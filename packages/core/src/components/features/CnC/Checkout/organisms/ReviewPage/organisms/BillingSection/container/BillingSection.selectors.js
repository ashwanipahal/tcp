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
    cardNumber: cardDetails.cardNumber.slice(-4),
    ccType: cardDetails.cardType,
    ccBrand: cardDetails.cardType,
  };
};

/**
 * @function getReviewPageLabels
 * @param {Object} state
 * @description This selector provides the state of the review page labels.
 * @returns {Object}
 */
const getReviewPageLabels = state => {
  return state.Labels && state.Labels.checkout && state.Labels.checkout.review;
};

export default {
  getBillingCardDetails,
  getReviewPageLabels,
};
