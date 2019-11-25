import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import QUICK_VIEW_CONSTANT from './QuickViewModal.constants';
import {
  setQuickView,
  setModalState,
  setItemFromBagInfoForQuickView,
  setLoadingState,
} from './QuickViewModal.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';
import { setLoaderState } from '../../../molecules/Loader/container/Loader.actions';
import { isMobileApp } from '../../../../../utils';

function* fetchProductDetail({ payload }) {
  try {
    const state = yield select();
    if (!isMobileApp()) {
      yield put(setModalState({ isModalOpen: true }));
      yield put(setLoadingState({ isLoading: true }));
    } else {
      yield put(setLoaderState(true));
    }
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
    yield put(
      setItemFromBagInfoForQuickView({
        orderInfo,
        fromBagPage: !!payload.fromBagPage,
        isSflProduct: payload.isSflProduct,
      })
    );

    if (!isMobileApp()) {
      yield put(setLoadingState({ isLoading: false }));
    } else {
      yield put(setLoaderState(false));
      yield put(setModalState({ isModalOpen: true }));
    }
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(setLoadingState({ isLoading: false }));
  }
}

function* QuickViewSaga() {
  yield takeLatest(QUICK_VIEW_CONSTANT.FETCH_QUICK_VIEW, fetchProductDetail);
}

export default QuickViewSaga;
