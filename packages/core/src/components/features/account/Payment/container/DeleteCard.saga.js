import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import {
  getCardList,
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
  clearCardBalance,
} from './Payment.actions';
import { getAddressList } from '../../AddressBook/container/AddressBook.actions';
import { deleteCardApi } from '../../../../../services/abstractors/account';

export function* deleteCard({ payload }) {
  try {
    const res = yield call(deleteCardApi, payload);
    if (res.statusCode === 200) {
      yield put(getCardList({ ignoreCache: true }));
      yield put(getAddressList({ ignoreCache: true }));
      yield put(setDeleteModalMountedState({ state: false }));
      if (payload.ccType === 'GiftCard') {
        yield put(clearCardBalance(payload));
      }
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
