import { fromJS } from 'immutable';
import constants from '../PointsClaim.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const PointsClaimReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.POINTS_CLAIM_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.POINTS_CLAIM_ERROR:
      return state
        .set('error', fromJS(action.payload))
        .set('success', null)
        .set('showNotification', true);
    case constants.RESET_STATE:
      return state.set('error', null).set('success', null);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default PointsClaimReducer;
