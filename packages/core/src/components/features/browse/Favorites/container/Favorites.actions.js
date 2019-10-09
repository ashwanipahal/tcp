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

export const setActiveWishlistActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_ACTIVE_WISHLIST,
    payload,
  };
};

export const getActiveWishlistActn = wishListId => {
  return {
    type: FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST,
    wishListId,
  };
};

export const createNewWishListActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST,
    payload,
  };
};

export const createNewWishListMoveItemActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST_MOVE_ITEM,
    payload,
  };
};

export const deleteWishListActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETE_WISHLIST,
    payload,
  };
};

export const setLastDeletedItemIdActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETE_WISHLIST_ITEM,
    payload,
  };
};

export const setDeletedItemActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETED_WISHLIST_ITEM,
    payload,
  };
};

export const updateWishListActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.UPDATE_WISHLIST,
    payload,
  };
};

export const updateWishListItemIdActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.UPDATE_WISHLIST_ITEM,
    payload,
  };
};

export const sendWishListMailActn = payload => {
  return {
    type: FAVORITES_CONSTANTS.SEND_WISHLIST_EMAIL,
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
