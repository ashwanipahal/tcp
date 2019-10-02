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
  } catch (error) {
    if (error && error.errorResponse) {
      return yield put(updateProfileError(error.errorResponse));
    }
    return yield put(updateProfileError(error));
  }
}

export function* UpdateProfileSaga() {
  yield takeLatest(constants.UPDATE_PROFILE, UpdateProfile);
}

export default UpdateProfileSaga;
