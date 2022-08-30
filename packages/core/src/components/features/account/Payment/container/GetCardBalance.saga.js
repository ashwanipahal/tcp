import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import { setcheckBalance, setcheckBalanceError } from './Payment.actions';
import { getGiftCardBalanceApi } from '../../../../../services/abstractors/account';

export function* getGiftCardBalance({ payload }) {
  try {
    const res = yield call(getGiftCardBalanceApi, payload);
    if (res.statusCode === 200) {
      return yield put(setcheckBalance(res.body || ''));
    }
    return yield put(setcheckBalanceError({ card: payload.card }));
  } catch (err) {
    return yield put(setcheckBalanceError({ card: payload.card }));
  }
}

export function* GiftCardBalanceSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.CHECK_BALANCE, getGiftCardBalance);
}

export default GiftCardBalanceSaga;
