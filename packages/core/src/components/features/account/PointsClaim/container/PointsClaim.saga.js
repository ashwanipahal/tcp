import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../PointsClaim.constants';
import { submitClaimError, submitClaimSuccess } from './PointsClaim.actions';
import { claimPoints } from '../../../../../services/abstractors/account';

/**
 * @function SubmitClaimForm
 * @description This function will call claimPoints Abstractor to submit claim form
 */
export function* SubmitClaimForm({ payload }) {
  try {
    const res = yield call(claimPoints, payload);
    if (res.body.ErrorDescription) {
      return yield put(submitClaimError(res.body));
    }
    return yield put(submitClaimSuccess(res));
  } catch (err) {
    let error = {};
    error = err;
    if (error && error.response) {
      return yield put(submitClaimError(error.response.body));
    }
    return null;
  }
}

/**
 * @function PointsClaimSaga
 * @description watcher function for SubmitClaimForm.
 */
export function* PointsClaimSaga() {
  yield takeLatest(constants.POINTS_CLAIM, SubmitClaimForm);
}

export default PointsClaimSaga;
