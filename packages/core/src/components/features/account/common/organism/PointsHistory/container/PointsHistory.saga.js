import { call, takeLatest, put } from 'redux-saga/effects';
import REWARDSPOINTS_CONSTANTS from '../PointsHistory.constants';
import { validateReduxCache } from '../../../../../../../utils/cache.util';
import { setPointsHistoryList } from './PointsHistory.actions';
import { getPointsHistoryData } from '../../../../../../../services/abstractors/account/PointsHistory';

export function* getPointsHistoryList() {
  try {
    const pointsHistoryData = yield call(getPointsHistoryData);
    yield put(setPointsHistoryList(pointsHistoryData));
  } catch (err) {
    yield null;
  }
}

export function* PointsHistorySaga() {
  const cachedPointsHistoryList = validateReduxCache(getPointsHistoryList);
  yield takeLatest(REWARDSPOINTS_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedPointsHistoryList);
}

export default PointsHistorySaga;
