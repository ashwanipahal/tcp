import { SESSIONCONFIG_REDUCER_KEY } from '../../constants/reducer.constants';
import { defaultCountries } from '../../constants/site.constants';
import { getBrand, parseBoolean } from '../../utils';

const USA_VALUES = {
  currency: 'USD',
  currencySymbol: '$',
  countryCode: 'US',
  siteId: 'US',
};

export /**
 *
 * @function getCurrentCountry
 * @param {*} state
 * @description this selector gives current country selected.
 */
const getCurrentCountry = state => {
  return state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails.country;
};

export /**
 *
 * @function getIsInternationalShipping
 * @param {*} state
 * @description this selector gives whether current country is other than US/CA.
 */
const getIsInternationalShipping = state => {
  return (
    getCurrentCountry(state) !== defaultCountries[0].id &&
    getCurrentCountry(state) !== defaultCountries[1].id
  );
};

export const getIsRadialInventoryEnabled = state => {
  return parseBoolean(
    state[SESSIONCONFIG_REDUCER_KEY] &&
      state[SESSIONCONFIG_REDUCER_KEY].siteDetails.IS_RADIAL_BOSS_ENABLED
  );
};

export const getIsBossEnabled = (state, brand = getBrand()) => {
  const isBOSSEnabled = `isBOSSEnabled_${brand.toUpperCase()}`;
  return (
    state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails[isBOSSEnabled]
  );
};

export const getIsBopisEnabled = (state, brand = getBrand()) => {
  const isBOPISEnabled = `isBOPISEnabled_${brand.toUpperCase()}`;
  return (
    state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails[isBOPISEnabled]
  );
};

export const getIsBossClearanceProductEnabled = state => {
  return parseBoolean(
    state[SESSIONCONFIG_REDUCER_KEY] &&
      state[SESSIONCONFIG_REDUCER_KEY].siteDetails.BOSS_ENABLED_CLEARANCE_PRODUCTS
  );
};

export const getIsBopisClearanceProductEnabled = state => {
  return parseBoolean(
    state[SESSIONCONFIG_REDUCER_KEY] &&
      state[SESSIONCONFIG_REDUCER_KEY].siteDetails.BOPIS_ENABLED_CLEARANCE_PRODUCTS
  );
};

export const getCurrentCurrency = state => {
  return state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails.currency;
};

export const getCurrentCurrencySymbol = state => {
  const country = getCurrentCountry(state);
  if (country === 'US' || country === 'CA') {
    return '$';
  }
  const currency = getCurrentCurrency(state);
  return currency === USA_VALUES.currency ? USA_VALUES.currencySymbol : `${currency} `;
};
