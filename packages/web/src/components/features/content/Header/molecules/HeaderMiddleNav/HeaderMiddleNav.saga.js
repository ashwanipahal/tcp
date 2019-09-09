import { takeLatest, call, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import HEADER_MIDDLE_CONSTANTS from './HeaderMiddleNav.constants';
import { setSearchResult } from './HeaderMiddleNav.actions';
import HMNConfig from './HeaderMiddleNav.config';

export function* getSearchResult({ payload }) {
  try {
    const response = yield call(makeSearch, {
      searchTerm: payload,
      ...HMNConfig.searchApiConfig,
    });
    yield put(setSearchResult(response));
  } catch (err) {
    logger.error('Error: error in fetching Search bar results ');
  }
}

function* HeaderMiddleNavSaga() {
  yield takeLatest(HEADER_MIDDLE_CONSTANTS.START_SEARCH, getSearchResult);
}

export default HeaderMiddleNavSaga;
