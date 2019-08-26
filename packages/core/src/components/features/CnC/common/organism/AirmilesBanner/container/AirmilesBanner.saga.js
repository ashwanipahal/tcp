// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';
import { addAirmilesBannerFailure } from './AirmilesBanner.actions';
import addAirmilesBannerApi from '../../../../../../../services/abstractors/CnC/AirmilesBanner';

// eslint-disable-next-line consistent-return
export function* addAirmilesBanner({
  payload,
}: {
  payload: { giftCardNumber: string, cardPin: string, recaptchaToken: string },
}): Saga<void> {
  try {
    const response = yield call(addAirmilesBannerApi, payload);
    if (!response) {
      return yield put(addAirmilesBannerFailure());
    }
  } catch (err) {
    return yield put(addAirmilesBannerFailure(err.message));
  }
}

export function* AddAirmilesBannerSaga(): Saga<void> {
  yield takeLatest(AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST, addAirmilesBanner);
}
