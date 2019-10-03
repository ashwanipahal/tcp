import { takeLatest, call, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import SEARCH_CONSTANTS from './SearchBar.constants';
import { setSearchResult } from './SearchBar.actions';
import SBConfig from './SearchBar.config';

export function* getSearchResult({ payload }) {
  try {
    const response = yield call(makeSearch, {
      searchTerm: payload,
      ...SBConfig.searchApiConfig,
    });
    yield put(setSearchResult(response));
  } catch (err) {
    logger.error('Error: error in fetching Search bar results ');
  }
}

function* SearchBarSaga() {
  yield takeLatest(SEARCH_CONSTANTS.START_SEARCH, getSearchResult);
}

export default SearchBarSaga;
