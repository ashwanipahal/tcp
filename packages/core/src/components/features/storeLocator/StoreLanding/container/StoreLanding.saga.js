import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import STORE_LOCATOR_CONSTANTS from './StoreLanding.constants';
import {
  getSetDefaultStoreActn,
  setStoresByCoordinates,
  getSetGeoDefaultStoreActn,
} from './StoreLanding.actions';

export function* fetchLocationStoresSaga({ payload }) {
  try {
    const res = yield call(getLocationStores, payload);
    yield put(setStoresByCoordinates(res));
  } catch (err) {
    yield null;
  }
}

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
    yield null;
  }
}

export function* setFavoriteStoreSaga({ payload }) {
  try {
    const state = yield select();
    const res = yield call(setFavoriteStore, payload, state);
    if (res) {
      yield put(getSetDefaultStoreActn(res));
    }
    yield;
  } catch (err) {
    yield null;
  }
}

export function* StoreLocatorSaga() {
  const cachedFavoriteStore = validateReduxCache(getFavoriteStoreSaga);
  const cachedSetFavoriteStore = validateReduxCache(setFavoriteStoreSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE, cachedFavoriteStore);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.SET_FAVORITE_STORE, cachedSetFavoriteStore);
}

export default StoreLocatorSaga;
