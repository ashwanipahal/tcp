import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import {
  updateCardCardListonDelete,
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
} from './Payment.actions';

export function* deleteCard({ payload }) {
  try {
    const { relURI, method } = endpoints.deleteCreditCardOnAccount;
    const baseURI = endpoints.deleteAddress.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        creditCardId: payload.creditCardId,
        action: 'D',
      },
      method
    );
    if (res.statusCode === 200) {
      yield put(updateCardCardListonDelete(res.body || ''));
      yield put(setDeleteModalMountedState({ state: false }));
    } else {
      yield put(updateCardListonDeleteErr(res.error));
    }
  } catch (err) {
    yield put(updateCardListonDeleteErr(err));
  }
}

export function* DeleteCardSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.DELETE_CARD, deleteCard);
}

export default DeleteCardSaga;
