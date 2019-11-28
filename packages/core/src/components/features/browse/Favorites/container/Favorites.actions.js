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

export const setAddToFavoriteErrorState = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_FAVORITES_ERROR,
    payload,
  };
};

export const removeAddToFavoriteErrorState = payload => {
  return {
    type: FAVORITES_CONSTANTS.REMOVE_FAVORITES_ERROR,
    payload,
  };
};

export const getSetWishlistsSummariesAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.GET_FAVORITES_WISHLIST,
    payload,
  };
};

export const setActiveWishlistAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_ACTIVE_WISHLIST,
    payload,
  };
};

export const getActiveWishlistAction = wishListId => {
  return {
    type: FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST,
    wishListId,
  };
};

export const getActiveWishlistGuestAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST_GUEST,
    payload,
  };
};

export const createNewWishListAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST,
    payload,
  };
};

export const createNewWishListMoveItemAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST_MOVE_ITEM,
    payload,
  };
};

export const deleteWishListAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETE_WISHLIST,
    payload,
  };
};

export const setLastDeletedItemIdAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETE_WISHLIST_ITEM,
    payload,
  };
};

export const setDeletedItemAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.DELETED_WISHLIST_ITEM,
    payload,
  };
};

export const updateWishListAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.UPDATE_WISHLIST,
    payload,
  };
};

export const updateWishListItemIdAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.UPDATE_WISHLIST_ITEM,
    payload,
  };
};

export const sendWishListMailAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.SEND_WISHLIST_EMAIL,
    payload,
  };
};

export const setWishlistsSummariesAction = payload => {
  return {
    type: FAVORITES_CONSTANTS.SET_FAVORITES_WISHLIST,
    payload,
  };
};

export const getSetIsWishlistReadOnlyAction = isReadOnly => {
  return {
    isReadOnly,
    type: FAVORITES_CONSTANTS.FAVORITES_SET_IS_READ_ONLY_WISHLIST,
  };
};

export const getSetActiveWishlistAction = activeWishlist => {
  return {
    activeWishlist,
    type: 'FAVORITES_SET_ACTIVE_WISHLIST',
  };
};

export const setLoadingState = payload => {
  return {
    type: FAVORITES_CONSTANTS.FAVORITES_SET_LOADING,
    payload,
  };
};

export const setWishListShareSuccess = payload => {
  return {
    type: FAVORITES_CONSTANTS.FAVORITES_SET_WISHLIST_SHARE_SUCCESS,
    payload,
  };
};
