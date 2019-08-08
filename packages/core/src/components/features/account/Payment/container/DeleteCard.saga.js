import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import {
  updateCardListonDelete,
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
} from './Payment.actions';
import { deleteCardApi } from '../../../../../services/abstractors/account';

export function* deleteCard({ payload }) {
  try {
    const res = yield call(deleteCardApi, payload);
    if (res.statusCode === 200) {
      yield put(updateCardListonDelete(res.body || ''));
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
