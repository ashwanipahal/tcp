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

export const setFilter = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_FILTER,
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

export const setPlpProductsDataOnServer = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_FIRST_PRODUCTS_PAGE_SSR,
    payload,
  };
};

export const setAddToFavorite = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_ADD_TO_FAVORITE,
    payload,
  };
};

export const loadPlpLoyaltyBanner = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_LOYALTY_BANNER,
    payload,
  };
};
