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
