import { call, put, takeLatest, select } from 'redux-saga/effects';
import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';
import { setProductDetails, setBundleDetails } from './BundleProduct.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';
import getBundleProductsDetails from '../../../../../services/abstractors/productListing/bundleProducts';
import logger from '../../../../../utils/loggerInstance';

function* fetchBundleProductDetail({ payload: { productId } }) {
  try {
    yield put(setProductDetails({ product: {} }));
    const state = yield select();
    const productDetail = yield call(getProductInfoById, productId, state, null, true);
    yield put(setProductDetails({ ...productDetail }));
    const bundledProducts = productDetail.product.bundleProducts;
    const bundleDetails = yield call(getBundleProductsDetails, { bundleProducts: bundledProducts });
    yield put(setBundleDetails({ ...bundleDetails }));
  } catch (err) {
    logger.error('error: ', err);
  }
}

function* BundleProductDetailSaga() {
  yield takeLatest(BUNDLEPRODUCT_CONSTANTS.FETCH_BUNDLE_DETAILS, fetchBundleProductDetail);
}

export default BundleProductDetailSaga;
