import {
  APICONFIG_REDUCER_KEY,
  COUNTRY_SELECTOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';

export const getCountrySelectorState = state => {
  return state[COUNTRY_SELECTOR_REDUCER_KEY];
};

export const getCountriesMap = state => {
  return getCountrySelectorState(state).get('countriesMap');
};

export const getCurrenciesMap = state => {
  return getCountrySelectorState(state).get('currenciesMap');
};

export const getSitesTable = state => {
  return getCountrySelectorState(state).get('sitesTable');
};

export const getCurrentCountry = state => {
  return getCountrySelectorState(state).get('country');
};

export const getCurrentLanguage = state => {
  return getCountrySelectorState(state).get('language');
};

export const getCurrentCurrency = state => {
  return getCountrySelectorState(state).get('currency');
};

export const getCurrentFlag = state => {
  return getCountrySelectorState(state).get('flag');
};

export const getIsModalOpen = state => {
  return getCountrySelectorState(state).get('isModalOpen');
};

export const getSiteId = state => {
  return getCountrySelectorState(state).get('siteId') || state[APICONFIG_REDUCER_KEY].siteId;
};

export const getOldCountry = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country']);
};

export const getOldCurrency = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'currency']);
};

export const getOldLanguage = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'language']);
};

export const getLabels = state => {
  return state.Labels.global;
};
