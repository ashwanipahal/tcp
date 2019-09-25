import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../AddEditPersonalInformation.constants';
import { getUserInfo } from '../../User/container/User.actions';
import { updateProfileError } from './AddEditPersonalInformation.actions';
import { updateProfileSuccess } from '../../MyProfile/container/MyProfile.actions';

import { UpdateProfileInfo } from '../../../../../services/abstractors/account';

export function* UpdateProfile({ payload }) {
  try {
    const res = yield call(UpdateProfileInfo, payload);
    yield put(getUserInfo());
    return yield put(updateProfileSuccess(res));
  } catch (err) {
    let error = {};
    /* istanbul ignore else */
    error = err;
    if (error && error.errorResponse) {
      return yield put(updateProfileError(error.errorResponse));
    }
    if (error && error.response.body) {
      return yield put(updateProfileError(error.response.body.errors[0]));
    }
    return yield put(updateProfileError(err));
  }
}

export function* UpdateProfileSaga() {
  yield takeLatest(constants.UPDATE_PROFILE, UpdateProfile);
}

export default UpdateProfileSaga;
