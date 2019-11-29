import { call, takeLatest, put, all, putResolve } from 'redux-saga/effects';
import { getModuleX } from '@tcp/core/src/services/abstractors/common/moduleXComposite';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getCurrentStoreInfoApi,
  getNearByStoreApi,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import constants from './StoreDetail.constants';
import { setCurrentStoreInfo, setNearByStore, setModuleXContent } from './StoreDetail.actions';

export function* getCurrentStore({ payload }) {
  try {
    const res = yield call(getCurrentStoreInfoApi, payload);
    return yield putResolve(setCurrentStoreInfo(res));
  } catch (err) {
    return yield null;
  }
}

export function* getNearByStore({ payload }) {
  try {
    const res = yield call(getNearByStoreApi, payload);
    return yield putResolve(setNearByStore(res));
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

export function* StoreDetailSaga() {
  const cachedModuleX = validateReduxCache(fetchModuleX);
  yield takeLatest(constants.GET_CURRENT_STORE, getCurrentStore);
  yield takeLatest(constants.GET_SUGGESTED_STORE, getNearByStore);
  yield takeLatest(constants.GET_MODULEX_CONTENT, cachedModuleX);
}

export default StoreDetailSaga;
