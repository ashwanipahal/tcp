/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, select, delay } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';
import {
  addGiftCardPaymentToOrder,
  removeGiftCard,
  addGiftCard,
} from '../../../../../../../services/abstractors/CnC';
import { getCartDataSaga } from '../../../../BagPage/container/BagPage.saga';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';
import {
  setGiftCardError,
  resetGiftCardError,
  addGiftCardFailure,
  addGiftCardSuccess,
  resetAddGiftCard,
  setIsLoadingShippingMethods,
  getSetIsBillingVisitedActn,
} from '../../../container/Checkout.action';
import checkoutSelectors from '../../../container/Checkout.selector';
import BAGPAGE_CONSTANTS from '../../../../BagPage/BagPage.constants';

export function* applyGiftCard(payloadData) {
  const { payload } = payloadData;
  try {
    yield put(setLoaderState(true));
    yield put(resetGiftCardError());
    const errorMappings = yield select(BagPageSelectors.getErrorMapping);
    const res = yield call(addGiftCardPaymentToOrder, payload, errorMappings);
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      const errorObject = {
        [payload.creditCardId]: resErr,
      };
      yield put(setGiftCardError(errorObject));
    } else {
      yield call(getCartDataSaga, {
        isRecalculateTaxes: true,
        excludeCartItems: false,
        recalcRewards: true,
        isCheckoutFlow: true,
        translation: false,
      });
    }
    yield put(setLoaderState(false));
  } catch (err) {
    const errorObject = {
      [payload.creditCardId]: err,
    };
    yield put(setGiftCardError(errorObject));
    yield put(setLoaderState(false));
    yield delay(BAGPAGE_CONSTANTS.ITEM_SFL_SUCCESS_MSG_TIMEOUT);
    yield put(resetGiftCardError());
  }
}

export function* removeGiftCardFromOrder(payloadData) {
  try {
    yield put(setLoaderState(true));
    const { payload } = payloadData;
    yield put(resetGiftCardError());
    const labels = yield select(BagPageSelectors.getErrorMapping);
    const isPaymentDisabled = yield select(checkoutSelectors.getIsPaymentDisabled);
    if (isPaymentDisabled) {
      yield put(getSetIsBillingVisitedActn(false));
    }
    yield call(removeGiftCard, payload, labels);
    yield call(getCartDataSaga, {
      isRecalculateTaxes: true,
      excludeCartItems: false,
      recalcRewards: true,
      isCheckoutFlow: true,
      translation: false,
    });
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
  }
}
export function* addGiftCardFromBilling(payloadData) {
  const { payload } = payloadData;
  try {
    yield put(resetAddGiftCard());
    yield put(setIsLoadingShippingMethods(true));
    const response = yield call(addGiftCard, payload);
    if (response && response.success) {
      yield put(setIsLoadingShippingMethods(false));
      yield put(addGiftCardSuccess());
      yield call(getCartDataSaga, {
        isRecalculateTaxes: true,
        excludeCartItems: false,
        recalcRewards: true,
        isCheckoutFlow: true,
        translation: false,
      });
    }
    if (response.errorMessage) {
      const resErr = response.errorMessage[Object.keys(response.errorMessage)[0]];
      yield put(setIsLoadingShippingMethods(false));
      yield put(addGiftCardFailure(resErr));
    }
  } catch (err) {
    let error = {};
    error = err;
    if (error && error.response) {
      yield put(addGiftCardFailure(error.response.body.errors[0]));
    }
  }
}

export function* GiftCardsSaga() {
  yield takeLatest(GIFTCARD_CONSTANTS.APPLY_GIFT_CARD, applyGiftCard);
  yield takeLatest(GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD, removeGiftCardFromOrder);
  yield takeLatest(GIFTCARD_CONSTANTS.ADD_GIFT_CARD, addGiftCardFromBilling);
}

export default GiftCardsSaga;
