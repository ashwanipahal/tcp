import { call, takeLatest, put } from 'redux-saga/effects';
import POINTSHISTORY_CONSTANTS from '../PointsHistory.constants';
import { validateReduxCache } from '../../../../../../../utils/cache.util';
import { setPointsHistoryList } from './PointsHistory.actions';
import { getPointsHistoryData } from '../../../../../../../services/abstractors/account/PointsHistory';

export function* getPointsHistoryListSaga() {
  try {
    const pointsHistoryData = yield call(getPointsHistoryData);
    yield put(setPointsHistoryList(pointsHistoryData));
  } catch (err) {
    yield null;
  }
}

export function* PointsHistorySaga() {
  const cachedPointsHistoryList = validateReduxCache(getPointsHistoryListSaga);
  yield takeLatest(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST, cachedPointsHistoryList);
}

export default PointsHistorySaga;
