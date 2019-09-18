import { takeLatest, put } from 'redux-saga/effects';
import constants from './StoreSearch.constants';
// TBD: Update sagas for container components with contextual ones
import { testOne, testTwo } from './StoreSearch.actions';

export function* StoreSearchTest({ payload }) {
  try {
    return yield put(testOne(payload));
  } catch (err) {
    return yield put(testTwo(err));
  }
}

export function* StoreSearchSaga() {
  yield takeLatest(constants.STORE_SEARCH_TEST_ACTION, StoreSearchTest);
}

export default StoreSearchSaga;
