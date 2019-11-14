import { call, put, takeLatest } from 'redux-saga/effects';
import HELPCENTER_CONSTANTS from '../HelpCenter.constants';
import { setNavigationData } from './HelpCenter.actions';
import { getNavigationData } from '@tcp/core/src/services/abstractors/common/subNavigation';

function* fetchSubnavigationData({ payload = {} }) {
  try {
    const result = yield call(getNavigationData);
    yield put(setNavigationData(result));
  } catch (err) {
    yield null;
  }
}

function* HelpCenterSaga() {
  yield takeLatest(HELPCENTER_CONSTANTS.FETCH_SUBNAVIGATION_DATA, fetchSubnavigationData);
}

export default HelpCenterSaga;
