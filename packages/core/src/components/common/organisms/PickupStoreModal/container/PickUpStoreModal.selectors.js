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
  return state.stores.bopisStoresOnCart;
};

export const getDefaultStore = state => {
  return state.stores.defaultStore;
};

export const getGeoDefaultStore = state => {
  return state.stores.geoDefaultStore;
};

// NOTE: used for store locator to populate store geo-location search
export const getSuggestedStores = state => {
  return state.stores.suggestedStores;
};

export const getOrderConfirmation = state => {
  return state.confirmation.orderConfirmation;
};

export const getItemsCount = state => {
  return getOrderConfirmation(state).summary.itemsCount;
};

export const getIsRadialInventoryEnabled = state => {
  return state.session.siteDetails.isRadialInventoryEnabled;
};

export const getIsBossEnabled = state => {
  return state.session.siteDetails.isBossEnabled;
};

export const getIsBopisEnabled = state => {
  return state.session.siteDetails.isBopisEnabled;
};

export const getCurrentCountry = state => {
  return state.session.siteDetails.country;
};

export const getCurrentCurrencySymbol = state => {
  const country = getCurrentCountry(state);
  if (country === 'US' || country === 'CA') {
    return '$';
  }
  const { currency } = state.session.siteDetails;
  return currency === USA_VALUES.currency ? USA_VALUES.currencySymbol : `${currency} `;
};

export const getIsInternationalShipping = state => {
  return getCurrentCountry(state) !== 'US' && getCurrentCountry(state) !== 'CA';
};

export const getUserIsPlcc = state => {
  return state.user.personalData.isPlcc;
};

export const getPickupModal = state => {
  return state.user.personalData.isPlcc;
};

export const getPickupModalAttrs = state => {
  return state.stores.pickupModalAttrs;
};
