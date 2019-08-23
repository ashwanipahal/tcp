import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import countrySelectorAbstractor from '@tcp/core/src/services/abstractors/common/countrySelector';
import {
  getSiteId,
  isCanada,
  getCountriesMap,
  getCurrenciesMap,
  getModifiedLanguageCode,
  siteRedirect,
  languageRedirect,
} from '@tcp/core/src/utils';
import { API_CONFIG } from '@tcp/core/src/services/config';
import endpoints from '@tcp/core/src/services/endpoints';
import {
  COUNTRY_SELECTOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';
import {
  setCountryListData,
  storeCountriesMap,
  storeCurrenciesMap,
  udpateSiteId,
} from './CountrySelector.actions';

export function* fetchCountryListData() {
  const res = yield call(countrySelectorAbstractor.getData);
  const data = res && res.data.countryList;
  const countriesMap = getCountriesMap(data);
  const currenciesMap = getCurrenciesMap(data);
  yield all([
    put(setCountryListData(data)),
    put(storeCountriesMap(countriesMap)),
    put(storeCurrenciesMap(currenciesMap)),
  ]);
}

export function* submitCountrySelectionData({ payload: data }) {
  const siteConfig = isCanada() ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const { addShipToStore } = endpoints;
  const { sitesInfo } = API_CONFIG;
  const payload = {
    body: {
      storeId: siteConfig.storeId,
      catalogId: siteConfig.catalogId,
      langId: sitesInfo.langId,
      ccd: data.country,
      languageTCP: getModifiedLanguageCode(data.language),
      curr: data.currency,
      cc: data.savedCountry,
      selLanguage: getModifiedLanguageCode(data.savedLanguage),
      er: data.value || '1.0',
      mm: data.merchantMargin || '1.0',
      orderId: '.',
      USA: 'USD',
      CA: 'CAD',
      URL: 'http://www.childrensplace.com/',
    },
    webService: addShipToStore,
  };
  const { submitData } = countrySelectorAbstractor;
  const res = yield call(submitData, payload);
  if (!res) console.log('Error occurered!');
  const { country: newCountry, language: newLanguage } = data;
  const oldCountry = yield select(state =>
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
  const oldLanguage = yield select(state =>
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'language'])
  );
  const newSiteId = yield select(state => state[COUNTRY_SELECTOR_REDUCER_KEY].get('siteId'));
  const oldSiteId = getSiteId();
  yield put(udpateSiteId(newSiteId));

  siteRedirect(newCountry, oldCountry, newSiteId, oldSiteId);
  languageRedirect(newLanguage, oldLanguage);
}

function* CountrySelectorSaga() {
  yield takeLatest(COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA, fetchCountryListData);
  yield takeLatest(
    COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
    submitCountrySelectionData
  );
}

export default CountrySelectorSaga;
