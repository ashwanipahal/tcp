// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';
import { addAirmilesBannerFailure } from './AirmilesBanner.actions';
import addAirmilesBannerApi from '../../../../../../../services/abstractors/CnC/AirmilesBanner';
import {
  getFormAirmilesNumber,
  getFormAirmilesOfferCode,
  getCartOrderId,
} from './AirmilesBanner.selector';

export function* addAirmilesBanner() {
  try {
    const promoId = yield select(getFormAirmilesNumber);
    const offerCode = yield select(getFormAirmilesOfferCode);
    const orderId = yield select(getCartOrderId);

    yield call(addAirmilesBannerApi, { orderId, promoId, offerCode });
  } catch (err) {
    yield put(addAirmilesBannerFailure(err.message));
  }
}

function* AddAirmilesBannerSaga(): Saga<void> {
  yield takeLatest(AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST, addAirmilesBanner);
}

export default AddAirmilesBannerSaga;
