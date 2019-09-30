import { call, takeLatest, put } from 'redux-saga/effects';
import {
  getCurrentStoreInfoApi,
  getNearByStoreApi,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import constants from './StoreDetail.constants';
import { setCurrentStoreInfo, setNearByStore } from './StoreDetail.actions';

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

export function* StoreDetailSaga() {
  yield takeLatest(constants.GET_CURRENT_STORE, getCurrentStore);
  yield takeLatest(constants.GET_SUGGESTED_STORE, getNearByStore);
}

export default StoreDetailSaga;
