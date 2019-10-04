import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';

export const setPlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS,
    payload,
  };
};

export const getPlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS,
    payload,
  };
};

export const resetPlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.RESET_PRODUCTS,
    payload,
  };
};

export const getMorePlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.GET_MORE_PRODUCTS,
    payload,
  };
};

export function setListingFirstProductsPage(productsPage) {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_FIRST_PRODUCTS_PAGE,
    productsPage,
  };
}

export const setPlpLoadingState = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_PLP_LOADING_STATE,
    payload,
  };
};
