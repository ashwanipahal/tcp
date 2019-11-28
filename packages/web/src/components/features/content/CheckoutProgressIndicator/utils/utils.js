import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import CheckoutUtil from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import CHECKOUT_STAGES from '../../../../../pages/App.constants';

export const isOrderHasShipping = cartItems => {
  return cartItems && cartItems.filter(item => !item.getIn(['miscInfo', 'store'])).size;
};

const isOrderHasPickup = cartItems => {
  return cartItems && cartItems.filter(item => !!item.getIn(['miscInfo', 'store'])).size;
};

const getAvailableStages = cartItems => {
  const result = [CHECKOUT_STAGES.BILLING, CHECKOUT_STAGES.REVIEW];
  if (isOrderHasShipping(cartItems)) {
    result.unshift(CHECKOUT_STAGES.SHIPPING);
  }
  if (isOrderHasPickup(cartItems)) {
    result.unshift(CHECKOUT_STAGES.PICKUP);
  }
  return result;
};

const moveToStage = stageName => {
  // To Do below action once states are availble.
  /* const state = this.store.getState();
  this.store.dispatch([
    getSetIsEditingSubformActn(null),
    getSetCheckoutStageActn(stageName),
  ]);
  if (!checkoutStoreView.isVenmoMessageDisplayed(state)
    && checkoutStoreView.getCheckoutStageChangeCount(state) > 1) {
    this.store.dispatch(setVenmoInformationMessageDisplayed(true));
  }
  if (stageName === CHECKOUT_STAGES.REVIEW) {
    this.store.dispatch(setVenmoInformationMessageDisplayed(true));
    this.store.dispatch(setReviewVisited(true));
  } */
  CheckoutUtil.routeToPage(CHECKOUT_ROUTES[`${stageName}Page`]);
};

/**
 * This Method will return for which checkout path, app will navigate on click
 * of checkout button
 * @param {cartItems} cartItems
 */
const getRoutePathCheckoutBtn = cartItems => {
  const totalCheckoutStages = getAvailableStages(cartItems);
  return totalCheckoutStages[0];
};

export default {
  getAvailableStages,
  moveToStage,
  isOrderHasPickup,
  getRoutePathCheckoutBtn,
};
