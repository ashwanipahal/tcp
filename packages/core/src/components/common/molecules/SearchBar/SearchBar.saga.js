import { takeLatest, call, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import SEARCH_CONSTANTS from './SearchBar.constants';
import { setSearchResult } from './SearchBar.actions';

export function* getSearchResult({ payload }) {
  const suggestionsCount = {
    category: 4,
    keywords: 4,
    promotedTopQueries: 4,
  };

  const isHideBundleProduct = false;
  const payloadData = {
    searchTerm: payload.searchText,
    suggestionsCount,
    isHideBundleProduct,
    slpLabels: payload.slpLabels,
  };
  try {
    const response = yield call(makeSearch, payloadData);
    yield put(setSearchResult(response));
  } catch (err) {
    logger.error('Error: error in fetching Search bar results ');
  }
}

function* SearchBarSaga() {
  yield takeLatest(SEARCH_CONSTANTS.START_SEARCH, getSearchResult);
}

export default SearchBarSaga;
