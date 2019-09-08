import { call, takeLatest, put } from 'redux-saga/effects';
import CONSTANTS from '../BirthdaySavingsList.constants';
import { setUserPersonalData } from '../../../../User/container/User.actions';
import { getChildren } from '../../../../../../../services/abstractors/account';

/**
 * @function getChildrenSaga
 * @description This function will call getChildren Abstractor to get children birthday saving list
 */
export function* getChildrenSaga() {
  try {
    const response = yield call(getChildren);

    yield put(
      setUserPersonalData({
        children: response,
      })
    );
  } catch (err) {
    console.log("Error: error in fetching user's children birthday savings list");
  }
}

/**
 * @function BirthdaySavingsListSaga
 * @description watcher function for getChildrenSaga.
 */
export function* BirthdaySavingsListSaga() {
  yield takeLatest(CONSTANTS.GET_CHILDREN, getChildrenSaga);
}

export default BirthdaySavingsListSaga;
