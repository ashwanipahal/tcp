import { call, takeLatest, put } from 'redux-saga/effects';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';
import { validateReduxCache } from '../../../../../../../utils/cache.util';
import { setEarnExtraPointsList, showLoader } from './EarnExtraPointsTile.actions';
import { getExtraPointsActivityList } from '../../../../../../../services/abstractors/account/userExtraPoints';

export function* getEarnExtraPointsListSaga() {
  try {
    yield put(showLoader());
    const ExtraPointsActivityList = yield call(getExtraPointsActivityList);
    yield put(setEarnExtraPointsList(ExtraPointsActivityList));
  } catch (err) {
    yield null;
  }
}

export function* EarnExtraPointsSaga() {
  const cachedEarnExtraPointsList = validateReduxCache(getEarnExtraPointsListSaga);
  yield takeLatest(EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST, cachedEarnExtraPointsList);
}

export default EarnExtraPointsSaga;
