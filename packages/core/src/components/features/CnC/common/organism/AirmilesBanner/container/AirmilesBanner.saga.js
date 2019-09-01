// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';
import { addAirmilesBannerFailure } from './AirmilesBanner.actions';
import addAirmilesBannerApi from '../../../../../../../services/abstractors/CnC/AirmilesBanner';

// eslint-disable-next-line consistent-return
export function* addAirmilesBanner({ payload }) {
  try {
    yield call(addAirmilesBannerApi, payload);
  } catch (err) {
    return yield put(addAirmilesBannerFailure(err.message));
  }
}

export function* AddAirmilesBannerSaga(): Saga<void> {
  yield takeLatest(AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST, addAirmilesBanner);
}
