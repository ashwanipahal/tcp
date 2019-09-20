/* eslint-disable */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import SLP_CONSTANTS from './SearchDetail.constants';
import {
  setSlpProducts,
  setSlpLoadingState,
  setSlpSearchTerm,
  setListingFirstProductsPage,
} from './SearchDetail.actions';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from '../../ProductListing/container/productsRequestFormatter';
import { getLastLoadedPageNumber, getMaxPageNumber } from './SearchDetail.selectors';

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

export function* fetchSlpProducts({ payload }) {
  try {
    const { searchQuery, asPath, formData } = payload;
    const state = yield select();
    yield put(setSlpLoadingState({ isLoadingMore: true }));
    yield put(setSlpSearchTerm({ searchTerm: searchQuery }));

    const reqObj = operatorInstance.getProductsListingFilters({
      state,
      formData,
      asPath,
      pageNumber: 1,
    });
    const res = yield call(instanceProductListing.getProducts, reqObj, state);
    yield put(setListingFirstProductsPage({ ...res }));
    yield put(setSlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    logger.error(err);
  }
}

export function* fetchMoreProducts() {
  try {
    const state = yield select();
    yield put(setSlpLoadingState({ isLoadingMore: true }));
    const appliedFiltersIds = state.SearchListingPage.get('appliedFiltersIds');
    const sort = (state.SearchListingPage && state.SearchListingPage.get('appliedSortId')) || '';

    const appliedFiltersAndSort = { ...appliedFiltersIds, sort };

    const lastLoadedPageNumber = getLastLoadedPageNumber(state);
    // if (lastLoadedPageNumber >= getMaxPageNumber(state)) {
    //   return null; // nothing more to load
    // }

    const reqObj = operatorInstance.getProductsListingInfo({
      state,
      appliedFiltersAndSort,
      pageNumber: lastLoadedPageNumber + 1,
    });

    // const reqObj = operatorInstance.getProductsListingFilters();
    const res = yield call(instanceProductListing.getProducts, reqObj, state);
    yield put(setSlpProducts({ ...res }));
    yield put(setSlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    logger.error(err);
  }
}

function* SearchPageSaga() {
  yield takeLatest(SLP_CONSTANTS.FETCH_SLP_PRODUCTS, fetchSlpProducts);
  yield takeLatest(SLP_CONSTANTS.GET_MORE_SLP_PRODUCTS, fetchMoreProducts);
}

export default SearchPageSaga;
