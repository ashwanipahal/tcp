import { call, put, takeLatest } from 'redux-saga/effects';
import NavigationAbstractor from '../../../../../services/abstractors/bootstrap/navigation';
import { loadNavigationData } from './Navigation.actions';
import { FETCH_NAVIGATION_DATA } from './Navigation.constants';

function* fetchNavigationData() {
  const result = yield call(NavigationAbstractor.getData, 'navigation');
  yield put(loadNavigationData(result));
}

function* NavigationSaga() {
  yield takeLatest(FETCH_NAVIGATION_DATA, fetchNavigationData);
}

export default NavigationSaga;
