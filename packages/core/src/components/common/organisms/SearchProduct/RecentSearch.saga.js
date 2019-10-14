import { takeLatest, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';

import RECENT_SEARCH_CONSTANTS from './RecentSearch.constants';
import { setRecentSearch } from './RecentSearch.actions';

export function* recentSearch({ payload }) {
  try {
    yield put(setRecentSearch(payload));
  } catch (err) {
    logger.error('Error: error in saving recent searches');
  }
}

function* RecentSearchSaga() {
  yield takeLatest(RECENT_SEARCH_CONSTANTS.SET_RECENT_SEARCH_DATA, recentSearch);
}

export default RecentSearchSaga;
