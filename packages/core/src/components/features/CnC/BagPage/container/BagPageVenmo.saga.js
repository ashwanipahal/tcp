import { select } from 'redux-saga/effects';
import checkoutSelectors from '../../Checkout/container/Checkout.selector';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';

/**
 * This saga method is used to decide if we need to show review page next based on order conditions.
 * @param {boolean} orderHasPickup
 */
export function* hasVenmoReviewPageRedirect(orderHasPickup) {
  const {
    isVenmoPaymentInProgress,
    isVenmoShippingBannerDisplayed,
    getIsOrderHasShipping,
    isPickupHasValues,
  } = checkoutSelectors;
  const isVenmoInProgress = yield select(isVenmoPaymentInProgress);
  const isVenmoShippingDisplayed = yield select(isVenmoShippingBannerDisplayed);
  const orderHasShipping = yield select(getIsOrderHasShipping);
  const hasPickupValues = yield select(isPickupHasValues);
  const addressList = yield select(getAddressListState);
  const hasShippingAddress = addressList && addressList.size > 0;
  let reviewPageRedirect = false;
  if (!isVenmoInProgress || isVenmoShippingDisplayed) {
    return reviewPageRedirect;
  }
  if (orderHasShipping && orderHasPickup) {
    // Mix Cart
    reviewPageRedirect = hasShippingAddress && hasPickupValues;
  } else if (orderHasShipping) {
    // Ship to Home Item
    reviewPageRedirect = hasShippingAddress;
  } else if (orderHasPickup) {
    // Boss Bopis scenario
    reviewPageRedirect = hasPickupValues;
  }
  return reviewPageRedirect;
}

export default hasVenmoReviewPageRedirect;
