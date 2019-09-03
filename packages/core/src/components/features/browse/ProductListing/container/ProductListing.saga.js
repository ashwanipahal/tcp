import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from './productsRequestFormatter';

function* fetchPlpProducts({ payload }) {
  try {
    const { url } = payload;
    const location = url
      ? {
          pathname: url,
        }
      : window.location;
    const state = yield select();
    const instanceProductListing = new Abstractor();
    const operatorInstance = new ProductsOperator();
    const reqObj = operatorInstance.getProductListingBucketedData(state, location);
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    yield put(setPlpProducts({ ...plpProducts }));
  } catch (err) {
    logger.error(err);
  }
}

function* ProductListingSaga() {
  const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
}

export default ProductListingSaga;
