import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../PointsClaim.constants';
import { submitClaimError, submitClaimSuccess } from './PointsClaim.actions';
import { claimPoints } from '../../../../../services/abstractors/account';

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

export function* PointsClaimSaga() {
  yield takeLatest(constants.POINTS_CLAIM, SubmitClaimForm);
}

export default PointsClaimSaga;
