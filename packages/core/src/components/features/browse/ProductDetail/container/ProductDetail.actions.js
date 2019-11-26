import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';

export const setProductDetails = payload => {
  return {
    type: PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS,
    payload,
  };
};

export const getProductDetails = payload => {
  return {
    type: PRODUCTDETAIL_CONSTANTS.FETCH_PRODUCT_DETAILS,
    payload,
  };
};

export const setAddToFavoritePDP = payload => {
  return {
    type: PRODUCTDETAIL_CONSTANTS.SET_ADD_TO_FAVORITE,
    payload,
  };
};

export const setPDPLoadingState = payload => {
  return {
    type: PRODUCTDETAIL_CONSTANTS.SET_PDP_LOADING_STATE,
    payload,
  };
};
