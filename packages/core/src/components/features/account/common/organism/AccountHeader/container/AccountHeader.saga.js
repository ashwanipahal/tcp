import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../AccountHeader.constants';
import { setModuleX } from './AccountHeader.actions';
import { getModuleX } from '../../../../../../../services/abstractors/common/moduleX';

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* AccountHeaderSaga() {
  yield takeLatest(constants.FETCH_MODULEX_CONTENT, fetchModuleX);
}

export default AccountHeaderSaga;
