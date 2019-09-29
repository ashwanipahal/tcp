import PRODUCTLISTINGPAGE_CONSTANTS from './Favorites.constants';

export const addItemsToWishlist = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_FAVORITES,
    payload,
  };
};

export const setWishlistState = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_FAVORITES_STATE,
    payload,
  };
};
