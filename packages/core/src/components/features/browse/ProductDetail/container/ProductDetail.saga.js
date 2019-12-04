import { loadLayoutData, loadModulesData } from '@tcp/core/src/reduxStore/actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductDetail.constants';
import {
  setProductDetails,
  setPDPLoadingState,
  setProductDetailsDynamicData,
} from './ProductDetail.actions';
import getProductInfoById, {
  layoutResolver,
} from '../../../../../services/abstractors/productListing/productDetail';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import getProductsUserCustomInfo from '../../../../../services/abstractors/productListing/defaultWishlist';

function* fetchProductDetail({ payload, payload: { productColorId, escapeEmptyProduct } }) {
  try {
    const pageName = 'pdp';
    yield put(loadLayoutData({}, pageName));
    if (!escapeEmptyProduct) {
      yield put(setProductDetails({ product: {} }));
    }
    const state = yield select();
    yield put(setPDPLoadingState({ isLoading: true }));
    const productDetail = yield call(getProductInfoById, productColorId, state);
    const {
      product: { category },
    } = productDetail;
    if (typeof window !== 'undefined') {
      const { layout, modules } = yield call(layoutResolver, { category, pageName });
      yield put(loadLayoutData(layout, pageName));
      yield put(loadModulesData(modules));
    }
    const isGuest = !getUserLoggedInState({ ...state });
    const isRemembered = isRememberedUser({ ...state });
    if (!isGuest && !isRemembered) {
      const generalProductIdsList = productDetail.product.colorFitsSizesMap.map(
        product => product.colorProductId
      );
      productDetail.product.colorFitsSizesMap = yield call(
        getProductsUserCustomInfo,
        generalProductIdsList,
        productDetail.product.colorFitsSizesMap,
        true
      );
    }

    yield put(setProductDetails({ ...productDetail }));
    if (typeof window !== 'undefined') {
      yield put(setProductDetailsDynamicData({ ...productDetail }));
    }
    yield put(setPDPLoadingState({ isLoading: false }));
  } catch (err) {
    console.log(err);
    yield put(setPDPLoadingState({ isLoading: false }));
  }
}

function* ProductDetailSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCT_DETAILS, fetchProductDetail);
}

export default ProductDetailSaga;
