import { createSelector } from 'reselect';
import { FAVORITES_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getFavoriteListState = state => {
  return state[FAVORITES_REDUCER_KEY];
};

export const selectWishlistsSummaries = createSelector(
  getFavoriteListState,
  items => items && items.get('wishlistsSummaries')
);

export const selectActiveWishList = createSelector(
  getFavoriteListState,
  items => items && items.get('activeWishList')
);

export const selectActiveWishlistProducts = state => {
  const activeWishList = selectActiveWishList(state);
  return activeWishList && activeWishList.items;
};

export const selectTotalProductsCount = state => {
  const activeWishList = selectActiveWishList(state);
  return activeWishList && activeWishList.items.length;
};

export const selectActiveDisplayName = createSelector(
  getFavoriteListState,
  items => {
    const activeWishList = items && items.get('activeWishList');
    return activeWishList && activeWishList.displayName;
  }
);

export const selectActiveWishlistId = state => {
  const activeWishList = selectActiveWishList(state);
  return activeWishList && activeWishList.id;
};

export const selectDefaultWishlist = state => {
  const wishlistsSummaries = selectWishlistsSummaries(state);
  return (
    wishlistsSummaries &&
    wishlistsSummaries.length > 0 &&
    wishlistsSummaries.filter(wishlist => {
      return wishlist.isDefault === true;
    })
  );
};

export const getBothTcpAndGymProductAreAvailability = state => {
  const activeWishList = selectActiveWishList(state);
  let isTcpProductAvailable = false;
  let isGymProductAvailable = false;
  let isTcpAndGymProductsAvailable = false;
  const len = (activeWishList && activeWishList.items.length) || 0;
  for (let i = 0; i < len; i += 1) {
    if (isTcpProductAvailable && isGymProductAvailable) {
      isTcpAndGymProductsAvailable = true;
      break;
    }
    const item = activeWishList.items[i];
    if (item.itemInfo.isTCP) {
      isTcpProductAvailable = true;
    } else {
      isGymProductAvailable = true;
    }
  }
  if (isTcpProductAvailable && isGymProductAvailable) {
    isTcpAndGymProductsAvailable = true;
  }
  return isTcpAndGymProductsAvailable;
};

export const fetchCurrencySymbol = state => {
  const currency = state.session && state.session.siteDetails.currency;
  if (currency) {
    return currency === 'USD' || currency === 'CA' ? '$' : currency;
  }
  return '$';
};

export const fetchAddToFavoriteErrorMsg = state => {
  return state.Favorites && state.Favorites.get('isAddToFavError');
};

export const getLabelsFavorites = state => state.Labels.Browse && state.Labels.Browse.Favorites;

export const getSLPLabels = state => state.Labels.Browse && state.Labels.Browse.SLP;

export default fetchCurrencySymbol;

export const getIsDataLoading = state => {
  return state[FAVORITES_REDUCER_KEY].get('isDataLoading');
};
