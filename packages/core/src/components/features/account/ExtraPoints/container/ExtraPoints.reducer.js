import { fromJS } from 'immutable';
import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';

const initialState = fromJS({
  promoListDetails: null,
});

const ExtraPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXTRA_POINTS_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('promoListDetails', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ExtraPointsReducer;
