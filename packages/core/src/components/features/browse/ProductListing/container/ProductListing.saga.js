import { call, put, takeLatest } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts /* , setGiftCardProducts */ } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';

function* fetchPlpProducts() {
  try {
    const instanceProductListing = new Abstractor();
    const plpProducts = yield call(instanceProductListing.getProducts, {});
    console.log('plpProducts', plpProducts);
    yield put(setPlpProducts({ plpProducts }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  // A HOF which prevents calling fetchProducts when data in redux exists (within ttl)
  const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  // const cachedFetchGiftProducts = validateReduxCache(fetchGiftProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
  // yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_GIFT_CARD_PRODUCTS, cachedFetchGiftProducts);
}

export default ProductListingPageSaga;
