import { loadComponentLabelsData, loadPageSEOData } from '@tcp/core/src/reduxStore/actions';
import { LABELS, SEO_DATA } from '@tcp/core/src/reduxStore/constants';

import BAGPAGE_CONSTANTS from '../BagPage.constants';

const getOrderDetails = payload => {
  return {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS,
    payload,
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

const startPaypalCheckout = payload => {
  return {
    type: BAGPAGE_CONSTANTS.START_PAYPAL_CHECKOUT,
    payload,
  };
};

const startPaypalNativeCheckout = payload => {
  return {
    type: BAGPAGE_CONSTANTS.START_PAYPAL_NATIVE_CHECKOUT,
    payload,
  };
};

const paypalAuthorization = payload => {
  return {
    type: BAGPAGE_CONSTANTS.AUTHORIZATION_PAYPAL_CHECKOUT,
    payload,
  };
};

const addItemToSflList = payload => {
  return {
    type: BAGPAGE_CONSTANTS.ADD_ITEM_SAVE_FOR_LATER,
    payload,
  };
};

const setCartItemsSFL = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL,
  };
};

const setCartItemsSflError = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL_ERROR,
  };
};

const getSflData = () => {
  return {
    type: BAGPAGE_CONSTANTS.GET_SFL_DATA,
  };
};

const setSflData = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.SET_SFL_DATA,
  };
};

const setTranslatedSflData = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.SET_TRANSLATED_SFL_DATA,
  };
};

const updateSflItem = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.UPDATE_SFL_ITEM,
  };
};

const startSflItemDelete = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SFL_ITEMS_DELETE,
    payload,
  };
};

const setSflItemDeleted = payload => {
  return {
    payload,
    type: BAGPAGE_CONSTANTS.SFL_ITEMS_SET_DELETED,
  };
};

const startSflDataMoveToBag = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SFL_ITEMS_MOVE_TO_BAG,
    payload,
  };
};

const openItemDeleteConfirmationModal = payload => {
  return {
    type: BAGPAGE_CONSTANTS.OPEN_ITEM_DELETE_CONFIRMATION_MODAL,
    payload,
  };
};

const closeItemDeleteConfirmationModal = () => {
  return {
    type: BAGPAGE_CONSTANTS.CLOSE_ITEM_DELETE_CONFIRMATION_MODAL,
  };
};

const resetCartReducer = () => {
  return {
    type: BAGPAGE_CONSTANTS.RESET_CART_DATA,
  };
};

const initActions = [
  loadComponentLabelsData({ category: LABELS.checkout }),
  loadPageSEOData({ page: SEO_DATA.bag }),
];

const getSetPayPalWebView = payload => {
  return {
    type: BAGPAGE_CONSTANTS.PAYPAL_WEBVIEW_ENABLE,
    payload,
  };
};

const isPaypalRenderDone = payload => {
  return {
    type: BAGPAGE_CONSTANTS.IS_PAYPAL_BUTTON_RENDER_DONE,
    payload,
  };
};

const setBagPageLoading = () => ({
  type: BAGPAGE_CONSTANTS.FETCHING_CART_DATA,
});
const setIsPaypalBtnHidden = payload => {
  return {
    type: BAGPAGE_CONSTANTS.PAYPAL_BUTTON_HIDDEN,
    payload,
  };
};

const resetBagLoadedState = () => {
  return {
    type: BAGPAGE_CONSTANTS.RESET_BAG_LOADED_STATE,
  };
};

const setBagPageIsRouting = payload => {
  return {
    type: BAGPAGE_CONSTANTS.SET_BAG_PAGE_ROUTING,
    payload,
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
  paypalAuthorization,
  startPaypalCheckout,
  isPaypalRenderDone,
  startPaypalNativeCheckout,
  setCartItemsUpdating,
  setItemUnavailable,
  routeForCheckout,
  initActions,
  addItemToSflList,
  setCartItemsSFL,
  setCartItemsSflError,
  getSflData,
  setSflData,
  openItemDeleteConfirmationModal,
  closeItemDeleteConfirmationModal,
  startSflItemDelete,
  startSflDataMoveToBag,
  setSflItemDeleted,
  resetCartReducer,
  getSetPayPalWebView,
  setBagPageLoading,
  setIsPaypalBtnHidden,
  resetBagLoadedState,
  setTranslatedSflData,
  setBagPageIsRouting,
  updateSflItem,
};
