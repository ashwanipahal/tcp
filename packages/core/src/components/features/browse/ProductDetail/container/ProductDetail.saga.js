import { call, put, takeLatest, select } from 'redux-saga/effects';
import PRODUCTLISTING_CONSTANTS from './ProductDetail.constants';
import { setProductDetails } from './ProductDetail.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import getProductsUserCustomInfo from '../../../../../services/abstractors/productListing/defaultWishlist';

function* fetchProductDetail({ payload: { productColorId } }) {
  try {
    yield put(setProductDetails({ product: {} }));
    const state = yield select();
    const productDetail = yield call(getProductInfoById, productColorId, state);
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
  } catch (err) {
    console.log(err);
  }
}

function* ProductDetailSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCT_DETAILS, fetchProductDetail);
}

export default ProductDetailSaga;
