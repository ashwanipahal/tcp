import { call, takeLatest, put, all } from 'redux-saga/effects';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { setUpdateOrderDetailsData } from './Confirmation.actions';

export function* fetchModuleX({ payload = [] }) {
  try {
    let result = yield all(payload.map(uuid => call(getModuleX, uuid)));
    result = result.map((val, index) => ({ ...val, name: payload[index] }));
    yield put(setUpdateOrderDetailsData(result));
  } catch (err) {
    yield null;
  }
}

export function* ConfirmationPageSaga() {
  yield takeLatest(CONFIRMATION_CONSTANTS.CONFIRMATION_FETCH_UPDATE_ORDER_DETAILS, fetchModuleX);
}

export default ConfirmationPageSaga;
