import { fromJS } from 'immutable';
import MY_FAVORITE_STORE_CONSTANTS from '../MyFavoriteStore.constants';

const initialState = fromJS({
  error: null,
  success: null,
});

const MyFavoriteStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_FAVORITE_STORE_CONSTANTS.GET_MY_FAVORITE_STORE:
      return state.set('error', null).set('success', null);
    case MY_FAVORITE_STORE_CONSTANTS.RESET_MY_FAVORITE_STORE:
      return state.set('error', null).set('success', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      if (typeof state === 'undefined') {
        return initialState;
      }
      return state;
  }
};

export default MyFavoriteStoreReducer;
