/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';
import { PRODUCTLISTINGPAGE_CONSTANTS } from '../ProductListingPage.constants';
import { setPlpProducts, setGiftCardProducts } from './ProductListingPage.actions';
import fetchData from '../../../../../service/API';
import {
  getPlpProducts,
  getGiftCardProducts,
} from '../../../../../services/abstractors/CnC/AddedToBag';
import endpoints from '../../../../../service/endpoint';
import { validateReduxCache } from '../../../../../utils/cache.util';

function* fetchProducts(action) {
  try {
    const products = yield call(getPlpProducts);
    yield put(setPlpProducts(products));
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* fetchGiftProducts(action) {
  try {
    const products = yield call(getGiftCardProducts);
    yield put(setGiftCardProducts(products));
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  // A HOF which prevents calling fetchProducts when data in redux exists (within ttl)
  const cachedFetchProducts = validateReduxCache(fetchProducts);
  const cachedFetchGiftProducts = validateReduxCache(fetchGiftProducts);
  yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
  yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_GIFT_CARD_PRODUCTS, cachedFetchGiftProducts);
}

export default ProductListingPageSaga;
