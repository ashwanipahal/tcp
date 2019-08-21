import { COUNTRY_SELECTOR_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

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
  return getCountrySelectorState(state)
    .get('sitesTable')
    .toJS();
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
  return getCountrySelectorState(state).get('siteId');
};

export const getOldCountryCode = state => {
  return getCountrySelectorState(state).get('oldCountryCode');
};

export const getOldLanguageCode = state => {
  return getCountrySelectorState(state).get('oldLanguageCode');
};
