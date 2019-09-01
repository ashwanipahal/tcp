import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../AddEditPersonalInformation.constants';
import { getUserInfo } from '../../User/container/User.actions';
import { updateProfileError } from './AddEditPersonalInformation.actions';
import { myProfileSuccess } from '../../MyProfile/container/MyProfile.actions';

import { UpdateProfileInfo } from '../../../../../services/abstractors/account';

export function* UpdateProfile({ payload }) {
  try {
    const res = yield call(UpdateProfileInfo, payload);
    yield put(getUserInfo());
    return yield put(myProfileSuccess(res));
  } catch (err) {
    return yield put(updateProfileError(err));
  }
}

export function* UpdateProfileSaga() {
  yield takeLatest(constants.UPDATE_PROFILE, UpdateProfile);
}

export default UpdateProfileSaga;
