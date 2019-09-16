import { takeLatest, put } from 'redux-saga/effects';
import constants from './MyComponent.constants';
// TBD: Update sagas for container components with contextual ones
import { testOne, testTwo } from './MyComponent.actions';

export function* MyComponentTest({ payload }) {
  try {
    return yield put(testOne(payload));
  } catch (err) {
    return yield put(testTwo(err));
  }
}

export function* MyComponentSaga() {
  yield takeLatest(constants.MY_COMPONENT_TEST_ACTION, MyComponentTest);
}

export default MyComponentSaga;
