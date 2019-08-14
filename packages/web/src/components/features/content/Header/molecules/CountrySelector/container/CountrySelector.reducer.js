import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

const initialState = {
  isModalOpen: false,
  countryList: [],
  country: '',
  language: '',
  currency: '',
  oldCountryCode: 'US',
  oldLanguageCode: 'es',
};

const CountrySelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_MODAL_TOGGLE:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_COUNTRY:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_LANGUAGE:
      return { ...state, ...action.payload };
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_CURRENCY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default CountrySelectorReducer;
