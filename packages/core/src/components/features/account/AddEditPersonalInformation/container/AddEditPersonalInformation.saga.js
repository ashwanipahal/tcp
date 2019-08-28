import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../AddEditPersonalInformation.constants';
import { updateProfileError, updateProfileSuccess } from './AddEditPersonalInformation.actions';

import { UpdateProfileInfo } from '../../../../../services/abstractors/account';

export function* UpdateProfile({ payload }) {
  try {
    const res = yield call(UpdateProfileInfo, payload);
    return yield put(updateProfileError(res));
  } catch (err) {
    return yield put(updateProfileSuccess(err));
  }
}

export function* UpdateProfileSaga() {
  yield takeLatest(constants.UPDATE_PROFILE, UpdateProfile);
}

export default UpdateProfileSaga;
