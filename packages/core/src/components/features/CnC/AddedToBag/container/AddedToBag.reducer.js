import { fromJS } from 'immutable';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';

const initialState = fromJS({
  itemInfo: {},
  error: false,
  isOpenAddedToBag: false,
  pickupError: null,
});

const AddedToBagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_BAG:
      return state.set('itemInfo', action.payload);
    case ADDEDTOBAG_CONSTANTS.OPEN_ADDED_TO_BAG:
      return state.set('isOpenAddedToBag', true);
    case ADDEDTOBAG_CONSTANTS.CLOSE_ADDED_TO_BAG:
      return state.set('isOpenAddedToBag', false);
    case ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_BAG_ERROR:
      return state.set('error', action.payload);
    case ADDEDTOBAG_CONSTANTS.CLEAR_ADD_TO_BAG_ERROR_STATE:
      return state.set('error', null);
    case ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_PICKUP_ERROR:
      return state.set('pickupError', action.payload);
    case ADDEDTOBAG_CONSTANTS.CLEAR_ADD_TO_PICKUP_ERROR_STATE:
      return state.set('pickupError', null);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddedToBagReducer;
