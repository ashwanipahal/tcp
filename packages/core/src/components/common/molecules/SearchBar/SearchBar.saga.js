import { takeLatest, call, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import SEARCH_CONSTANTS from './SearchBar.constants';
import { setSearchResult, setShowMoreProductFlag } from './SearchBar.actions';

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
    if (
      response.autosuggestList[0].suggestions.length <= 0 &&
      response.autosuggestList[1].suggestions.length <= 0 &&
      response.autosuggestProducts.length <= 0
    ) {
      yield put(setShowMoreProductFlag(false));
    } else {
      yield put(setSearchResult(response));
      yield put(setShowMoreProductFlag(true));
    }
  } catch (err) {
    logger.error('Error: error in fetching Search bar results ');
  }
}

function* SearchBarSaga() {
  yield takeLatest(SEARCH_CONSTANTS.START_SEARCH, getSearchResult);
}

export default SearchBarSaga;
