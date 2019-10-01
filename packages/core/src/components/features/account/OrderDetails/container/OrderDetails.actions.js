import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';

export const getOrderDetailsList = (payload = {}) => {
  return {
    type: ORDERDETAILS_CONSTANTS.GET_ORDERDETAILS_LIST,
    payload,
  };
};

export const setOrderDetailsList = orderDetailsData => {
  return {
    type: ORDERDETAILS_CONSTANTS.SET_ORDERDETAILS_LIST,
    payload: orderDetailsData,
  };
};
