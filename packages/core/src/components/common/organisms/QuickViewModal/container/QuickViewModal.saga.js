import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import QUICK_VIEW_CONSTANT from './QuickViewModal.constants';
import {
  setQuickView,
  setModalState,
  setItemFromBagInfoForQuickView,
  setLoadingState,
} from './QuickViewModal.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';

function* fetchProductDetail({ payload }) {
  try {
    const state = yield select();
    yield put(setModalState({ isModalOpen: true }));
    yield put(setLoadingState({ isLoading: true }));
    const payloadArray = Array.isArray(payload) ? payload : [payload];
    const { orderInfo } = payloadArray[0];
    let itemBrand;
    if (orderInfo) {
      ({ itemBrand } = orderInfo);
    }
    const fetchDetailArray = payloadArray.map(product => {
      const { colorProductId } = product;
      return call(getProductInfoById, colorProductId, state, itemBrand);
    });
    const productDetailArray = yield all(fetchDetailArray);
    yield put(setQuickView(productDetailArray));
    yield put(setItemFromBagInfoForQuickView({ orderInfo }));
    yield put(setLoadingState({ isLoading: false }));
  } catch (err) {
    console.log(err);
    yield put(setLoadingState({ isLoading: false }));
  }
}

function* QuickViewSaga() {
  yield takeLatest(QUICK_VIEW_CONSTANT.FETCH_QUICK_VIEW, fetchProductDetail);
}

export default QuickViewSaga;
