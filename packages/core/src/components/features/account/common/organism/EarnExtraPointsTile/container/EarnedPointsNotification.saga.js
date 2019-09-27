import { call, takeLatest, put } from 'redux-saga/effects';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';
import { validateReduxCache } from '../../../../../../../utils/cache.util';
import { setEarnedPointsNotification } from './EarnExtraPointsTile.actions';
import { getEarnedPointsNotification } from '../../../../../../../services/abstractors/account/userExtraPoints';

export function* getEarnedPointsNotificationSaga() {
  try {
    const EarnedPointsNotification = yield call(getEarnedPointsNotification);
    yield put(setEarnedPointsNotification(EarnedPointsNotification));
  } catch (err) {
    yield null;
  }
}

export function* EarnedPointsNotificationSaga() {
  const cachedEarnedPointsNotification = validateReduxCache(getEarnedPointsNotificationSaga);
  yield takeLatest(
    EARNEXTRAPOINTS_CONSTANTS.GET_EARNEDPOINTS_NOTIFICATION,
    cachedEarnedPointsNotification
  );
}

export default EarnedPointsNotificationSaga;
