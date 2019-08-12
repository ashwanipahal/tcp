import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

export const getCountryListData = payload => {
  return {
    payload,
    type: COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA,
  };
};

export const submitCountrySelection = payload => {
  console.log(payload);

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

export default {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
};
