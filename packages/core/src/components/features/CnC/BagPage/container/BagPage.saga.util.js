import { select } from 'redux-saga/effects';
import checkoutSelectors from '../../Checkout/container/Checkout.selector';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';

export function* hasVenmoReviewPageRedirect(orderHasPickup) {
  const isVenmoPaymentInProgress = yield select(checkoutSelectors.isVenmoPaymentInProgress);
  const isVenmoShippingDisplayed = yield select(checkoutSelectors.isVenmoShippingBannerDisplayed);
  const orderHasShipping = yield select(checkoutSelectors.getIsOrderHasShipping);
  const hasPickupValues = yield select(checkoutSelectors.isPickupHasValues);
  const addressList = yield select(getAddressListState);
  const hasShippingAddress = addressList && addressList.size > 0;
  let reviewPageRedirect = false;
  if (!isVenmoPaymentInProgress || isVenmoShippingDisplayed) {
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
