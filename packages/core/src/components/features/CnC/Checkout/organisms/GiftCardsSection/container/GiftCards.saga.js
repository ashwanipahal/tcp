/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put } from 'redux-saga/effects';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';
import {
  addGiftCardPaymentToOrder,
  removeGiftCard,
} from '../../../../../../../services/abstractors/CnC';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';
import GIFT_CARD_ACTIONS from './GiftCards.action';

const getErrorMessage = res => {
  let errorMessageRecieved = '';
  errorMessageRecieved =
    res &&
    res.errorResponse &&
    res.errorResponse.errors &&
    res.errorResponse.errors[0].errorMessage;
  return errorMessageRecieved;
};

export function* applyGiftCard(payloadData) {
  const { payload } = payloadData;
  try {
    yield put(GIFT_CARD_ACTIONS.resetGiftCardError());
    const res = yield call(addGiftCardPaymentToOrder, payload);
    if (res.errorResponse && res.errorResponse.errors) {
      const resErr = getErrorMessage(res);
      const errorObject = {
        [payload.creditCardId]: resErr,
      };
      yield put(GIFT_CARD_ACTIONS.setGiftCardError(errorObject));
    }

    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(BAG_PAGE_ACTIONS.getCartData());
  } catch (err) {
    console.log(err);
  }
}

export function* removeGiftCardFromOrder(payload) {
  try {
    yield put(GIFT_CARD_ACTIONS.resetGiftCardError());
    yield call(removeGiftCard, payload.piId);
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
