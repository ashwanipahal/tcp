import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import countrySelectorAbstractor from '@tcp/core/src/services/abstractors/common/countrySelector';
import { getSiteId, isCanada, routerPush } from '@tcp/core/src/utils';
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

const getCountries = data => {
  // US and CA are not coming from backend. They said we need to append it at the top from front end.
  const countries = [
    {
      code: 'US',
      currencyId: 'USD',
      name: 'United States',
      siteId: 'us',
    },
    {
      code: 'CA',
      currencyId: 'CAD',
      name: 'CANADA',
      siteId: 'ca',
    },
  ];
  data.map(value =>
    countries.push(
      Object.assign({}, value.country, { siteId: 'us', currencyId: value.currency.code })
    )
  );
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
    put(setCountryListData(data)),
    put(storeCountriesMap(countriesMap)),
    put(storeCurrenciesMap(currenciesMap)),
  ]);
}

// eslint-disable-next-line complexity
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
  if (!res) console.log('Error occurered');
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

  if ((newCountry && newCountry !== oldCountry) || (newSiteId && newSiteId !== oldSiteId)) {
    routerPush(window.location, '/home', newSiteId);
  }

  if (newLanguage && newLanguage !== oldLanguage) {
    const { protocol, host, pathname } = window.location;
    if (newLanguage === 'fr' && host.indexOf('fr.') === -1) {
      const href = `${protocol}//fr.${host}${pathname}`;
      window.location = href;
    } else if (newLanguage === 'es' && host.indexOf('es.') === -1) {
      const href = `${protocol}//es.${host}${pathname}`;
      window.location = href;
    }
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
