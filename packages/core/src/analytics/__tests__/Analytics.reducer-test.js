import { fromJS } from 'immutable';
import { SET_CLICK_PAYLOAD, RESET_CLICK_PAYLOAD } from '../actions';
import AnalyticsReducer from '../Analytics.reducer';

describe('Analytics Reducer', () => {
  const initialState = fromJS({
    clickActionAnalyticsData: null,
  });

  it('setClickAnalyticsData', () => {
    const setClickAnalyticsData = {
      type: SET_CLICK_PAYLOAD,
      payload: false,
    };
    const newState = AnalyticsReducer(initialState, {
      ...setClickAnalyticsData,
    });

    expect(newState.get('clickActionAnalyticsData')).toEqual(false);
  });

  it('resetClickAnalyticsData', () => {
    const resetClickAnalyticsData = {
      type: RESET_CLICK_PAYLOAD,
    };
    const newState = AnalyticsReducer(initialState, {
      ...resetClickAnalyticsData,
    });

    expect(newState.get('clickActionAnalyticsData')).toEqual(null);
  });
});
