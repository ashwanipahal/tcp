// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import endpoints from '../../../../../../service/endpoint';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';
import fetchData from '../../../../../../service/API';
import {
  addGiftCardFailure,
  addGiftCardSuccess as addGiftCardSuccessAction,
} from './AddGiftCard.actions';
import { addGiftCardSuccess, getCardList } from '../../container/Payment.actions';

export function* addGiftCard({ payload }: { payload: {} }): Saga<void> {
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
    yield put(addGiftCardSuccessAction(response));
    yield put(getCardList({ ignoreCache: true }));
  } catch (err) {
    let error = {};
    if (err instanceof Error) {
      error = err.response.body;
    }
    yield put(addGiftCardFailure(error));
  }
}

export function* AddGiftCardSaga(): Saga<void> {
  yield takeLatest(ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST, addGiftCard);
}
