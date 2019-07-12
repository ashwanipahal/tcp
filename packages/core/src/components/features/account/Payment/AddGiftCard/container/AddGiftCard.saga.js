// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '../../../../../../service/endpoint';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';
import fetchData from '../../../../../../service/API';
import { addGiftCardSuccess, addGiftCardFailure } from './AddGiftCard.actions';

export function* addGiftCard(payload: {}): Saga<void> {
  try {
    const { relURI, method } = endpoints.addGiftCard;
    const baseURI = endpoints.addGiftCard.baseURI || endpoints.global.baseURI;
    const response = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        isrest: true,
      },
      method
    );
    yield put(addGiftCardSuccess(response));
  } catch (err) {
    yield put(addGiftCardFailure(err));
  }
}

export function* AddGiftCardSaga(): Saga<void> {
  yield takeLatest(ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST, addGiftCard);
}
