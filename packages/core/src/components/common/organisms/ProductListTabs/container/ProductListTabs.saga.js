/* istanbul ignore file */
import { call, put, takeLatest } from 'redux-saga/effects';
import productListTabs from '@tcp/core/src/services/abstractors/common/productListTabs';

import constants from './ProductListTabs.constants';
import { productListTabsDataFail, productListTabsDataSuccess } from './ProductListTabs.actions';

export function* fetchProductListTabsData({ payload }) {
  const { categoryId } = payload;
  try {
    const res = yield call(productListTabs.getData, payload);
    if (res) {
      return yield put(productListTabsDataSuccess({ [categoryId]: res }));
    }
    throw new Error('Something went wrong while making request!');
  } catch (err) {
    return yield put(productListTabsDataFail({ [categoryId]: { error: err.message } }));
  }
}

function* ProductListSaga() {
  yield takeLatest(constants.PRODUCT_LIST_TAB_REQ, fetchProductListTabsData);
}

export default ProductListSaga;
