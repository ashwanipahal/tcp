import { SESSIONCONFIG_REDUCER_KEY } from '../../constants/reducer.constants';
import { defaultCountries } from '../../constants/site.constants';
import { getBrand } from '../../utils';

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
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
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
  return !!(
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'IS_RADIAL_BOSS_ENABLED'])
  );
};

export const getIsBossEnabled = (state, brand = getBrand()) => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', `isBOSSEnabled_${brand.toUpperCase()}`])
  );
};

export const getIsBopisEnabled = (state, brand = getBrand()) => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', `isBOPISEnabled_${brand.toUpperCase()}`])
  );
};

export const getIsBossClearanceProductEnabled = state => {
  return !!(
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'BOSS_ENABLED_CLEARANCE_PRODUCTS'])
  );
};

export const getIsBopisClearanceProductEnabled = state => {
  return !!(
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'BOPIS_ENABLED_CLEARANCE_PRODUCTS'])
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
  const currency = getCurrentCurrency(state);
  return currency === USA_VALUES.currency ? USA_VALUES.currencySymbol : `${currency} `;
};

export const getRecalcOrderPointsInterval = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'BRIERLEY_ORD_RECALC_CACHING_INTERVAL'])
  );
};
