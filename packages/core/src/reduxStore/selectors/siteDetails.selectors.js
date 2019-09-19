import { SESSIONCONFIG_REDUCER_KEY } from '../../constants/reducer.constants';

const USA_VALUES = {
  currency: 'USD',
  currencySymbol: '$',
  countryCode: 'US',
  siteId: 'US',
};

export const getCurrentCountry = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
};

export const getCurrentCurrency = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'currency'])
  );
};

export const getCurrentCurrencySymbol = state => {
  const country = getCurrentCountry(state);
  if (country === 'US' || country === 'CA') {
    return '$';
  }
  const { currency } = getCurrentCurrency(state);
  return currency === USA_VALUES.currency ? USA_VALUES.currencySymbol : `${currency} `;
};

export const getIsInternationalShipping = state => {
  // return true;
  return getCurrentCountry(state) !== 'US' && getCurrentCountry(state) !== 'CA';
};
