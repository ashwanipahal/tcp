/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';
import { PRODUCTLISTINGPAGE_CONSTANTS } from '../ProductListingPage.constants';
import { setPlpProducts } from './ProductListingPage.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { validateReduxCache } from '../../../../../utils/cache.util';

function* fetchProducts(action) {
  try {
    const { baseURI, relURI, method } = endpoints.getPlpProducts;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        unbxd: true,
      },
      method
    );
    yield put(setPlpProducts(res.body.response.products));
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  // A HOF which prevents calling fetchProducts when data in redux exists (within ttl)
  const cachedFetchProducts = validateReduxCache(fetchProducts);
  yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
}

export default ProductListingPageSaga;
