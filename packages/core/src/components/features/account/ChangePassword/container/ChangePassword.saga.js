import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../ChangePassword.constants';
import { changePasswordError } from './ChangePassword.actions';
import { updateProfileSuccess } from '../../MyProfile/container/MyProfile.actions';
import { UpdateProfileInfo } from '../../../../../services/abstractors/account';

export function* ChangePassword({ payload }) {
  try {
    const res = yield call(UpdateProfileInfo, payload);
    return yield put(updateProfileSuccess(res));
  } catch (err) {
    let error = {};
    /* istanbul ignore else */
    error = err;
    if (error && error.errorResponse) {
      return yield put(changePasswordError(error.errorResponse));
    }
    if (error && error.response.body) {
      return yield put(changePasswordError(error.response.body.errors[0]));
    }
  }
}

export function* ChangePasswordSaga() {
  yield takeLatest(constants.CHANGE_PASSWORD, ChangePassword);
}

export default ChangePasswordSaga;
