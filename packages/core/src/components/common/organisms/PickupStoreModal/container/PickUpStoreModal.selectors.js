import {
  USER_REDUCER_KEY,
  PICKUP_MODAL_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';

const USA_VALUES = {
  currency: 'USD',
  currencySymbol: '$',
  countryCode: 'US',
  siteId: 'US',
};

// const CA_VALUES = {
//   currency: 'CAD',
//   currencySymbol: '$',
//   countryCode: 'CA',
//   siteId: 'US',
// };

export const getBopisStoresOnCart = state => {
  return (state.stores && state.stores.bopisStoresOnCart) || [];
};

export const getDefaultStore = state => {
  return (state.stores && state.stores.defaultStore) || null;
};

export const getGeoDefaultStore = state => {
  return (state.stores && state.stores.geoDefaultStore) || null;
};

// NOTE: used for store locator to populate store geo-location search
export const getSuggestedStores = state => {
  return (state.stores && state.stores.suggestedStores) || [];
};

export const getOrderConfirmation = state => {
  return state.confirmation.orderConfirmation;
};

export const getItemsCount = () => {
  // TODO - Integrate it with redux original state
  return 0;
  // return getOrderConfirmation(state).summary.itemsCount;
};

export const getIsRadialInventoryEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'isRadialInventoryEnabled'])
  );
};

export const getIsBossEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'IS_BOSS_ENABLED'])
  );
};

export const getIsBopisEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'IS_BOPIS_ENABLED'])
  );
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
  return getCurrentCountry(state) !== 'US' && getCurrentCountry(state) !== 'CA';
};

export const getUserIsPlcc = state => {
  return state[USER_REDUCER_KEY].personalData && state[USER_REDUCER_KEY].personalData.isPlcc;
};

export const getIsPickupModalOpen = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isModalOpen');
};

export const getIsBopisCtaEnabled = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isBopisCtaEnabled')
  );
};

export const getIsBossCtaEnabled = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isBossCtaEnabled');
};

export const getIsPickUpWarningModal = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isPickUpWarningModal')
  );
};

export const getOpenSkuSelectionForm = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('openSkuSelectionForm')
  );
};
