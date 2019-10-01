/* istanbul ignore file */
import { call, put, takeEvery } from 'redux-saga/effects';
import styliticsProductListing from '@tcp/core/src/services/abstractors/styliticsProductListing';

import constants from './StyliticsProductTabList.constants';
import {
  styliticsProductTabListDataFail,
  styliticsProductTabListDataSuccess,
} from './StyliticsProductTabList.actions';

export function* fetchStyliticsProductTabListData({ payload }) {
  const { categoryId } = payload;
  try {
    const res = yield call(styliticsProductListing.getData, payload);
    if (res) {
      return yield put(
        styliticsProductTabListDataSuccess({ [categoryId]: res, errors: { [categoryId]: null } })
      );
    }
    throw new Error('Something went wrong while making request!');
  } catch (err) {
    return yield put(
      styliticsProductTabListDataFail({ [categoryId]: [], errors: { [categoryId]: err.message } })
    );
  }
}

function* StyliticsProductTabListSaga() {
  yield takeEvery(constants.STYLITICS_PRODUCT_TAB_LIST_REQ, fetchStyliticsProductTabListData);
}

export default StyliticsProductTabListSaga;
