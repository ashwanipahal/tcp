import { call, put, select, takeLatest } from 'redux-saga/effects';
import countrySelectorAbstractor from '@tcp/core/src/services/abstractors/common/countrySelector';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';
import { getCountryListData, submitCountrySelection } from './CountrySelector.actions';
import {
  getCurrentCountry,
  getCurrentLanguage,
  getCurrentCurrency,
  getOldCountryCode,
  getOldLanguageCode,
} from './CountrySelector.selectors';

export function* fetchCountryListData() {
  const res = yield call(countrySelectorAbstractor.getData);
  const countryList = res && res.data;
  yield put(getCountryListData(countryList));
}

export function* submitCountrySelectionData() {
  const country = yield select(getCurrentCountry);
  const language = yield select(getCurrentLanguage);
  const currency = yield select(getCurrentCurrency);
  const oldCountry = yield select(getOldCountryCode);
  const oldLanguage = yield select(getOldLanguageCode);
  const formData = {
    country,
    currency,
    language,
    oldCountry,
    oldLanguage,
  };
  const res = yield call(countrySelectorAbstractor.submitData(formData));
  const body = res && res.body;
  const data = {
    country: body.flagName,
    currency: body.currency,
    flagName: body.flagName,
    iShipCookie: body.shippingCookie,
  };

  yield put(submitCountrySelection(data));
}

function* CountrySelectorSaga() {
  yield takeLatest(COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA, fetchCountryListData);
  yield takeLatest(
    COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
    submitCountrySelectionData
  );
}

export default CountrySelectorSaga;
