import { call, put, takeLatest, select } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductDetail.constants';
import { setProductDetails } from './ProductDetail.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';

function* fetchProductDetail({ payload: { productColorId } }) {
  try {
    const state = yield select();
    const productDetail = yield call(getProductInfoById, productColorId, state);
    console.tron.log('productDetail:', productDetail);
    yield put(setProductDetails({ ...productDetail }));
  } catch (err) {
    console.tron.log('fetchProductDetail: error', err);
  }
}

function* ProductDetailSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCT_DETAILS, fetchProductDetail);
}

export default ProductDetailSaga;
