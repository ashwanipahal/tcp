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

export default {
  togglePickupModal,
  closePickupModal,
  openPickupModalWithValues,
};
