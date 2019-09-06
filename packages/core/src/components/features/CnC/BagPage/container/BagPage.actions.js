import BAGPAGE_CONSTANTS from '../BagPage.constants';

const getOrderDetails = () => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS,
  };
};

const getCartData = payload => {
  return {
    type: BAGPAGE_CONSTANTS.GET_CART_DATA,
    payload,
  };
};

const getOrderDetailsComplete = payload => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};

const startCheckout = payload => {
  return {
    type: BAGPAGE_CONSTANTS.START_BAG_CHECKOUT,
    payload,
  };
};

const setCouponsData = payload => {
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

const setItemUnavailable = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SET_ITEM_UNAVAILABLE,
    payload,
  };
};

const openCheckoutConfirmationModal = (payload = false) => {
  return {
    type: BAGPAGE_CONSTANTS.OPEN_CHECKOUT_CONFIRMATION_MODAL,
    payload,
  };
};

const closeCheckoutConfirmationModal = () => {
  return {
    type: BAGPAGE_CONSTANTS.CLOSE_CHECKOUT_CONFIRMATION_MODAL,
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

const removeUnqualifiedItemsAndCheckout = navigation => {
  return {
    type: BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
    navigation,
  };
};

const setCartItemsUpdating = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_UPDATING,
  };
};

const routeForCheckout = () => {
  return {
    type: BAGPAGE_CONSTANTS.ROUTE_FOR_CART_CHECKOUT,
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
  setCartItemsUpdating,
  setItemUnavailable,
  routeForCheckout,
};
