import { call, takeLatest, put } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader';
import constants from '../AddEditPersonalInformation.constants';
import { getUserInfo } from '../../User/container/User.actions';
import { updateProfileError } from './AddEditPersonalInformation.actions';
import { updateProfileSuccess } from '../../MyProfile/container/MyProfile.actions';

import { UpdateProfileInfo } from '../../../../../services/abstractors/account';

export function* UpdateProfile({ payload }) {
  yield put(setLoaderState(true));
  try {
    const res = yield call(UpdateProfileInfo, payload);
    yield put(setLoaderState(false));
    yield put(getUserInfo());
    return yield put(updateProfileSuccess(res));
  } catch (error) {
    yield put(setLoaderState(false));
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
