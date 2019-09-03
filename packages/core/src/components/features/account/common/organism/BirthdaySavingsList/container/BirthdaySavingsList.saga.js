import { call, takeLatest, put } from 'redux-saga/effects';
import CONSTANTS from '../BirthdaySavingsList.constants';
import { setUserPersonalData } from '../../../../User/container/User.actions';
import { getChildren } from '../../../../../../../services/abstractors/account';

export function* getChildrenSaga() {
  try {
    const response = yield call(getChildren);

    yield put(
      setUserPersonalData({
        children: response,
      })
    );
  } catch (err) {
    console.log('Error: error in fetching user profile information');
  }
}

export function* BirthdaySavingsListSaga() {
  yield takeLatest(CONSTANTS.GET_CHILDREN, getChildrenSaga);
}

export default BirthdaySavingsListSaga;
