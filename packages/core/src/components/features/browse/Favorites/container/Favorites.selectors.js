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
  const wishlistsSummaries = selectWishlistsSummaries(state);
  let activeWishlistId = null;
  if (wishlistsSummaries && wishlistsSummaries.length > 0) {
    const len = wishlistsSummaries.length;
    for (let i = 0; i < len; i += 1) {
      const item = wishlistsSummaries[i];
      if (item.isDefault === true) {
        activeWishlistId = item.id;
        break;
      }
    }
  }
  return activeWishlistId;
};
export const fetchCurrencySymbol = state => {
  const currency = state.session && state.session.siteDetails.currency;
  if (currency) {
    return currency === 'USD' || currency === 'CA' ? '$' : currency;
  }
  return '$';
};

export const getLabelsFavorites = state => state.Labels.Browse && state.Labels.Browse.Favorites;

export default fetchCurrencySymbol;
