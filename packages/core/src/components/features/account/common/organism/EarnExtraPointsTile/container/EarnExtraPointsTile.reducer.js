import { fromJS } from 'immutable';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';

const initialState = fromJS({
  earnExtraPointsData: null,
  earnedPointsNotificationData: null,
  isFetching: false,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const EarnExtraPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST:
      return state.set('isFetching', true);
    case EARNEXTRAPOINTS_CONSTANTS.SET_EARNEXTRAPOINTS_LIST:
      return state.set('isFetching', false).set('earnExtraPointsData', action.payload);
    case EARNEXTRAPOINTS_CONSTANTS.SET_EARNEDPOINTS_NOTIFICATION:
      return state.set('earnedPointsNotificationData', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default EarnExtraPointsReducer;
