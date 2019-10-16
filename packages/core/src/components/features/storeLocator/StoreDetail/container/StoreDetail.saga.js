import { call, takeLatest, put, all } from 'redux-saga/effects';
import { getModuleX } from '@tcp/core/src/services/abstractors/common/moduleX';
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

export function* fetchModuleX({ payload = {} }) {
  try {
    const moduleXResponses = yield all([
      call(getModuleX, payload[0].contentId),
      call(getModuleX, payload[1].contentId),
      call(getModuleX, payload[2].contentId),
      call(getModuleX, payload[3].contentId),
    ]);
    const putDescriptorParams = moduleXResponses.map((item, i) => ({
      key: payload[i].name,
      value: moduleXResponses[i].richText,
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
