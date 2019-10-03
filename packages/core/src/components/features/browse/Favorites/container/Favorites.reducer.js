import { fromJS } from 'immutable';
import FAVORITES_CONSTANTS from './Favorites.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  wishlistsSummaries: [],
  activeWishList: null,
  lastDeletedItemId: '',
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const FavoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FAVORITES_CONSTANTS.SET_FAVORITES_STATE:
      return state.merge(action.payload);
    case FAVORITES_CONSTANTS.SET_FAVORITES_WISHLIST:
      return state.set('wishlistsSummaries', payload);
    case FAVORITES_CONSTANTS.SET_ACTIVE_WISHLIST:
      return state.set('activeWishList', payload);
    case FAVORITES_CONSTANTS.DELETE_WISHLIST_ITEM:
      return state.set('lastDeletedItemId', payload);
    default:
      return getDefaultState(state);
  }
};

export default FavoritesReducer;
