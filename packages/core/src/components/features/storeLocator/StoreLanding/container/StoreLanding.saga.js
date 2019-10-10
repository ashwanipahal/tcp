import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import { setDefaultStore as setDefaultStoreUserAction } from '@tcp/core/src/components/features/account/User/container/User.actions';
import STORE_LOCATOR_CONSTANTS from './StoreLanding.constants';
import { setStoresByCoordinates } from './StoreLanding.actions';

export function* fetchLocationStoresSaga({ payload }) {
  try {
    const res = yield call(getLocationStores, payload);
    if (res && Array.isArray(res)) {
      yield put(setStoresByCoordinates(res));
    } else {
      yield put(setStoresByCoordinates([]));
      throw res;
    }
  } catch (err) {
    yield put(setStoresByCoordinates([]));
  }
}

export function* getFavoriteStoreSaga({ payload }) {
  try {
    const state = yield select();
    const res = yield call(getFavoriteStore, payload, state);
    if (res && res.basicInfo) {
      yield put(setDefaultStoreUserAction(res));
    } else {
      throw res;
    }
  } catch (err) {
    yield null;
  }
}

export function* setFavoriteStoreSaga({ payload }) {
  try {
    const state = yield select();
    const res = yield call(setFavoriteStore, payload.basicInfo.id, state, payload.key, payload);
    if (res) {
      yield put(setDefaultStoreUserAction(payload));
    }
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
