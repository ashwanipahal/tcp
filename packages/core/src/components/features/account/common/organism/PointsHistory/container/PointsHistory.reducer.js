import { fromJS } from 'immutable';
import REWARDSPOINTS_CONSTANTS from '../PointsHistory.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  pointsHistoryData: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const PointsHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case REWARDSPOINTS_CONSTANTS.SET_ACCOUNT_NAVIGATION_LIST12:
      return state
        .set('pointsHistoryData', action.payload)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(REWARDSPOINTS_CONSTANTS.GET_ACCOUNT_NAV_LIST_TTL12));
    default:
      return getDefaultState(state);
  }
};

export default PointsHistoryReducer;
