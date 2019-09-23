import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import makeSearch from '@tcp/core/src/services/abstractors/common/searchBar';
import SLP_CONSTANTS from './SearchDetail.constants';
import {
  setSlpProducts,
  setSlpLoadingState,
  setSlpSearchTerm,
  setListingFirstProductsPage,
} from './SearchDetail.actions';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from '../../ProductListing/container/productsRequestFormatter';
import { setSearchResult } from '../../../../../../../web/src/components/features/content/Header/molecules/SearchBar/SearchBar.actions';

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

export function* fetchSlpProducts({ payload }) {
  try {
    const { searchQuery, asPath, formData } = payload;
    const state = yield select();
    yield put(setSlpSearchTerm({ searchTerm: searchQuery }));

    const reqObj = operatorInstance.getProductsListingFilters({
      state,
      formData,
      asPath,
      pageNumber: 1,
    });
    const res = yield call(instanceProductListing.getProducts, reqObj, state);
    yield put(setListingFirstProductsPage({ ...res }));
  } catch (err) {
    logger.error(err);
  }
}

export function* fetchMoreProducts() {
  try {
    let state = yield select();
    yield put(setSlpLoadingState({ isLoadingMore: true }));
    const reqObj = operatorInstance.getMoreBucketedProducts(state);
    if (reqObj && reqObj.categoryId) {
      state = yield select();
      const slpProducts = yield call(instanceProductListing.getProducts, reqObj, state);
      if (
        slpProducts &&
        slpProducts.loadedProductsPages &&
        slpProducts.loadedProductsPages[0] &&
        slpProducts.loadedProductsPages[0].length
      ) {
        yield put(setSlpProducts({ ...slpProducts }));
      }
    }
    yield put(setSlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    logger.error(err);
  }
}

export function* fetchSlpSearchResults({ payload }) {
  const searchApiConfig = {
    categoryCount: 4,
    topQueriesCount: 4,
    productsCounts: 4,
    suggestionsCount: 4,
  };

  try {
    const response = yield call(makeSearch, {
      searchTerm: payload,
      ...searchApiConfig,
    });
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
