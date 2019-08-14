import { createSelector } from 'reselect';
import { COUNTRY_SELECTOR_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getCountrySelectorState = state => {
  return state[COUNTRY_SELECTOR_REDUCER_KEY];
};

export const getCurrentCountry = createSelector(
  getCountrySelectorState,
  countrySelectorState => countrySelectorState && countrySelectorState.get('country')
);

export const getCurrentLanguage = createSelector(
  getCountrySelectorState,
  countrySelectorState => countrySelectorState && countrySelectorState.get('language')
);

export const getCurrentCurrency = createSelector(
  getCountrySelectorState,
  countrySelectorState => countrySelectorState && countrySelectorState.get('currency')
);

export const getOldCountryCode = createSelector(
  getCountrySelectorState,
  countrySelectorState => countrySelectorState && countrySelectorState.get('oldCountryCode')
);

export const getOldLanguageCode = createSelector(
  getCountrySelectorState,
  countrySelectorState => countrySelectorState && countrySelectorState.get('oldLanguageCode')
);
