import { fromJS } from 'immutable';
import BONUS_POINTS_DAYS_CONSTANTS from '../BonusPointsDays.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  bonusDaysData: null,
  error: null,
  isFetching: false,
  bonusPointsDetails: null,
});

const BonusPointsDaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case BONUS_POINTS_DAYS_CONSTANTS.SET_BONUS_DAYS_SUCCESS:
      return state
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(BONUS_POINTS_DAYS_CONSTANTS.GET_BONUS_DAYS_TTL))
        .set('bonusDaysData', action.payload)
        .set('isFetching', false);
    case BONUS_POINTS_DAYS_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case BONUS_POINTS_DAYS_CONSTANTS.SET_BONUS_DAYS_ERROR:
      return state.set('error', action.payload).set('isFetching', false);
    case BONUS_POINTS_DAYS_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('bonusPointsDetails', action.payload.richText);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default BonusPointsDaysReducer;
