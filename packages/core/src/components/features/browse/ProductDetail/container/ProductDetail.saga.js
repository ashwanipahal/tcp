import { call, put, takeLatest } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductDetail.constants';
import { setProductDetails } from './ProductDetail.actions';
// import { validateReduxCache } from '../../../../../utils/cache.util';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';

function* fetchProductDetail() {
  try {
    console.log('comes in saga');
    const productDetail = yield call(getProductInfoById);
    console.log('productDetail', productDetail);
    yield put(setProductDetails({ ...productDetail }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductDetailSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCT_DETAILS, fetchProductDetail);
}

export default ProductDetailSaga;
