import CART_CONSTANTS from '../Cart.constants';

export const getOrderDetails = () => ({
  type: CART_CONSTANTS.GET_ORDER_DETAILS,
});

export const getOrderDetailsComplete = payload => {
  return {
    type: CART_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};
