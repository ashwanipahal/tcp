import { call, put, select, delay } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import BAG_SELECTORS from './BagPage.selectors';
import { isCanada } from '../../../../../utils';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { getServerErrorMessage } from '../../../../../services/abstractors/CnC';
import { addItemToSflList } from '../../../../../services/abstractors/CnC/SaveForLater';
import { imageGenerator } from '../../../../../services/abstractors/CnC/CartItemTile';
import CONSTANTS from '../../Checkout/Checkout.constants';
import checkoutSelectors, {
  isExpressCheckout,
  isRemembered,
} from '../../Checkout/container/Checkout.selector';
import { getSetCheckoutStage } from '../../Checkout/container/Checkout.action';

export default function* startSflItemDelete({ payload: { catEntryId } = {} } = {}) {
  yield put(setLoaderState(true));
  const isRememberedUser = yield select(isRemembered);
  const isRegistered = yield select(getUserLoggedInState);
  const countryCurrency = yield select(BAG_SELECTORS.getCurrentCurrency);
  const isCanadaSIte = isCanada();
  try {
    const res = yield call(
      addItemToSflList,
      catEntryId,
      isRememberedUser,
      isRegistered,
      imageGenerator,
      countryCurrency,
      isCanadaSIte,
      true
    );
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(resErr));
      yield put(setLoaderState(false));
    } else {
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(true));
      yield delay(BAGPAGE_CONSTANTS.ITEM_SFL_SUCCESS_MSG_TIMEOUT);
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(false));
      yield put(setLoaderState(false));
    }
  } catch (err) {
    yield put(setLoaderState(false));
    const errorsMapping = yield select(BAG_SELECTORS.getErrorMapping);
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(getServerErrorMessage(err, errorsMapping)));
  }
}

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
export function* routeForAppCartCheckout(
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
