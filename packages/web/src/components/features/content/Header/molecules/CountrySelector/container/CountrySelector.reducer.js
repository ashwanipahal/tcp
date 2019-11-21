import { fromJS } from 'immutable';
import GLOBAL_CONSTANT from '@tcp/core/src/reduxStore/constants';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';

const initialState = fromJS({
  isModalOpen: false,
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
