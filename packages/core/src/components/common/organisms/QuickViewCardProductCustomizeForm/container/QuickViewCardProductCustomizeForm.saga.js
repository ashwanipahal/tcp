import { call, put, takeLatest, select } from 'redux-saga/effects';
import QUICK_VIEW_CONSTANT from './QuickViewCardProductCustomizeForm.constants';
import { setQuickView, setModalState } from './QuickViewCardProductCustomizeForm.actions';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';

function* fetchProductDetail({ payload: { colorProductId } }) {
  try {
    const state = yield select();
    const productDetail = yield call(getProductInfoById, colorProductId, state);
    yield put(setQuickView({ ...productDetail }));
    yield put(setModalState({ isModalOpen: true }));
  } catch (err) {
    console.log(err);
  }
}

function* QuickViewSaga() {
  yield takeLatest(QUICK_VIEW_CONSTANT.FETCH_QUICK_VIEW, fetchProductDetail);
}

export default QuickViewSaga;
