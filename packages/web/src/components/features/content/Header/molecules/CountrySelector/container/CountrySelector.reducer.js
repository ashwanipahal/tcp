import { fromJS } from 'immutable';
import { API_CONFIG } from '@tcp/core/src/services/config';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

const { siteIds } = API_CONFIG;
const initialState = fromJS({
  isModalOpen: false,
  countryList: [],
  countriesMap: [],
  currenciesMap: [],
  sitesTable: {
    [siteIds.us]: {
      languages: [
        {
          id: 'en',
          displayName: 'English',
        },
        {
          id: 'es',
          displayName: 'Spanish',
        },
      ],
    },
    [siteIds.ca]: {
      languages: [
        {
          id: 'en',
          displayName: 'English',
        },
        {
          id: 'fr',
          displayName: 'French',
        },
      ],
    },
  },
  country: '',
  language: '',
  currency: '',
  siteId: '',
});

const CountrySelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SET_DATA:
      return state.set('countryList', action.payload);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_MODAL_TOGGLE:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_COUNTRY:
      return state.set('country', action.payload.country);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_LANGUAGE:
      return state.set('language', action.payload.language);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_CURRENCY:
      return state.set('currency', action.payload.currency);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_COUNTRIES_MAP:
      return state.set('countriesMap', action.payload);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_CURRENCIES_MAP:
      return state.set('currenciesMap', action.payload);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_SITEID:
      return state.set('siteId', action.siteId);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CountrySelectorReducer;
