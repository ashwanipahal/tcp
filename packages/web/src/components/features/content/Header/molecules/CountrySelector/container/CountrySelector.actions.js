import GLOBAL_CONSTANT from '@tcp/core/src/reduxStore/constants';
import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

export const getModuleXContent = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANT.GET_MODULEX_CONTENT,
  };
};

export const setModuleXContent = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANT.SET_MODULEX_CONTENT,
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

export const udpateSiteId = siteId => {
  return {
    siteId,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_SITEID,
  };
};

export default {
  getModuleXContent,
  submitCountrySelection,
  toggleCountrySelectorModal,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
  setModuleXContent,
  udpateSiteId,
};
