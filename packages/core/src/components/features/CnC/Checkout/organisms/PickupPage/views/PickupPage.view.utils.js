/**
 * @description - This method is to return the label text based on venmo or normal checkout
 * @param {object} props - method props from view class
 */
const getNextCTAText = props => {
  const {
    isVenmoPaymentInProgress,
    orderHasShipping,
    pickUpLabels,
    isVenmoPickupDisplayed,
  } = props;
  let nextButtonText;
  if (isVenmoPaymentInProgress && !isVenmoPickupDisplayed && !orderHasShipping) {
    nextButtonText = `${pickUpLabels.nextText}: ${pickUpLabels.reviewText}`;
  } else {
    nextButtonText = !orderHasShipping
      ? `${pickUpLabels.nextText}: ${pickUpLabels.billingText}`
      : `${pickUpLabels.nextText}: ${pickUpLabels.shippingText}`;
  }
  return nextButtonText;
};

export default getNextCTAText;
