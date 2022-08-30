import { fromJS } from 'immutable';
import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';

const initialState = fromJS({
  promoListDetails: null,
  isFetching: false,
});

const ExtraPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXTRA_POINTS_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case EXTRA_POINTS_CONSTANTS.SET_PROMO_LIST_CONTENT:
      return state.set('isFetching', false).set('promoListDetails', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ExtraPointsReducer;
