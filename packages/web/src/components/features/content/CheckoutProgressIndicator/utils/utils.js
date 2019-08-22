import Router, { useRouter } from 'next/router'; //eslint-disable-line
import CHECKOUT_STAGES, { CHECKOUT_SECTIONS } from '../../../../../pages/App.constants';
import utils from '../../../../../../../core/src/utils';

const isOrderHasShipping = cartItems => {
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

const moveToStage = (stageName, isReplace) => {
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

  const moveToUrl = CHECKOUT_SECTIONS[stageName].pathPattern;
  if (isReplace) {
    const as = moveToUrl;
    Router.push(moveToUrl, as, { shallow: true });
  } else {
    Router.push(moveToUrl);
  }
};

const routeToStage = (requestedStage, cartItems, isAllowForward) => {
  const router = useRouter();
  const currentStage = utils.getObjectValue(router, undefined, 'query', 'subSection');

  if (requestedStage === currentStage) return;

  const availableStages = getAvailableStages(cartItems);
  const routeToUrl = CHECKOUT_SECTIONS[currentStage].pathPattern;
  const as = routeToUrl;
  let currentFound = false;
  let requestedFound = false;

  for (let i = 0; i < availableStages.length; i += 1) {
    const stage = availableStages[i];
    currentFound = currentFound || stage === currentStage;
    if (stage === requestedStage) {
      requestedFound = true;
      if (isAllowForward || !currentFound) {
        moveToStage(requestedStage, true);
      } else {
        Router.push(routeToUrl, as, { shallow: true });
      }
      break;
    }
  }
  if (!requestedFound) {
    // requested stage is not available (or illegal)
    Router.push(routeToUrl, as, { shallow: true });
  }
};

export default {
  getAvailableStages,
  moveToStage,
  routeToStage,
};
