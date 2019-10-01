import { call, takeLatest, put } from 'redux-saga/effects';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { setUpdateOrderDetailsData } from './Confirmation.actions';

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setUpdateOrderDetailsData(result));
  } catch (err) {
    yield null;
  }
}

export function* ConfirmationPageSaga() {
  yield takeLatest(CONFIRMATION_CONSTANTS.CONFIRMATION_FETCH_UPDATE_ORDER_DETAILS, fetchModuleX);
}

export default ConfirmationPageSaga;
