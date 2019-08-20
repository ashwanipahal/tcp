import { call, put, takeLatest, select } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from './productsRequestFormatter';

function* fetchPlpProducts() {
  try {
    const state = yield select();
    const instanceProductListing = new Abstractor();
    const operatorInstance = new ProductsOperator();
    const reqObj = operatorInstance.getProductListingBucketedData(state, window.location);
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    yield put(setPlpProducts({ ...plpProducts }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
}

export default ProductListingPageSaga;
