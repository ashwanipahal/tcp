/* istanbul ignore file */
import { call, put, takeEvery } from 'redux-saga/effects';
import lightweightProductListing from '@tcp/core/src/services/abstractors/lightweightProductListing';

import constants from './ProductTabList.constants';
import { productTabListDataFail, productTabListDataSuccess } from './ProductTabList.actions';

export function* fetchProductTabListData({ payload }) {
  const { categoryId } = payload;
  try {
    const res = yield call(lightweightProductListing.getData, payload);
    if (res) {
      return yield put(productTabListDataSuccess({ [categoryId]: res }));
    }
    throw new Error('Something went wrong while making request!');
  } catch (err) {
    return yield put(productTabListDataFail({ [categoryId]: { error: err.message } }));
  }
}

function* ProductTabListSaga() {
  yield takeEvery(constants.PRODUCT_TAB_LIST_REQ, fetchProductTabListData);
}

export default ProductTabListSaga;
