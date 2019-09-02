import { call, put, takeLatest, select } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import {
  setPlpProducts,
  setListingFirstProductsPage,
  setPlpLoadingState,
} from './ProductListing.actions';
// import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from './productsRequestFormatter';

const instanceProductListing = new Abstractor();
const operatorInstance = new ProductsOperator();

function* fetchPlpProducts({ payload }) {
  try {
    const { url } = payload;
    const location = url
      ? {
          pathname: url,
        }
      : window.location;
    const state = yield select();
    let reqObj = operatorInstance.getProductListingBucketedData(state, location);
    if (reqObj.isFetchFiltersAndCountReq) {
      const res = yield call(instanceProductListing.getProducts, reqObj);
      reqObj = operatorInstance.processProductFilterAndCountData(res, state, reqObj);
    }
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    operatorInstance.updateBucketingConfig(plpProducts);
    yield put(setListingFirstProductsPage({ ...plpProducts }));
    yield put(setPlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    console.log(err);
  }
}

function* fetchMoreProducts() {
  try {
    const state = yield select();
    yield put(setPlpLoadingState({ isLoadingMore: true }));
    const reqObj = operatorInstance.getMoreBucketedProducts(state);
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    operatorInstance.updateBucketingConfig(plpProducts);
    yield put(setPlpProducts({ ...plpProducts }));
    yield put(setPlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductListingSaga() {
  // const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  // const cachedFetchMoreProducts = validateReduxCache(fetchMoreProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.GET_MORE_PRODUCTS, fetchMoreProducts);
}

export default ProductListingSaga;
