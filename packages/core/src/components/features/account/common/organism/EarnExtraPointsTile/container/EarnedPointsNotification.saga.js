import { call, takeLatest, put } from 'redux-saga/effects';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';
import { setEarnedPointsNotification } from './EarnExtraPointsTile.actions';
import { getEarnedPointsNotification } from '../../../../../../../services/abstractors/account/userExtraPoints';

/**
 * This generator function  use to set EarnedPointsNotification data in our store
 */

export function* getEarnedPointsNotificationSaga() {
  try {
    const EarnedPointsNotification = yield call(getEarnedPointsNotification);
    yield put(setEarnedPointsNotification(EarnedPointsNotification));
  } catch (err) {
    yield null;
  }
}

export function* EarnedPointsNotificationSaga() {
  yield takeLatest(
    EARNEXTRAPOINTS_CONSTANTS.GET_EARNEDPOINTS_NOTIFICATION,
    getEarnedPointsNotificationSaga
  );
}

export default EarnedPointsNotificationSaga;
