import PRODUCT_PICKUP_ACTIONS_CONSTANTS from '../ProductPickup.constants';

export const getBopisInventoryDetailsActn = payload => {
  return {
    payload,
    type: PRODUCT_PICKUP_ACTIONS_CONSTANTS.GET_BOPIS_INVENTORY,
  };
};

export const setBopisInventoryDetailsActn = payload => {
  return {
    payload,
    type: PRODUCT_PICKUP_ACTIONS_CONSTANTS.SET_BOPIS_INVENTORY,
  };
};
