import { call, takeLatest } from 'redux-saga/effects';
import { NavigateXHR } from '../../../../../services/abstractors/account';
import NAVIGATE_XHR_CONSTANTS from './NavigateXHR.constants';

import { readCookieMobileApp, isMobileApp } from '../../../../../utils';

export function* navigateCrossDomainSaga() {
  try {
    const ismobile = isMobileApp();
    const cookies = ismobile ? yield call(readCookieMobileApp) : '';
    const response = yield call(NavigateXHR, cookies);
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
