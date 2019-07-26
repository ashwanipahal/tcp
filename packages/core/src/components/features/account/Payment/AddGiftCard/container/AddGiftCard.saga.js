// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '../../../../../../service/endpoint';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';
import fetchData from '../../../../../../service/API';
import { addGiftCardFailure, addGiftCardSuccess } from './AddGiftCard.actions';
import { clearCardListTTL } from '../../container/Payment.actions';

export function* addGiftCard({
  payload,
}: {
  payload: { giftCardNumber: string, cardPin: string, recaptchaToken: string },
}): Saga<void> {
  try {
    const { relURI, method } = endpoints.addGiftCard;
    const baseURI = endpoints.addGiftCard.baseURI || endpoints.global.baseURI;

    const { giftCardNumber, cardPin, recaptchaToken } = payload;
    const requestPayload = {
      cc_brand: 'GC',
      payMethodId: 'GiftCard',
      account_pin: cardPin,
      pay_account: giftCardNumber,
      recapchaResponse: recaptchaToken,
    };

    const response = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload: requestPayload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        isrest: true,
      },
      method
    );
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
