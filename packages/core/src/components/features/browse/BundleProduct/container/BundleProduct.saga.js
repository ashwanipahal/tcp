import { loadLayoutData, loadModulesData } from '@tcp/core/src/reduxStore/actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';
import { setProductDetails, setBundleDetails, setLoadingState } from './BundleProduct.actions';
import getProductInfoById, {
  layoutResolver,
} from '../../../../../services/abstractors/productListing/productDetail';
import getBundleProductsDetails from '../../../../../services/abstractors/productListing/bundleProducts';
import logger from '../../../../../utils/loggerInstance';

function* fetchBundleProductDetail({ payload: { productId } }) {
  try {
    const pageName = 'pdp';
    yield put(setProductDetails({ product: {} }));
    const state = yield select();
    yield put(setLoadingState({ isLoading: true }));
    const productDetail = yield call(getProductInfoById, productId, state, null, true);
    yield put(setProductDetails({ ...productDetail }));
    const bundledProducts = productDetail.product.bundleProducts;
    if (bundledProducts && bundledProducts.length > 0) {
      const category = bundledProducts[0] && bundledProducts[0].category;
      const { layout, modules } = yield call(layoutResolver, { category, pageName });
      yield put(loadLayoutData(layout, pageName));
      yield put(loadModulesData(modules));
    }
    const bundleDetails = yield call(getBundleProductsDetails, { bundleProducts: bundledProducts });
    yield put(setBundleDetails([...bundleDetails]));
    yield put(setLoadingState({ isLoading: false }));
  } catch (err) {
    logger.error('error: ', err);
    yield put(setLoadingState({ isLoading: false }));
  }
}

function* BundleProductSaga() {
  yield takeLatest(BUNDLEPRODUCT_CONSTANTS.FETCH_BUNDLE_DETAILS, fetchBundleProductDetail);
}

export default BundleProductSaga;
