// import { call, put, takeLatest } from 'redux-saga/effects';
// import NavigationAbstractor from '../../../../../services/abstractors/bootstrap/navigation';
// import { loadNavigationData } from './Navigation.actions';
import { FETCH_NAVIGATION_DATA } from './Navigation.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';

function* fetchNavigationData() {
  // const result = yield call(NavigationAbstractor.getData, 'navigation');
  // yield put(loadNavigationData(result));
}

function* NavigationSaga() {
  const cachedFetchNavigation = validateReduxCache(fetchNavigationData);
  // eslint-disable-next-line no-undef
  yield takeLatest(FETCH_NAVIGATION_DATA, cachedFetchNavigation);
}

export default NavigationSaga;
