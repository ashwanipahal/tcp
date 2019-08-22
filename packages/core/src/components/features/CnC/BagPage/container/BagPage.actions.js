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

const getOrderDetailsComplete = payload => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};

const setCouponsData = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SET_COUPONS_DATA,
    payload,
  };
};

const setBagPageError = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS,
    payload,
  };
};

const fetchModuleX = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT,
  };
};

const setModuleX = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.SET_MODULEX_CONTENT,
  };
};

export default {
  getOrderDetails,
  getOrderDetailsComplete,
  getCartData,
  setCouponsData,
  setBagPageError,
  fetchModuleX,
  setModuleX,
};
