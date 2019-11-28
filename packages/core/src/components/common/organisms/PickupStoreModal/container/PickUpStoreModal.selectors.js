import { fromJS } from 'immutable';
import {
  USER_REDUCER_KEY,
  PICKUP_MODAL_REDUCER_KEY,
  FORM_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { getCartItemCount } from '../../../../../utils/cookie.util';
import { isMobileApp } from '../../../../../utils';

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
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].get('defaultStore')) || null;
};

export const getInitialValues = (state, generalProductId) => {
  const form = fromJS(state[FORM_REDUCER_KEY]);
  const formValues = (form.size > 0 && form.get(generalProductId)) || null;
  const values = formValues && formValues.get('values');
  const colorFitSize = values && getColorSizeFit(values);

  return colorFitSize || {};
};

export const getCurrentProduct = state => {
  const pickupReducer = state[PICKUP_MODAL_REDUCER_KEY];
  return (pickupReducer && pickupReducer.get('currentProduct')) || null;
};

export const getGeoDefaultStore = state => {
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].get('geoDefaultStore')) || null;
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
  return isMobileApp() ? 1 : getCartItemCount();
  // TODO - CnC team to provide a selector for getting cart item count in mobile app.
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

export const getIsGetUserStoresLoaded = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isGetUserStoresLoaded')
  );
};

export const getIsPickupModalOpenFromBagPage = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('fromBagPage');
};

export const getUpdateCartItemStore = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('updateCartItemStore')
  );
};

export const getIsItemShipToHome = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isItemShipToHome');
};

export const getAlwaysSearchForBOSS = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('alwaysSearchForBOSS')
  );
};

export const openRestrictedModalForBopis = state => {
  return (
    state[PICKUP_MODAL_REDUCER_KEY] &&
    state[PICKUP_MODAL_REDUCER_KEY].get('openRestrictedModalForBopis')
  );
};

export const isStoreSearching = state => {
  return state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('isSearching');
};

export const getInitialValuesFromBagPage = state => {
  const pickUpModalReducer =
    state[PICKUP_MODAL_REDUCER_KEY] && state[PICKUP_MODAL_REDUCER_KEY].get('initialValues');
  return {
    Quantity: pickUpModalReducer && pickUpModalReducer.get('Quantity'),
    color: pickUpModalReducer && pickUpModalReducer.get('color'),
    Size: pickUpModalReducer && pickUpModalReducer.get('Size'),
    Fit: pickUpModalReducer && pickUpModalReducer.get('Fit'),
    orderItemType: pickUpModalReducer && pickUpModalReducer.get('orderItemType'),
    orderId: pickUpModalReducer && pickUpModalReducer.get('orderId'),
    orderItemId: pickUpModalReducer && pickUpModalReducer.get('orderItemId'),
  };
};
