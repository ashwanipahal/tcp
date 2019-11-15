import { fromJS } from 'immutable';
import { SET_CLICK_PAYLOAD, RESET_CLICK_PAYLOAD, SET_CAMPAIGN_ID, TRACK_CLICK } from './actions';

const initialState = fromJS({
  clickActionAnalyticsData: {
    campaignId: null,
    pageNavigationText: {},
  },
});

const setNavigationAnalyticsValue = (key, rState, payload) => {
  switch (key) {
    case 'top-navigation':
      rState.setIn(['clickActionAnalyticsData', 'pageNavigationText'], payload);
      break;
    case 'mob-navigation':
      rState.set('clickActionAnalyticsData', payload);
      break;
    default:
      break;
  }
  return rState;
};
const AnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICK_PAYLOAD:
      return state.set('clickActionAnalyticsData', action.payload);
    case TRACK_CLICK: {
      const key = action.payload && action.payload.key;
      setNavigationAnalyticsValue(key, state, action.payload);
      break;
    }
    case RESET_CLICK_PAYLOAD:
      return state.set('clickActionAnalyticsData', null);
    case SET_CAMPAIGN_ID:
      return state.setIn(['clickActionAnalyticsData', 'campaignId'], action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
  return state;
};

export default AnalyticsReducer;
