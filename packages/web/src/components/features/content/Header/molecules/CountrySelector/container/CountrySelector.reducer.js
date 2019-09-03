import { fromJS } from 'immutable';
import { API_CONFIG } from '@tcp/core/src/services/config';
import GLOBAL_CONSTANT from '@tcp/core/src/reduxStore/constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '@tcp/core/src/utils/cache.util';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

const { siteIds } = API_CONFIG;
const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  isModalOpen: false,
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
  moduleXContent: '',
});

const CountrySelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_MODAL_TOGGLE:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_COUNTRY:
      return state.set('country', action.payload.country);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_LANGUAGE:
      return state.set('language', action.payload.language);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_CURRENCY:
      return state.set('currency', action.payload.currency);
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_COUNTRIES_MAP:
      return state
        .set('countriesMap', action.payload)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(COUNTRY_SELECTOR_CONSTANTS.FETCH_COUNTRY_LIST_TTL));
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_STORE_CURRENCIES_MAP:
      return state
        .set('currenciesMap', action.payload)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(COUNTRY_SELECTOR_CONSTANTS.FETCH_COUNTRY_LIST_TTL));
    case COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_UPDATE_SITEID:
      return state.set('siteId', action.siteId);
    case GLOBAL_CONSTANT.SET_MODULEX_CONTENT:
      return state.set('moduleXContent', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CountrySelectorReducer;
