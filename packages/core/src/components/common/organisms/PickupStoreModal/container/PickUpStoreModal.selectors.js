import { fromJS } from 'immutable';
import {
  USER_REDUCER_KEY,
  PICKUP_MODAL_REDUCER_KEY,
  PRODUCT_DETAIL_REDUCER_KEY,
  FORM_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';

const getColorSizeFitName = (type, values) => {
  let displayName = values && values.get(type);
  displayName = displayName && displayName.size > 0 ? displayName.get('name') : displayName;

  return displayName;
};

const getColorSizeFit = values => {
  const color = getColorSizeFitName('color', values);
  const fit = getColorSizeFitName('Fit', values);
  const size = getColorSizeFitName('Size', values);

  const quantity = values && values.get('Quantity');

  return {
    color,
    Fit: fit,
    Quantity: quantity,
    Size: size,
  };
};

export const getStoresOnCart = state => {
  return (
    (state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('cartStores')) || []
  );
};

export const getDefaultStore = state => {
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].defaultStore) || null;
};

export const getInitialValues = (state, generalProductId) => {
  const form = fromJS(state[FORM_REDUCER_KEY]);
  const formValues = (form.size > 0 && form.get(generalProductId)) || null;
  const values = formValues && formValues.get('values');
  const colorFitSize = values && getColorSizeFit(values);

  return colorFitSize || {};
};

export const getCurrentProduct = state => {
  let pickupReducer = state[PRODUCT_DETAIL_REDUCER_KEY];
  pickupReducer = pickupReducer.size === 1 ? state[PICKUP_MODAL_REDUCER_KEY] : pickupReducer;
  return (pickupReducer && pickupReducer.get('currentProduct')) || null;
};

export const getGeoDefaultStore = state => {
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].geoDefaultStore) || null;
};

// NOTE: used for store locator to populate store geo-location search
export const getSuggestedStores = state => {
  return (
    (state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('suggestedStores')) ||
    []
  );
};

export const getOrderConfirmation = state => {
  return state.confirmation.orderConfirmation;
};

export const getItemsCount = () => {
  // TODO - Integrate it with redux original state
  return 0;
  // return getOrderConfirmation(state).summary.itemsCount;
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

export const getStoreSearchError = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('storeSearchError');
};
