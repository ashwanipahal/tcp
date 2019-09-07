import { call, takeLatest, put } from 'redux-saga/effects';
import CREDIT_CARD_CONSTANTS from './CreditCard.constants';
import { setModuleX } from './CreditCard.action';
import { getModuleX } from '../../../../../../../services/abstractors/common/moduleX';

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* CreditCardSaga() {
  yield takeLatest(CREDIT_CARD_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
}

export default CreditCardSaga;
