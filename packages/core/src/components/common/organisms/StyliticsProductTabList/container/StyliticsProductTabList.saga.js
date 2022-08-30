/* istanbul ignore file */
import { call, put, takeEvery } from 'redux-saga/effects';
import styliticsProductListing from '@tcp/core/src/services/abstractors/styliticsProductListing';

import constants from './StyliticsProductTabList.constants';
import {
  styliticsProductTabListDataFail,
  styliticsProductTabListDataSuccess,
  isFetchingDataForOutfit,
} from './StyliticsProductTabList.actions';

export function* fetchStyliticsProductTabListData({ payload }) {
  const { categoryId } = payload;
  try {
    const res = yield call(styliticsProductListing.getData, payload);
    if (res) {
      return yield put(
        styliticsProductTabListDataSuccess({
          [categoryId]: res,
          errors: { [categoryId]: null },
          completed: { [categoryId]: false },
        })
      );
    }
    throw new Error();
  } catch (err) {
    return yield put(
      styliticsProductTabListDataFail({
        [categoryId]: [],
        errors: { [categoryId]: true },
        completed: { [categoryId]: false },
      })
    );
  }
}

export function* fetchStyliticsProductTabListDataforOutfit({ payload }) {
  const { categoryId } = payload;
  try {
    yield put(isFetchingDataForOutfit(true));
    const res = yield call(styliticsProductListing.getData, payload);
    if (res) {
      yield put(
        styliticsProductTabListDataSuccess({ [categoryId]: res, errors: { [categoryId]: null } })
      );
      return yield put(isFetchingDataForOutfit(false));
    }
    throw new Error();
  } catch (err) {
    yield put(isFetchingDataForOutfit(false));
    return yield put(
      styliticsProductTabListDataFail({ [categoryId]: [], errors: { [categoryId]: true } })
    );
  }
}

function* StyliticsProductTabListSaga() {
  yield takeEvery(constants.STYLITICS_PRODUCT_TAB_LIST_REQ, fetchStyliticsProductTabListData);
  yield takeEvery(
    constants.STYLITICS_PRODUCT_TAB_LIST_REQ_OUTFIT,
    fetchStyliticsProductTabListDataforOutfit
  );
}

export default StyliticsProductTabListSaga;
