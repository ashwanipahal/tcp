/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, select } from 'redux-saga/effects';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';
import {
  addGiftCardPaymentToOrder,
  removeGiftCard,
  addGiftCard,
} from '../../../../../../../services/abstractors/CnC';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';
import {
  setGiftCardError,
  resetGiftCardError,
  addGiftCardFailure,
  addGiftCardSuccess,
  resetAddGiftCard,
  setIsLoadingShippingMethods,
} from '../../../container/Checkout.action';

export function* applyGiftCard(payloadData) {
  const { payload } = payloadData;
  try {
    yield put(resetGiftCardError());
    const errorMappings = yield select(BagPageSelectors.getErrorMapping);
    const res = yield call(addGiftCardPaymentToOrder, payload, errorMappings);
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      const errorObject = {
        [payload.creditCardId]: resErr,
      };
      yield put(setGiftCardError(errorObject));
    } else yield put(BAG_PAGE_ACTIONS.getCartData());
  } catch (err) {
    const errorObject = {
      [payload.creditCardId]: err,
    };
    yield put(setGiftCardError(errorObject));
  }
}

export function* removeGiftCardFromOrder(payloadData) {
  try {
    const { payload } = payloadData;
    yield put(resetGiftCardError());
    const labels = yield select(BagPageSelectors.getErrorMapping);
    yield call(removeGiftCard, payload, labels);
    yield put(BAG_PAGE_ACTIONS.getCartData());
  } catch (err) {
    console.log(err);
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
      yield put(BAG_PAGE_ACTIONS.getCartData());
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
