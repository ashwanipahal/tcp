import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import countrySelectorAbstractor from '@tcp/core/src/services/abstractors/common/countrySelector';
import { isCanada, routerPush } from '@tcp/core/src/utils';
import { API_CONFIG } from '@tcp/core/src/services/config';
import endpoints from '@tcp/core/src/services/endpoints';
import { COUNTRY_SELECTOR_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';
import {
  getCountryListData,
  storeCountriesMap,
  storeCurrenciesMap,
  udpateSiteId,
} from './CountrySelector.actions';

const getCountries = data => {
  // US and CA are not coming from backend. They said we need to append it at the top from front end.
  const countries = [
    {
      code: 'US',
      name: 'United States',
      siteId: 'us',
    },
    {
      code: 'CA',
      name: 'CANADA',
      siteId: 'ca',
    },
  ];
  data.map(value => countries.push(Object.assign({}, value.country, { siteId: 'us' })));
  return countries;
};

const getCurrencies = data => {
  const currencies = [
    {
      code: 'USD',
      name: 'Dollars',
      value: '1.0',
      merchantMargin: '1.0',
    },
    {
      code: 'CAD',
      name: 'Canada Dollar',
      value: '1.0',
      merchantMargin: '1.0',
    },
  ];
  data.map(value => currencies.push(Object.assign({}, value.currency, value.exchangeRate)));
  return currencies
    .map(currency => currency.code)
    .map((cur, ind, final) => final.indexOf(cur) === ind && ind)
    .filter(e => currencies[e])
    .map(e => currencies[e]);
};

const getModifiedLanguageCode = code => {
  switch (code) {
    case 'en':
      return 'en_US';
    case 'es':
      return 'es_ES';
    case 'fr':
      return 'fr_FR';
    default:
      return code;
  }
};

export function* fetchCountryListData() {
  const res = yield call(countrySelectorAbstractor.getData);
  const data = res && res.data.countryList;
  const countriesMap = getCountries(data);
  const currenciesMap = getCurrencies(data);
  yield all([
    put(getCountryListData(data)),
    put(storeCountriesMap(countriesMap)),
    put(storeCurrenciesMap(currenciesMap)),
  ]);
}

export function* submitCountrySelectionData({ payload: data }) {
  const siteConfig = isCanada() ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const { addShipToStore } = endpoints;
  const { sitesInfo } = API_CONFIG;
  const payload = {
    header: {
      'X-Cookie': document.cookie,
      storeId: siteConfig.storeId,
      catalogId: siteConfig.catalogId,
      langId: sitesInfo.langId,
    },
    body: {
      storeId: siteConfig.storeId,
      catalogId: siteConfig.catalogId,
      langId: sitesInfo.langId,
      ccd: data.country,
      languageTCP: getModifiedLanguageCode(data.language),
      curr: data.currency,
      cc: data.oldCountry,
      selLanguage: getModifiedLanguageCode(data.oldLanguage),
      er: '1.0',
      mm: '1.0',
      orderId: '.',
      USA: 'USD',
      CA: 'CAD',
      URL: 'http://www.childrensplace.com/',
    },
    webService: addShipToStore,
  };
  const { submitData } = countrySelectorAbstractor;
  const res = yield call(submitData, payload);
  console.log(res);
  const { country } = data;
  const countriesMap = yield select(state =>
    state[COUNTRY_SELECTOR_REDUCER_KEY].get('countriesMap')
  );
  const newCountry = country;
  const oldCountry = yield select(state =>
    state[COUNTRY_SELECTOR_REDUCER_KEY].get('oldCountryCode')
  );
  const selectedCountry = countriesMap.find(c => c.code === newCountry);
  const { siteId: newSiteId } = selectedCountry;
  const oldSiteId = yield select(state => state[COUNTRY_SELECTOR_REDUCER_KEY].get('siteId'));
  console.log();
  yield all([put(udpateSiteId(newSiteId))]);

  if (newCountry !== oldCountry || newSiteId !== oldSiteId) {
    routerPush(window.location, '/home', newSiteId);
  }
}

function* CountrySelectorSaga() {
  yield takeLatest(COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA, fetchCountryListData);
  yield takeLatest(
    COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
    submitCountrySelectionData
  );
}

export default CountrySelectorSaga;
