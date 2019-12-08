import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import { setDefaultStore as setDefaultStoreUserAction } from '@tcp/core/src/components/features/account/User/container/User.actions';
import {
  getIsGuest,
  getUserLoggedInState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import STORE_LOCATOR_CONSTANTS from './StoreLanding.constants';
import { setStoresByCoordinates } from './StoreLanding.actions';
import { isMobileApp } from '../../../../../utils';
import errorMessage from '../../../../../services/handler/stateful/errorResponseMapping/index.json';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';

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
    if (isMobileApp())
      yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
  }
}

export function* getFavoriteStoreSaga({ payload }) {
  try {
    const { geoLatLang: { lat = null, long = null } = {} } = payload;
    const isGuest = yield select(getIsGuest);
    const isUserLoggedIn = yield select(getUserLoggedInState);
    const isGenericGuest = !(isGuest || isUserLoggedIn);
    if (isGenericGuest && lat === null && long === null) {
      return yield put(setDefaultStoreUserAction(null));
    }
    const res = yield call(getFavoriteStore, payload);
    if (res && res.basicInfo) {
      return yield put(setDefaultStoreUserAction(res));
    }
    return yield put(setDefaultStoreUserAction(null));
  } catch (err) {
    if (isMobileApp() && err) {
      console.log(err);
      return yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
    }
    return yield put(setDefaultStoreUserAction(null));
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
    if (isMobileApp())
      yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
  }
}

export function* StoreLocatorSaga() {
  const cachedFavoriteStore = validateReduxCache(getFavoriteStoreSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE, cachedFavoriteStore);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.SET_FAVORITE_STORE, setFavoriteStoreSaga);
}

export default StoreLocatorSaga;
