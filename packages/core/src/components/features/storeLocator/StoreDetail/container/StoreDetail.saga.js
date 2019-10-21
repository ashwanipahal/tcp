import { call, takeLatest, put, all } from 'redux-saga/effects';
import { getModuleX } from '@tcp/core/src/services/abstractors/common/moduleXComposite';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getCurrentStoreInfoApi,
  getNearByStoreApi,
  calcDistanceByLatLng,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import constants from './StoreDetail.constants';
import {
  setCurrentStoreInfo,
  setNearByStore,
  setModuleXContent,
  setDistance,
} from './StoreDetail.actions';

export function* getCurrentStore({ payload }) {
  try {
    const res = yield call(getCurrentStoreInfoApi, payload);
    return yield put(setCurrentStoreInfo(res));
  } catch (err) {
    return yield null;
  }
}

export function* getNearByStore({ payload }) {
  try {
    const res = yield call(getNearByStoreApi, payload);
    return yield put(setNearByStore(res));
  } catch (err) {
    return yield null;
  }
}

export function* fetchModuleX({ payload = [] }) {
  try {
    const moduleXResponses = yield call(getModuleX, payload);
    const putDescriptorParams = Object.keys(moduleXResponses).map(item => ({
      key: item,
      value: moduleXResponses[item],
    }));
    return yield all([
      put(setModuleXContent(putDescriptorParams[0])),
      put(setModuleXContent(putDescriptorParams[1])),
      put(setModuleXContent(putDescriptorParams[2])),
      put(setModuleXContent(putDescriptorParams[3])),
    ]);
  } catch (err) {
    return yield null;
  }
}

export function* calculateDistance({ payload }) {
  try {
    const distance = yield call(calcDistanceByLatLng, payload.destination);
    console.log(distance);
    yield put(setDistance(distance));
  } catch (err) {
    yield put(setDistance(null));
  }
}

export function* StoreDetailSaga() {
  const cachedModuleX = validateReduxCache(fetchModuleX);
  const cachedDistance = validateReduxCache(calculateDistance);
  yield takeLatest(constants.GET_CURRENT_STORE, getCurrentStore);
  yield takeLatest(constants.GET_SUGGESTED_STORE, getNearByStore);
  yield takeLatest(constants.GET_MODULEX_CONTENT, cachedModuleX);
  yield takeLatest(constants.GET_DISTANCE, cachedDistance);
}

export default StoreDetailSaga;
