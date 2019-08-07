import BAGPAGE_CONSTANTS from '../BagPage.constants';

const getOrderDetails = () => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS,
  };
};

const getCartData = () => {
  return {
    type: BAGPAGE_CONSTANTS.GET_CART_DATA,
  };
};

const getOrderDetailsComplete = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};

const setCouponsData = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.SET_COUPONS_DATA,
    payload,
  };
};

const setBagPageError = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS,
    payload,
  };
};

export default {
  getOrderDetails,
  getOrderDetailsComplete,
  getCartData,
  setCouponsData,
  setBagPageError,
};
