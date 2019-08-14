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

export default {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
};
