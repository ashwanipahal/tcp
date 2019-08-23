import BAGPAGE_CONSTANTS from '../BagPage.constants';

const getOrderDetails = () => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS,
  };
};

const getCartData = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.GET_CART_DATA,
    payload,
  };
};

const getOrderDetailsComplete = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};

const startCheckout = () => {
  return {
    type: BAGPAGE_CONSTANTS.START_BAG_CHECKOUT,
  };
};

const setCouponsData = (payload?) => {
  return {
    type: BAGPAGE_CONSTANTS.SET_COUPONS_DATA,
    payload,
  };
};

const setItemOOS = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SET_ITEM_OOS,
    payload,
  };
};

const openCheckoutConfirmationModal = () => {
  return {
    type: BAGPAGE_CONSTANTS.OPEN_CHECKOUT_CONFIRMATION_MODAL,
  };
};

const closeCheckoutConfirmationModal = () => {
  return {
    type: BAGPAGE_CONSTANTS.CLOSE_CHECKOUT_CONFIRMATION_MODAL,
  };
};

const setBagPageError = (payload?) => {
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

const removeUnqualifiedItemsAndCheckout = () => {
  return {
    type: BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
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
  startCheckout,
  closeCheckoutConfirmationModal,
  removeUnqualifiedItemsAndCheckout,
  openCheckoutConfirmationModal,
  setItemOOS,
};
