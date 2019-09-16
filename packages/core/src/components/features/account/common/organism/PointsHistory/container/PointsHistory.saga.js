import { call, takeLatest, put } from 'redux-saga/effects';
import POINTSHISTORY_CONSTANTS from '../PointsHistory.constants';
import { validateReduxCache } from '../../../../../../../utils/cache.util';
import { setPointsHistoryList, setModuleX } from './PointsHistory.actions';
import { getModuleX } from '../../../../../../../services/abstractors/common/moduleX';
import { getPointsHistoryData } from '../../../../../../../services/abstractors/account/PointsHistory';

export function* getPointsHistoryListSaga() {
  try {
    const pointsHistoryData = yield call(getPointsHistoryData);
    yield put(setPointsHistoryList(pointsHistoryData));
  } catch (err) {
    yield null;
  }
}

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* PointsHistorySaga() {
  const cachedPointsHistoryList = validateReduxCache(getPointsHistoryListSaga);
  yield takeLatest(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST, cachedPointsHistoryList);
  yield takeLatest(POINTSHISTORY_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
}

export default PointsHistorySaga;
