import { fromJS } from 'immutable';
import FAVORITES_CONSTANTS from './Favorites.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  wishlistsSummaries: [],
  activeWishList: null,
  lastDeletedItemId: '',
  isDataLoading: true,
  isAddToFavError: '',
  isWishListShared: false,
  errorMessages: {},
  defaultWishList: {},
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const mergedErrorMessages = (state, payload) => {
  const currentValue = state.getIn(['errorMessages']);
  const updatedValue = {
    ...currentValue,
    ...payload,
  };
  return state.set('errorMessages', updatedValue);
};

/* eslint-disable sonarjs/cognitive-complexity */
/* eslint complexity: ["error", 15] */
const FavoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FAVORITES_CONSTANTS.SET_FAVORITES_STATE:
      return state.merge(action.payload);
    case FAVORITES_CONSTANTS.SET_FAVORITES_WISHLIST:
      return state.set('wishlistsSummaries', payload);
    case FAVORITES_CONSTANTS.SET_ACTIVE_WISHLIST:
      return state.set('activeWishList', payload);
    case FAVORITES_CONSTANTS.DELETED_WISHLIST_ITEM:
      return state.set('lastDeletedItemId', payload);
    case FAVORITES_CONSTANTS.FAVORITES_SET_LOADING:
      return state.set('isDataLoading', payload.isDataLoading);
    case FAVORITES_CONSTANTS.SET_FAVORITES_ERROR:
      return state.set('isAddToFavError', payload.errorMessage);
    case FAVORITES_CONSTANTS.REMOVE_FAVORITES_ERROR:
      return state.set('isAddToFavError', payload);
    case FAVORITES_CONSTANTS.FAVORITES_SET_WISHLIST_SHARE_SUCCESS:
      return state.set('isWishListShared', payload);
    case FAVORITES_CONSTANTS.MAXIMUM_PRODUCT_ADDED_ERROR:
      return mergedErrorMessages(state, payload);
    case FAVORITES_CONSTANTS.RESET_MAXIMUM_PRODUCT_ADDED_ERROR:
      return state.set('errorMessages', payload);
    case 'FAVORITES_SET_DEFAULT_WISHLIST':
      return state.set('defaultWishList', payload);
    default:
      return getDefaultState(state);
  }
};

export default FavoritesReducer;
