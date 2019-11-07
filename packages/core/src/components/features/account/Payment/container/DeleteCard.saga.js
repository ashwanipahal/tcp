import { call, takeLatest, put } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/web/src/components/features/content/Loader/container/Loader.actions';
import PAYMENT_CONSTANTS from '../Payment.constants';
import {
  getCardList,
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
  clearCardBalance,
  setPaymentNotification,
} from './Payment.actions';
import { getAddressList } from '../../AddressBook/container/AddressBook.actions';
import { deleteCardApi } from '../../../../../services/abstractors/account';

export function* deleteCard({ payload }) {
  yield put(setLoaderState(true));
  try {
    const res = yield call(deleteCardApi, payload);
    yield put(setLoaderState(false));
    if (res.statusCode === 200) {
      yield put(getCardList({ ignoreCache: true }));
      yield put(getAddressList({ ignoreCache: true }));
      yield put(setDeleteModalMountedState({ state: false }));
      yield put(setPaymentNotification({ status: 'success' }));
      if (payload.ccType === 'GiftCard') {
        yield put(clearCardBalance(payload));
      }
    } else {
      yield put(updateCardListonDeleteErr(res.error));
    }
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(updateCardListonDeleteErr(err));
  }
}

export function* DeleteCardSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.DELETE_CARD, deleteCard);
}

export default DeleteCardSaga;
