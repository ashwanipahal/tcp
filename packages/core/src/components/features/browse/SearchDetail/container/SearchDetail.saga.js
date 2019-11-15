import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import SLP_CONSTANTS from './SearchDetail.constants';
import { SLP_PAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import {
  setSlpProducts,
  setSlpLoadingState,
  setSlpSearchTerm,
  setListingFirstProductsPage,
  setSlpResultsAvailableState,
} from './SearchDetail.actions';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from '../../ProductListing/container/productsRequestFormatter';
import { setSearchResult } from '../../../../common/molecules/SearchBar/SearchBar.actions';
import { getLastLoadedPageNumber } from './SearchDetail.selectors';

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

const getUrl = url => {
  return url
    ? {
        pathname: url,
      }
    : window.location;
};

export function* fetchSlpProducts({ payload }) {
  try {
    const { searchQuery, asPath, formData, url, scrollToTop } = payload;
    const location = getUrl(url);
    const state = yield select();
    yield put(
      setSlpLoadingState({
        isLoadingMore: true,
        isScrollToTop: scrollToTop || false,
      })
    );
    yield put(setSlpResultsAvailableState({ isSearchResultsAvailable: false }));

    yield put(setSlpSearchTerm({ searchTerm: searchQuery }));

    const reqObj = operatorInstance.getProductsListingFilters({
      state,
      formData,
      asPath,
      pageNumber: 1,
      location,
    });
    const res = yield call(instanceProductListing.getProducts, reqObj, state);
    if (res) {
      yield put(setListingFirstProductsPage({ ...res }));
    }
    yield put(setSlpLoadingState({ isLoadingMore: false, isScrollToTop: false }));
    yield put(setSlpResultsAvailableState({ isSearchResultsAvailable: true }));
  } catch (err) {
    logger.error(err);
  }
}

export function* fetchMoreProducts({ payload = {} }) {
  try {
    const { url } = payload;
    const state = yield select();
    const location = getUrl(url);
    yield put(setSlpLoadingState({ isLoadingMore: true }));
    yield put(setSlpResultsAvailableState({ isSearchResultsAvailable: false }));

    const { appliedFiltersIds } = state[SLP_PAGE_REDUCER_KEY];
    const sort = (state[SLP_PAGE_REDUCER_KEY] && state[SLP_PAGE_REDUCER_KEY].appliedSortId) || '';

    const appliedFiltersAndSort = { ...appliedFiltersIds, sort };

    const lastLoadedPageNumber = getLastLoadedPageNumber(state);
    const reqObj = operatorInstance.getProductsListingInfo({
      state,
      filtersAndSort: appliedFiltersAndSort,
      pageNumber: lastLoadedPageNumber + 1,
      location,
      isLazyLoading: true,
    });
    const res = yield call(instanceProductListing.getProducts, reqObj, state);
    if (res) {
      yield put(setSlpProducts({ ...res }));
    }
    yield put(setSlpLoadingState({ isLoadingMore: false }));
    yield put(setSlpResultsAvailableState({ isSearchResultsAvailable: true }));
  } catch (err) {
    logger.error(err);
    yield put(setSlpLoadingState({ isLoadingMore: false }));
  }
}

export function* fetchSlpSearchResults({ payload }) {
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

function* SearchPageSaga() {
  yield takeLatest(SLP_CONSTANTS.FETCH_SLP_PRODUCTS, fetchSlpProducts);
  yield takeLatest(SLP_CONSTANTS.GET_MORE_SLP_PRODUCTS, fetchMoreProducts);
  yield takeLatest(SLP_CONSTANTS.GET_SLP_SEARCH_RESULTS, fetchSlpSearchResults);
}

export default SearchPageSaga;
