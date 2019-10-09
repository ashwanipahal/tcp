import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import CheckoutUtil from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import CHECKOUT_STAGES, { CHECKOUT_SECTIONS } from '../../../../../pages/App.constants';

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

const routeToStage = (requestedStage, cartItems, isAllowForward, currentStageName) => {
  if (requestedStage === currentStageName) return;

  if (!cartItems) return;

  let currentStage = currentStageName;
  const availableStages = getAvailableStages(cartItems);

  if (availableStages.length > 3) {
    currentStage = CHECKOUT_STAGES.PICKUP;
  } else {
    currentStage = CHECKOUT_STAGES.SHIPPING;
  }

  const routeToUrl = CHECKOUT_SECTIONS[currentStage].pathPart;
  let currentFound = false;
  let requestedFound = false;

  for (let i = 0; i < availableStages.length; i += 1) {
    const stage = availableStages[i];
    currentFound = currentFound || stage === currentStage;
    if (stage === requestedStage) {
      requestedFound = true;
      if (isAllowForward || !currentFound) {
        moveToStage(requestedStage);
      } else {
        moveToStage(routeToUrl);
      }
      break;
    }
  }
  if (!requestedFound) {
    // requested stage is not available (or illegal)
    moveToStage(routeToUrl);
  }
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
  routeToStage,
  isOrderHasPickup,
  getRoutePathCheckoutBtn,
};
