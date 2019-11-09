import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';

export const getOrderDetails = (payload = {}) => {
  return {
    type: ORDERDETAILS_CONSTANTS.GET_ORDERDETAILS,
    payload,
  };
};

export const setOrderDetails = orderDetailsData => {
  return {
    type: ORDERDETAILS_CONSTANTS.SET_ORDERDETAILS,
    payload: orderDetailsData,
  };
};

export const showLoader = () => {
  return {
    type: ORDERDETAILS_CONSTANTS.SHOW_LOADER,
  };
};
