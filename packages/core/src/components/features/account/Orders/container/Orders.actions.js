import constants from '../Orders.constants';

/**
 * @function getOrdersList
 * action creator for type: GET_ORDERS_LIST
 */
export const getOrdersList = payload => ({
  type: constants.GET_ORDERS_LIST,
  payload,
});

/**
 * @function setOrdersList
 * action creator for type: SET_ORDERS_LIST
 */
export const setOrdersList = payload => {
  return {
    type: constants.SET_ORDERS_LIST,
    payload,
  };
};
