import { call, takeLatest, put } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../utils/cache.util';
import STORE_LOCATOR_CONSTANTS from './StoreLocator.constants';
import {
  getSetDefaultStoreActn,
  getSetGeoDefaultStoreActn,
  setStoresByLatLng,
} from './StoreLocator.actions';
import {
  getFavoriteStore,
  getLocationStores,
} from '../../../../services/abstractors/common/storeLocator';

export function* getFavoriteStoreSaga({ payload }) {
  try {
    const res = yield call(getFavoriteStore, payload);
    if (res && res.basicInfo && !res.basicInfo.isDefault) {
      // setting store as user's geo default store in state not fav store
      yield put(getSetGeoDefaultStoreActn(res));
    } else {
      yield put(getSetDefaultStoreActn(res));
    }
  } catch (err) {
    return yield null;
  }
}

export function* fetchLocationStoresSaga({ payload }) {
  try {
    const res = yield call(getLocationStores, payload);
    yield put(setStoresByLatLng(res));
  } catch (err) {
    yield null;
  }
}

export function* StoreLocatorSaga() {
  const cachedFavoriteStore = validateReduxCache(getFavoriteStoreSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE, cachedFavoriteStore);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga);
}

export default StoreLocatorSaga;
