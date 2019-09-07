import { call, takeLatest, put } from 'redux-saga/effects';
import CONSTANTS from '../BirthdaySavingsList.constants';
import { setUserChildren } from '../../../../User/container/User.actions';
import { getChildren, deleteChild } from '../../../../../../../services/abstractors/account';
import {
  getChildrenAction,
  updateBirthdaySavingSuccess,
  updateBirthdaySavingError,
} from './BirthdaySavingsList.actions';

/**
 * @function getChildrenSaga
 * @description This function will call getChildren Abstractor to get children birthday saving list
 */
export function* getChildrenSaga() {
  try {
    const response = yield call(getChildren);
    yield put(
      setUserChildren({
        children: response,
      })
    );
  } catch (err) {
    console.log("Error: error in fetching user's children birthday savings list");
  }
}

/**
 * @function removeChildSaga
 * @description This function will call getChildren Abstractor to get children birthday saving list
 */
export function* removeChildSaga({ payload }) {
  try {
    const response = yield call(deleteChild, payload);
    yield put(getChildrenAction());
    yield put(updateBirthdaySavingSuccess(response));
  } catch (err) {
    yield put(updateBirthdaySavingError(err));
  }
}

/**
 * @function BirthdaySavingsListSaga
 * @description watcher function for getChildrenSaga.
 */
export function* BirthdaySavingsListSaga() {
  yield takeLatest(CONSTANTS.GET_CHILDREN, getChildrenSaga);
  yield takeLatest(CONSTANTS.REMOVE_CHILD, removeChildSaga);
}

export default BirthdaySavingsListSaga;
