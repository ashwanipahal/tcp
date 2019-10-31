import { call, select, put } from 'redux-saga/effects';
import CONSTANTS from '../../Checkout/Checkout.constants';
import checkoutSelectors, { isExpressCheckout } from '../../Checkout/container/Checkout.selector';
import { getSetCheckoutStage } from '../../Checkout/container/Checkout.action';

function* navigateToCheckout(stage, navigation, navigationActions) {
  yield put(getSetCheckoutStage(stage));
  const navigateAction = navigationActions.navigate({
    routeName: CONSTANTS.CHECKOUT_ROOT,
  });
  navigation.dispatch(navigateAction);
}

/**
 * routeForAppCartCheckout component. This is responsible for routing our web to specific page of checkout journey.
 * @param {Boolean} recalc query parameter for recalculation of points
 * @param {Object} navigation for navigating in mobile app
 * @param {Boolean} closeModal for closing addedtoBag modal in app
 * @param {Boolean} orderHasPickup if order has any pickup item
 */
function* routeForAppCartCheckout(
  recalc,
  navigation,
  closeModal,
  navigationActions,
  orderHasPickup
) {
  const { hasVenmoReviewPageRedirect } = checkoutSelectors;
  const isExpressCheckoutEnabled = yield select(isExpressCheckout);
  const hasVenmoReviewPage = yield select(hasVenmoReviewPageRedirect);
  if (isExpressCheckoutEnabled || hasVenmoReviewPage) {
    yield call(navigateToCheckout, CONSTANTS.REVIEW_DEFAULT_PARAM, navigation, navigationActions);
  } else if (orderHasPickup) {
    yield call(navigateToCheckout, CONSTANTS.PICKUP_DEFAULT_PARAM, navigation, navigationActions);
  } else {
    const params = [CONSTANTS.SHIPPING_DEFAULT_PARAM, navigation, navigationActions];
    yield call(navigateToCheckout, ...params);
  }
  if (closeModal) {
    closeModal();
  }
}

export default routeForAppCartCheckout;
