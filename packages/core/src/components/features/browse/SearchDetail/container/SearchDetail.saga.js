import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import SLP_CONSTANTS from './SearchDetail.constants';
import { SLP_PAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import {
  setSlpProducts,
  setSlpLoadingState,
  setSlpSearchTerm,
  setListingFirstProductsPage,
} from './SearchDetail.actions';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from '../../ProductListing/container/productsRequestFormatter';
import { getLastLoadedPageNumber } from './SearchDetail.selectors';

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
    const appliedFiltersIds = state[SLP_PAGE_REDUCER_KEY].get('appliedFiltersIds');
    const sort =
      (state[SLP_PAGE_REDUCER_KEY] && state[SLP_PAGE_REDUCER_KEY].get('appliedSortId')) || '';

    const appliedFiltersAndSort = { ...appliedFiltersIds, sort };

    const lastLoadedPageNumber = getLastLoadedPageNumber(state);
    const reqObj = operatorInstance.getProductsListingInfo({
      state,
      filtersAndSort: appliedFiltersAndSort,
      pageNumber: lastLoadedPageNumber + 1,
    });

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
