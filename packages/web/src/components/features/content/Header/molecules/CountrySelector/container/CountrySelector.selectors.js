import {
  APICONFIG_REDUCER_KEY,
  COUNTRY_SELECTOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';

export const getCountrySelectorState = state => {
  return state[COUNTRY_SELECTOR_REDUCER_KEY];
};

export const getCountriesMap = state => {
  const { siteOptions } = state[SESSIONCONFIG_REDUCER_KEY];
  return siteOptions && siteOptions.countriesMap;
};

export const getCurrenciesMap = state => {
  const { siteOptions } = state[SESSIONCONFIG_REDUCER_KEY];
  return siteOptions && siteOptions.currenciesMap;
};

export const getSitesTable = state => {
  const { siteOptions } = state[SESSIONCONFIG_REDUCER_KEY];
  return siteOptions && siteOptions.sitesTable;
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
  return state[SESSIONCONFIG_REDUCER_KEY].siteDetails.country;
};

export const getOldCurrency = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].siteDetails.currency;
};

export const getOldLanguage = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].siteDetails.language;
};

export const getLabels = state => {
  return state.Labels.global;
};

export const getNoteContent = state => {
  return getCountrySelectorState(state).get('moduleXContent');
};

export const getModuleXContentId = state => {
  const { global: { countrySelector } = {} } = state.Labels;
  let content;
  if (countrySelector) {
    const { referred = [] } = countrySelector;
    content = referred.find(label => label.name === 'lbl_global_country_selector_note');
  }
  return content && content.contentId;
};
