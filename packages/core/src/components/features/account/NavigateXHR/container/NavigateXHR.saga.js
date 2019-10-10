import { call, takeLatest } from 'redux-saga/effects';
import { NavigateXHR } from '../../../../../services/abstractors/account';
import NAVIGATE_XHR_CONSTANTS from './NavigateXHR.constants';

export function* navigateCrossDomainSaga() {
  try {
    const response = yield call(NavigateXHR);
    if (response.success) {
      return response.success;
    }
    return response;
  } catch (err) {
    return '';
  }
}

export function* NavigateXHRSaga() {
  yield takeLatest(NAVIGATE_XHR_CONSTANTS.NAVIGATE_XHR_STATE, navigateCrossDomainSaga);
}

export default NavigateXHRSaga;
