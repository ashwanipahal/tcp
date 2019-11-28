import { call, put, takeEvery } from 'redux-saga/effects';
import lightweightProductListing from '@tcp/core/src/services/abstractors/lightweightProductListing';

import constants from './ProductTabList.constants';
import { productTabListDataFail, productTabListDataSuccess } from './ProductTabList.actions';
import errorMessage from '../../../../../services/handler/stateful/errorResponseMapping/index.json';
import { toastMessageInfo } from '../../../atoms/Toast/container/Toast.actions.native';
import { isMobileApp } from '../../../../../utils';

export function* fetchProductTabListData({ payload }) {
  const { categoryId } = payload;
  try {
    const res = yield call(lightweightProductListing.getData, payload);
    if (res) {
      if (isMobileApp() && res && res.length === 0) {
        yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
      }
      return yield put(
        productTabListDataSuccess({
          [categoryId]: res,
          errors: {
            [categoryId]: null,
          },
          completed: {
            [categoryId]: false,
          },
        })
      );
    }
    throw new Error();
  } catch (err) {
    if (isMobileApp())
      yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
    return yield put(
      productTabListDataFail({
        [categoryId]: [],
        errors: {
          [categoryId]: true,
        },
        completed: {
          [categoryId]: false,
        },
      })
    );
  }
}

function* ProductTabListSaga() {
  yield takeEvery(constants.PRODUCT_TAB_LIST_REQ, fetchProductTabListData);
}

export default ProductTabListSaga;
