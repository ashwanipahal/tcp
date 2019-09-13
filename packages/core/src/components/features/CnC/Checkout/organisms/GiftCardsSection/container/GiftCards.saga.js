/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, select } from 'redux-saga/effects';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';
import {
  addGiftCardPaymentToOrder,
  removeGiftCard,
} from '../../../../../../../services/abstractors/CnC';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';
import { setGiftCardError, resetGiftCardError } from '../../../container/Checkout.action';

export function* applyGiftCard(payloadData) {
  const { payload } = payloadData;
  try {
    yield put(resetGiftCardError());
    const res = yield call(addGiftCardPaymentToOrder, payload);
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      const errorObject = {
        [payload.creditCardId]: resErr,
      };
      yield put(setGiftCardError(errorObject));
    }

    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    yield put(setGiftCardError(err));
  }
}

export function* removeGiftCardFromOrder(payloadData) {
  try {
    const { payload } = payloadData;
    yield put(resetGiftCardError());
    const labels = yield select(BagPageSelectors.getErrorMapping);
    yield call(removeGiftCard, payload, labels);
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    console.log(err);
  }
}

export function* GiftCardsSaga() {
  yield takeLatest(GIFTCARD_CONSTANTS.APPLY_GIFT_CARD, applyGiftCard);
  yield takeLatest(GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD, removeGiftCardFromOrder);
}

export default GiftCardsSaga;
