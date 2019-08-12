import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

const CountrySelectorReducer = (state = { isModalOpen: false, countryList: [] }, action) => {
  switch (action.type) {
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_MODAL_TOGGLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default CountrySelectorReducer;
