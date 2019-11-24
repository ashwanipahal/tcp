import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import countryListAbstractor from '@tcp/core/src/services/abstractors/bootstrap/countryList';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getModuleX } from '@tcp/core/src/services/abstractors/common/moduleX';
import { NavigateXHR } from '@tcp/core/src/services/abstractors/account';
import {
  getCountriesMap,
  getCurrenciesMap,
  getModifiedLanguageCode,
  languageRedirect,
  isGymboree,
} from '@tcp/core/src/utils';
import { API_CONFIG } from '@tcp/core/src/services/config';
import endpoints from '@tcp/core/src/services/endpoints';
import {
  COUNTRY_SELECTOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import GLOBAL_CONSTANT from '@tcp/core/src/reduxStore/constants';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import { storeCountriesMap, storeCurrenciesMap } from '@tcp/core/src/reduxStore/actions';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';
import { sites } from '../../../../../../../constants';
import { udpateSiteId, setModuleXContent } from './CountrySelector.actions';

export function* fetchModuleX({ payload = '' }) {
  try {
    const countrySelectorModuleX = yield select(state =>
      state[COUNTRY_SELECTOR_REDUCER_KEY].get('moduleXContent')
    );
    if (!countrySelectorModuleX) {
      const result = yield call(getModuleX, payload);
      yield put(setModuleXContent(result.richText));
    }
  } catch (err) {
    yield null;
  }
}

export function* fetchCountryListData() {
  try {
    const res = yield call(countryListAbstractor.getData);
    const data = res && res.data.countryList;
    const countriesMap = getCountriesMap(data);
    const currenciesMap = getCurrenciesMap(data);
    yield all([put(storeCountriesMap(countriesMap)), put(storeCurrenciesMap(currenciesMap))]);
  } catch (error) {
    yield null;
  }
}

export function* submitCountrySelectionData({ payload: data }) {
  try {
    const { ca } = sites;
    const {
      CATALOGID_CONFIG: { TCP, Gymboree },
      CA_CONFIG_OPTIONS,
      US_CONFIG_OPTIONS,
    } = API_CONFIG;
    const storeId =
      data.country === ca.countryCode ? CA_CONFIG_OPTIONS.storeId : US_CONFIG_OPTIONS.storeId;
    let catalogId;
    if (isGymboree()) {
      catalogId = data.country === ca.countryCode ? Gymboree.Canada : Gymboree.USA;
    } else {
      catalogId = data.country === ca.countryCode ? TCP.Canada : TCP.USA;
    }
    const { addShipToStore } = endpoints;
    const { sitesInfo } = API_CONFIG;
    const payload = {
      body: {
        storeId,
        catalogId,
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
    const { submitData } = countryListAbstractor;
    const res = yield call(submitData, payload);
    if (!res) logger.error('Error occurered!');
    const { country: newCountry, language: newLanguage } = data;
    const oldCountry = yield select(state => state[SESSIONCONFIG_REDUCER_KEY].siteDetails.country);
    const oldLanguage = yield select(
      state => state[SESSIONCONFIG_REDUCER_KEY].siteDetails.language
    );
    const newSiteId = yield select(state => state[COUNTRY_SELECTOR_REDUCER_KEY].get('siteId'));
    yield put(udpateSiteId(newSiteId));
    yield call(NavigateXHR, '');
    languageRedirect(newCountry, oldCountry, newSiteId, newLanguage, oldLanguage);
  } catch (error) {
    yield null;
  }
}

function* CountrySelectorSaga() {
  const cachedCountryListData = validateReduxCache(fetchCountryListData);
  const cachedModuleX = validateReduxCache(fetchModuleX);
  yield takeLatest(GLOBAL_CONSTANT.GET_MODULEX_CONTENT, cachedModuleX);
  yield takeLatest(GLOBAL_CONSTANT.COUNTRY_LIST_GET_DATA, cachedCountryListData);
  yield takeLatest(
    COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
    submitCountrySelectionData
  );
}

export default CountrySelectorSaga;
