import GLOBAL_CONSTANTS from '../constants';
import { API_CONFIG } from '../../services/config';

const { siteIds } = API_CONFIG;
const initialState = {
  siteDetails: {},
  otherBrandSiteDetails: {},
  siteOptions: {
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
  },
};

const SessionConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_XAPP_CONFIG:
      return { ...state, siteDetails: { ...state.siteDetails, ...action.payload } };
    case GLOBAL_CONSTANTS.SET_XAPP_CONFIG_OTHER_BRAND:
      return {
        ...state,
        otherBrandSiteDetails: { ...state.otherBrandSiteDetails, ...action.payload },
      };
    case GLOBAL_CONSTANTS.SET_BOSS_BOPIS_FLAGS:
      return { ...state, siteDetails: { ...state.siteDetails, ...action.payload } };
    case GLOBAL_CONSTANTS.SET_COUNTRY:
      return { ...state, siteDetails: { ...state.siteDetails, country: action.payload } };
    case GLOBAL_CONSTANTS.SET_CURRENCY:
      return {
        ...state,
        siteDetails: {
          ...state.siteDetails,
          currency: action.payload.currency,
          currencyAttributes: action.payload.currencyAttributes,
        },
      };
    case GLOBAL_CONSTANTS.SET_LANGUAGE:
      return { ...state, siteDetails: { ...state.siteDetails, language: action.payload } };
    case GLOBAL_CONSTANTS.COUNTRY_LIST_STORE_COUNTRIES_MAP:
      return { ...state, siteOptions: { ...state.siteOptions, countriesMap: action.payload } };
    case GLOBAL_CONSTANTS.COUNTRY_LIST_STORE_CURRENCIES_MAP:
      return { ...state, siteOptions: { ...state.siteOptions, currenciesMap: action.payload } };
    default:
      return state;
  }
};

export default SessionConfigReducer;
