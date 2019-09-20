import checkoutSelectors from '../../../../../container/Checkout.selector';

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

const getReviewPageLabels = state => {
  return state.Labels && state.Labels.checkout && state.Labels.checkout.review;
};

export default {
  getBillingCardDetails,
  getReviewPageLabels,
};
