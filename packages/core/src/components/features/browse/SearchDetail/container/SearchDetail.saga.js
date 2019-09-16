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

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

export function* fetchSlpProducts({ payload }) {
  try {
    const { sq } = payload;
    const state = yield select();
    yield put(setSlpSearchTerm({ searchTerm: sq }));

    const reqObj = operatorInstance.getProductsListingInfo({
      state,
      filtersAndSort: {},
      pageNumber: 1,
      // TODO - fix this for mobile APP - location needs to be defined
      location: window.location, // TODO - this is the prod code - location = routingInfoStoreView.getHistory(this.store.getState()).location,
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

function* SearchPageSaga() {
  yield takeLatest(SLP_CONSTANTS.FETCH_SLP_PRODUCTS, fetchSlpProducts);
  yield takeLatest(SLP_CONSTANTS.GET_MORE_SLP_PRODUCTS, fetchMoreProducts);
}

export default SearchPageSaga;
