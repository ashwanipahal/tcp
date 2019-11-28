import { call, takeLatest, put, all } from 'redux-saga/effects';
import { getAPIConfig } from '@tcp/core/src/utils';
import { defaultChannel } from '@tcp/core/src/services/api.constants';
import { getNavigationData } from '@tcp/core/src/services/abstractors/common/subNavigation';
import { setSubNavigationData } from '../actions';
import GLOBAL_CONSTANTS from '../constants';

export function* getSubnavigation({ payload }) {
  try {
    const { brand, country } = getAPIConfig();
    const results = yield all(
      payload.map(subNavKey => call(getNavigationData, subNavKey, brand, country, defaultChannel))
    );
    yield all(results.map(res => put(setSubNavigationData(res.val, res.key))));
  } catch (err) {
    yield null;
  }
}

export function* SubNavigationSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.GET_SUB_NAVIGATION_DATA, getSubnavigation);
}

export default SubNavigationSaga;
