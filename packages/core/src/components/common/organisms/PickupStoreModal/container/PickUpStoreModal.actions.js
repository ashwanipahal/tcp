import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';

export const togglePickupModal = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_TOGGLE,
  };
};

export const openPickupModalWithValues = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_OPEN,
  };
};

export const closePickupModal = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_CLOSE,
  };
};

export const getBopisStoresActn = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.GET_BOPIS_STORES,
  };
};

export const setBopisStores = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.SET_BOPIS_STORES,
  };
};

export const setLocationSearchError = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.SET_LOCATION_SEARCH_ERROR,
  };
};

export const setStoreSearchError = payload => {
  return {
    payload,
    type: PICKUP_MODAL_ACTIONS_CONSTANTS.SET_STORE_SEARCH_ERROR,
  };
};

export default {
  togglePickupModal,
  closePickupModal,
  openPickupModalWithValues,
  getBopisStoresActn,
  setBopisStores,
  setLocationSearchError,
  setStoreSearchError,
};
