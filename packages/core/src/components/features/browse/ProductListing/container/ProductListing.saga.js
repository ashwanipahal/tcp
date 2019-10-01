import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import {
  setPlpProducts,
  setListingFirstProductsPage,
  setPlpLoadingState,
} from './ProductListing.actions';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from './productsRequestFormatter';

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

const getUrl = url => {
  return url
    ? {
        pathname: url,
      }
    : window.location;
};
export function* fetchPlpProducts({ payload }) {
  try {
    const { url, formData, sortBySelected, scrollToTop } = payload;
    const location = getUrl(url);
    let state = yield select();
    yield put(setPlpLoadingState({ isLoadingMore: true, isScrollToTop: scrollToTop }));
    let reqObj = operatorInstance.getProductListingBucketedData(
      state,
      location,
      sortBySelected,
      formData,
      1
    );
    if (reqObj.isFetchFiltersAndCountReq) {
      const res = yield call(instanceProductListing.getProducts, reqObj, state);
      yield put(setListingFirstProductsPage({ ...res }));
      state = yield select();
      reqObj = operatorInstance.processProductFilterAndCountData(res, state, reqObj);
    }
    if (reqObj && reqObj.categoryId) {
      const plpProducts = yield call(instanceProductListing.getProducts, reqObj, state);
      if (plpProducts) {
        operatorInstance.updateBucketingConfig(plpProducts);
        yield put(setListingFirstProductsPage({ ...plpProducts }));
      }
    }
    yield put(setPlpLoadingState({ isLoadingMore: false, isScrollToTop: false }));
  } catch (err) {
    logger.error(err);
  }
}

export function* fetchMoreProducts({ payload = {} }) {
  try {
    const { url } = payload;
    const location = getUrl(url);
    let state = yield select();
    yield put(setPlpLoadingState({ isLoadingMore: true }));
    const reqObj = operatorInstance.getMoreBucketedProducts(state, location);
    if (reqObj && reqObj.categoryId) {
      state = yield select();
      const plpProducts = yield call(instanceProductListing.getProducts, reqObj, state);
      if (
        plpProducts &&
        plpProducts.loadedProductsPages &&
        plpProducts.loadedProductsPages[0] &&
        plpProducts.loadedProductsPages[0].length
      ) {
        operatorInstance.updateBucketingConfig(plpProducts);
        yield put(setPlpProducts({ ...plpProducts }));
      }
    }
    yield put(setPlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    logger.error(err);
  }
}

function* ProductListingSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.GET_MORE_PRODUCTS, fetchMoreProducts);
}

export default ProductListingSaga;
