import { fromJS } from 'immutable';
import FAVORITES_CONSTANTS from './Favorites.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const FavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_CONSTANTS.SET_FAVORITES_STATE:
      return state.merge(action.payload);
    default:
      return getDefaultState(state);
  }
};

export default FavoritesReducer;
