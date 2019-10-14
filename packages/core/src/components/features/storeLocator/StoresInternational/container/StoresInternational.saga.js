import { call, takeLatest, put } from 'redux-saga/effects';
import { getModuleX } from '@tcp/core/src/services/abstractors/common/moduleX';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import STORES_INTL_CONSTANTS from './StoresInternational.constants';
import { setModuleXContent } from './StoresInternational.actions';

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleXContent(result.richText));
  } catch (err) {
    yield null;
  }
}

export function* StoresInternationalSaga() {
  const cachedModuleX = validateReduxCache(fetchModuleX);
  yield takeLatest(STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_GET_MODULEX, cachedModuleX);
}

export default StoresInternationalSaga;
