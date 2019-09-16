import { fromJS } from 'immutable';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  earnExtraPointsData: null,
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
    case EARNEXTRAPOINTS_CONSTANTS.SET_EARNEXTRAPOINTS_LIST:
      return state
        .set('earnExtraPointsData', action.payload)
        .set(
          DEFAULT_REDUCER_KEY,
          setCacheTTL(EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST_TTL)
        );
    default:
      return getDefaultState(state);
  }
};

export default EarnExtraPointsReducer;
