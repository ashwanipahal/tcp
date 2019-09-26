import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import { setDefaultStore as setDefaultStoreUserAction } from '@tcp/core/src/components/features/account/User/container/User.actions';
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
    yield put(setDefaultStoreUserAction(res));
  } catch (err) {
    yield null;
  }
}

export function* setFavoriteStoreSaga({ payload }) {
  try {
    const state = yield select();
    console.log('::::', payload);
    const res = yield call(setFavoriteStore, payload.basicInfo.id, state);
    console.log('////', res);
    if (res) {
      yield put(setDefaultStoreUserAction(payload));
    }
    yield;
  } catch (err) {
    yield null;
  }
}

export function* StoreLocatorSaga() {
  const cachedFavoriteStore = validateReduxCache(getFavoriteStoreSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE, cachedFavoriteStore);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.SET_FAVORITE_STORE, setFavoriteStoreSaga);
}

export default StoreLocatorSaga;
