import { fromJS } from 'immutable';
import { SET_CLICK_PAYLOAD, RESET_CLICK_PAYLOAD, SET_CAMPAIGN_ID, TRACK_CLICK } from './actions';

const initialState = fromJS({
  clickActionAnalyticsData: null,
  campaignId: null,
});

const AnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICK_PAYLOAD:
      return state.set('clickActionAnalyticsData', action.payload);
    case TRACK_CLICK:
      return state.set('clickActionAnalyticsData', action.payload);
    case RESET_CLICK_PAYLOAD:
      return state.set('clickActionAnalyticsData', null);
    case SET_CAMPAIGN_ID:
      return state.set('campaignId', action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AnalyticsReducer;
