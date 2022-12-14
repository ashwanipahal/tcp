import { fromJS } from 'immutable';
import POINTSHISTORY_CONSTANTS from '../PointsHistory.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  pointsHistoryData: null,
  isFetching: false,
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
    case POINTSHISTORY_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case POINTSHISTORY_CONSTANTS.HIDE_LOADER:
      return state.set('isFetching', false);
    case POINTSHISTORY_CONSTANTS.SET_POINTSHISTORY_LIST:
      return state
        .set('isFetching', false)
        .set('pointsHistoryData', action.payload)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST_TTL));
    case POINTSHISTORY_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('pointsHistoryRichText', action.payload.richText);
    default:
      return getDefaultState(state);
  }
};

export default PointsHistoryReducer;
