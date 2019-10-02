import FAVORITES_CONSTANTS from './Favorites.constants';

export const addItemsToWishlist = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_FAVORITES,
    payload,
  };
};

export const setWishlistState = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_FAVORITES_STATE,
    payload,
  };
};

export const getSetWishlistsSummariesActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.GET_FAVORITES_WISHLIST,
    payload,
  };
};

export const setWishlistsSummariesActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_FAVORITES_WISHLIST,
    payload,
  };
};

export const getSetIsWishlistReadOnlyActn = isReadOnly => {
  return {
    isReadOnly,
    type: 'FAVORITES_SET_IS_READ_ONLY_WISHLIST',
  };
};

export const getSetActiveWishlistActn = activeWishlist => {
  return {
    activeWishlist,
    type: 'FAVORITES_SET_ACTIVE_WISHLIST',
  };
};
