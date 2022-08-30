import PRODUCT_PICKUP_ACTIONS_CONSTANTS from '../ProductPickup.constants';

export const getBopisInventoryDetailsAction = payload => {
  return {
    payload,
    type: PRODUCT_PICKUP_ACTIONS_CONSTANTS.GET_BOPIS_INVENTORY,
  };
};

export const setBopisInventoryDetailsAction = payload => {
  return {
    payload,
    type: PRODUCT_PICKUP_ACTIONS_CONSTANTS.SET_BOPIS_INVENTORY,
  };
};
