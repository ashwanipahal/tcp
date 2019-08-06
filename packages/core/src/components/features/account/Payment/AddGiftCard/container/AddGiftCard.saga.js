// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';
import { addGiftCardFailure, addGiftCardSuccess } from './AddGiftCard.actions';
import { clearCardListTTL } from '../../container/Payment.actions';
import { addGiftCardApi } from '../../../../../../services/abstractors/account';

export function* addGiftCard({
  payload,
}: {
  payload: { giftCardNumber: string, cardPin: string, recaptchaToken: string },
}): Saga<void> {
  try {
    const response = yield call(addGiftCardApi, payload);
    if (response.body) {
      yield put(clearCardListTTL());
      return yield put(addGiftCardSuccess());
    }
    return yield put(addGiftCardFailure());
  } catch (err) {
    let error = {};
    if (err instanceof Error) {
      error = err.response.body;
    }
    return yield put(addGiftCardFailure(error.errors[0].errorMessage));
  }
}

export function* AddGiftCardSaga(): Saga<void> {
  yield takeLatest(ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST, addGiftCard);
}
