/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put } from 'redux-saga/effects';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';
import {
  addGiftCardPaymentToOrder,
  removeGiftCard,
} from '../../../../../../../services/abstractors/CnC';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';

export function* applyGiftCard(payload) {
  try {
    const res = yield call(addGiftCardPaymentToOrder, payload.payload);
    console.log(res);
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(BAG_PAGE_ACTIONS.getCartData());
  } catch (err) {
    console.log(err);
  }
}

export function* removeGiftCardFromOrder(payload) {
  try {
    const res = yield call(removeGiftCard, payload.piId);
    console.log(res);
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(BAG_PAGE_ACTIONS.getCartData());
  } catch (err) {
    console.log(err);
  }
}

export function* GiftCardsSaga() {
  yield takeLatest(GIFTCARD_CONSTANTS.APPLY_GIFT_CARD, applyGiftCard);
  yield takeLatest(GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD, removeGiftCardFromOrder);
}

export default GiftCardsSaga;
