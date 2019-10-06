import { call, takeLatest, put } from 'redux-saga/effects';
import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';
import { setModuleX } from './ExtraPoints.actions';
import { getPromoList } from '../../../../../services/abstractors/common/PromoList';

export function* fetchModuleX({ payload }) {
  try {
    const result = yield call(getPromoList, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* ExtraPointsSaga() {
  yield takeLatest(EXTRA_POINTS_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
}

export default ExtraPointsSaga;
