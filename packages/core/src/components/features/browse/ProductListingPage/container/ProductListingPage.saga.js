/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';
import { PRODUCTLISTINGPAGE_CONSTANTS } from '../ProductListingPage.constants';
import { setPlpProducts } from './ProductListingPage.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { validateCache } from '../../../../../utils/cache-util';

function* fetchProducts(action) {
  try {
    const isCacheValid = yield validateCache(action);
    if (isCacheValid) {
      return null;
    }
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
  yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS, fetchProducts);
}

export default ProductListingPageSaga;
