import { call, takeLatest, put } from 'redux-saga/effects';
import { getLocationStores } from '@tcp/core/src/services/abstractors/common/storeLocator';
import STORE_LOCATOR_CONSTANTS from './StoreSearch.constants';
import { setStoresByCoordinates } from './StoreSearch.actions';

export function* fetchLocationStoresSaga({ payload }) {
  try {
    const res = yield call(getLocationStores, payload);
    yield put(setStoresByCoordinates(res));
  } catch (err) {
    yield null;
  }
}

export function* StoreLocatorSaga() {
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga);
}

export default StoreLocatorSaga;
