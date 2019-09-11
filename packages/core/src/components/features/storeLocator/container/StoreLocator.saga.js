import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import STORE_LOCATOR_CONSTANTS from './StoreLocator.constants';
import { getSetDefaultStoreActn, getSetGeoDefaultStoreActn } from './StoreLocator.actions';
import { getFavoriteStore } from '../../../../services/abstractors/common/storeLocator';

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

export function* StoreLocatorSaga() {
  const cachedFavoriteStore = validateReduxCache(getFavoriteStoreSaga);
  yield takeLatest(STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE, cachedFavoriteStore);
}

export default StoreLocatorSaga;
