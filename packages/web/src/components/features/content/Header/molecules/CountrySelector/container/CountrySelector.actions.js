import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

export const getCountryListData = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA,
  };
};

export const submitCountrySelection = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
  };
};

export const toggleCountrySelectorModal = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_MODAL_TOGGLE,
  };
};

export const updateSelectedCountry = country => {
  const payload = { country };
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_COUNTRY,
  };
};

export const updateSelectedLanguage = language => {
  const payload = { language };
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_LANGUAGE,
  };
};

export const updateSelectedCurrency = currency => {
  const payload = { currency };
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_CURRENCY,
  };
};

export const storeCountriesMap = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_COUNTRIES_MAP,
  };
};

export const storeCurrenciesMap = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_CURRENCIES_MAP,
  };
};

export const udpateSiteId = siteId => {
  return {
    siteId,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_SITEID,
  };
};

export default {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
  storeCountriesMap,
  storeCurrenciesMap,
  udpateSiteId,
};
